"use server";

import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { PostProps } from "@/types/types";
import { Media, Post, Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
dayjs.extend(utc);
dayjs.extend(timezone);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const getPostById = async (id: number) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        media: true,
      },
    });

    return post;
  } catch (error) {
    console.error("Error create post==>", error);
    return null;
  }
};
export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany();

    return posts;
  } catch (error) {
    console.error("Error create post==>", error);
    return null;
  }
};

export const createOrEditPost = async (
  values: {
    id: number;
    name: string;
    caption: string;
    imagesComment?: string | null;
    hashtag: string;
  },
  campaignId: number
) => {
  try {
    const { id, name, caption, imagesComment, hashtag } = values;
    let response:
      | {
          error: string;
          success?: undefined;
        }
      | {
          success: string;
          error?: undefined;
        }
      | null
      | undefined;
    if (id === 0) {
      response = await createPost(values, campaignId);
    } else {
      response = await editPost(values);
    }
    if (response?.success) {
      return {
        success: response.success,
      };
    } else {
      return {
        error: response?.error,
      };
    }
  } catch (error) {
    console.error("Error create post==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};
export const createPost = async (
  values: {
    name: string;
    caption: string;
    imagesComment?: string | null;
    hashtag: string;
  },
  campaignId: number
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return null;

    const email = session.user?.email;
    if (email) {
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) return;
      const { name, caption, imagesComment, hashtag } = values;
      const newPost = await prisma.post.create({
        data: {
          name,
          caption,
          hashtag,
          imagesComment,
          status: "DRAFT" as keyof typeof Status,
          createdAt: new Date(),
          updatedAt: new Date(),
          campaign: {
            connect: {
              id: campaignId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      if (!newPost) {
        return {
          error: "Oups! something went wrong! Try to submit the form again...",
        };
      }
      return {
        success: "Good news! A new post has been created successfully.",
      };
    }
  } catch (error) {
    console.error("Error create post==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};
export const editPost = async (values: {
  id: number;
  name: string;
  caption: string;
  scheduledPublicationDate?: Date;
  imagesComment?: string | null;
  hashtag: string;
}) => {
  try {
    const { id, name, caption, imagesComment, hashtag } = values;
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        name,
        caption,
        hashtag,
        imagesComment,
        status: "DRAFT" as keyof typeof Status,
        updatedAt: new Date(),
      },
    });
    if (!updatedPost) {
      return {
        error: "Oups! something went wrong! Try to submit the form again...",
      };
    }
    return {
      success: "Good news! A new post has been updated successfully.",
    };
  } catch (error) {
    console.error("Error update post==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};

export const deletePost = async (post: PostProps) => {
  try {
    if (post.publishedAt && post.status === "PUBLISHED") {
      return {
        error: "Oups! Your post is already published. You cannot delete it",
      };
    }
    await prisma.post.delete({
      where: { id: post.id },
    });
    return {
      success: "Good news! Post has been deleted successfully.",
    };
  } catch (error) {
    console.error("Error delete post==>", error);
    return {
      error:
        "Oups! something went wrong while deleting wallet! Try to submit the form again...",
    };
  }
};

export const schedulePublicationPost = async (
  id: number,
  scheduledPublicationDate: Date | null
) => {
  try {
    const scheluedPublicationDate = await prisma.post.update({
      where: { id },
      data: {
        scheduledPublicationDate,
        status: scheduledPublicationDate ? "PENDING" : "DRAFT",
      },
    });
    if (!scheluedPublicationDate) {
      return {
        error: "Oups! something went wrong ! Try to submit the form again...",
      };
    }
    revalidatePath(`/dashboard/post/${id}`);
    return {
      success: "Good news! Post publication has been scheduled successfully.",
    };
  } catch (error) {
    return {
      error: "Oups! something went wrong ! Try to submit the form again...",
    };
  }
};
export const handleUploadMediaForPost = async (
  mediaPosts: Media[],
  post: PostProps
) => {
  try {
    if (mediaPosts.length === 0) {
      await deleteAllMediaFromDBAndCloudinary(post.media);
    } else {
      const mediaToCreate = mediaPosts.filter((media) => media.id === 0);
      const mediaToDelete = post.media.filter((media) => {
        return !mediaPosts.some((media2) => media2.id === media.id);
      });

      if (mediaToDelete.length > 0) {
        await deleteSomeMediaFromDBAndCloudinary(mediaToDelete);
      }
      if (mediaToCreate.length > 0) {
        await createMediaForPost(mediaToCreate);
      }
    }

    revalidatePath(`/dashboard/post/${post.id}`);
    return {
      success: "Good news! Post have been updated with Media!",
    };
  } catch (error) {
    return {
      error: "Oups! something went wrong ! Try to submit the form again...",
    };
  }
};

const createMediaForPost = async (mediaPosts: Media[]) => {
  try {
    const mediaWithOutId = mediaPosts.map((media) => {
      const { id, ...remainingMedia } = media;
      return remainingMedia;
    });
    const postUpdatedWithMedia = await prisma.media.createMany({
      data: mediaWithOutId,
    });

    if (!postUpdatedWithMedia || postUpdatedWithMedia.count === 0) {
      return {
        error: "Oups! something went wrong ! Try to submit the form again...",
      };
    }
    return {
      success: "Good news! Media have been added to your Post!",
    };
  } catch (error) {
    return {
      error: "Oups! something went wrong ! Try to submit the form again...",
    };
  }
};

const deleteSomeMediaFromDBAndCloudinary = async (mediaToDelete: Media[]) => {
  console.log("mediaToDelete==>", mediaToDelete);
  const mediaToDeletePublicIDsArray = mediaToDelete.map(
    (media) => media.publicId
  );
  const deletResp = await cloudinary.api.delete_resources(
    mediaToDeletePublicIDsArray,
    {
      type: "upload",
      resource_type: "image",
    }
  );
  if (deletResp) {
    mediaToDelete.forEach(async (media) => {
      await prisma.media.delete({
        where: { id: media.id },
      });
    });
  }
};
const deleteAllMediaFromDBAndCloudinary = async (postMedia: Media[]) => {
  try {
    postMedia.forEach(async (media) => {
      const deleteResp = await cloudinary.api.delete_resources(
        [media.publicId],
        {
          type: "upload",
          resource_type: "image",
        }
      );
      if (deleteResp) {
        const deletedMedia = await prisma.media.delete({
          where: {
            id: media.id,
          },
        });

        if (!deletedMedia) {
          return { error: "Media couldn't be deleted. Try again!" };
        }
      }
    });
    return { success: "Media have been deleted!" };
  } catch (error) {
    console.log("error deletAllMediaFromDBAndCloudinary ==>", error);
    return { error: "Media couldn't be deleted. Try again!" };
  }
};
