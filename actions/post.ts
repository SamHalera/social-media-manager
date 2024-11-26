"use server";

import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { PostProps } from "@/types/types";
import { Post, Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
dayjs.extend(utc);
dayjs.extend(timezone);

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
    // publicationDate?: Date;
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
    // publicationDate?: Date;
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
  publicationDate?: Date;
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
  publicationDate: Date | null
) => {
  try {
    const scheluedPublicationDate = await prisma.post.update({
      where: { id },
      data: {
        publicationDate,
        status: publicationDate ? "PENDING" : "DRAFT",
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
