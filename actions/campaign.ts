"use server";
import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { CampaignProps } from "@/types/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getCampaignById = async (id: number) => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: {
        id,
        isArchived: false,
      },
      include: {
        post: {
          include: {
            user: true,
            media: true,
          },
        },
      },
    });
    return campaign;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const getCampaigns = async () => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        isArchived: false,
      },
      include: {
        post: {
          include: {
            user: true,
            media: true,
          },
        },
      },
    });

    if (campaigns) {
      return campaigns;
    }
    return null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const createOrEditCampaign = async (values: {
  name: string;
  id: number;
}) => {
  try {
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
    const { id, name } = values;
    if (id === 0) {
      response = await createCampaign(name);
    } else {
      response = await updateCampaign(name, id);
    }
    if (response?.error) {
      return {
        error: response.error,
      };
    } else {
      revalidatePath("/dashboard");
      return {
        success: response.success,
      };
    }
  } catch (error) {
    console.error("Error create campaign==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};

const createCampaign = async (name: string) => {
  try {
    const newCampaign = await prisma.campaign.create({
      data: {
        name,
        isArchived: false,
      },
    });
    if (!newCampaign) {
      return {
        error: "Oups! something went wrong! Try to submit the form again...",
      };
    }
    return {
      success: "Good news! A new campaign has been created successfully.",
    };
  } catch (error) {
    console.error("Error create campaign==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};
const updateCampaign = async (name: string, id: number) => {
  try {
    const updatedCampaing = await prisma.campaign.update({
      where: { id },
      data: {
        name,
      },
    });

    if (!updateCampaign) {
      return {
        error: "Oups! something went wrong! Try to submit the form again...",
      };
    }
    return {
      success: "Good news! the campaign has been updated successfully.",
    };
  } catch (error) {
    console.error("Error updater campaign==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};

export const deleteOrArchiveCampaign = async (campaign: CampaignProps) => {
  try {
    if (
      campaign.post.length > 0 &&
      campaign.post.some((item) => item.status === "PUBLISHED")
    ) {
      const archived = await prisma.campaign.update({
        where: { id: campaign.id },
        data: {
          isArchived: true,
        },
      });
    } else {
      const deletedCampaign = await prisma.campaign.delete({
        where: {
          id: campaign.id,
        },
      });
    }
    return {
      success: "Good news! the campaign has been deleted successfully.",
    };
  } catch (error) {
    console.error("Error delete campaign==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};
