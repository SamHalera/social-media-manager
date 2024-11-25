"use server";
import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getCampaignById = async (id: number) => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: {
        id,
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
    const { id, name } = values;
    if (id === 0) {
      const newCampaign = await createCampaign(name);
      if (!newCampaign) {
        return {
          error: "Oups! something went wrong! Try to submit the form again...",
        };
      }
    } else {
    }
    revalidatePath("/dashboard");
    return {
      succes: "Good news! Campaign created or updated successfully.",
    };
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
      },
    });
    if (!newCampaign) {
      return {
        error: "Oups! something went wrong! Try to submit the form again...",
      };
    }
    return {
      succes: "Good news! A new campaign has been created successfully.",
    };
  } catch (error) {
    console.error("Error create campaign==>", error);
    return {
      error: "Oups! something went wrong! Try to submit the form again...",
    };
  }
};
