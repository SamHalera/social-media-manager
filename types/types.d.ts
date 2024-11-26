import { Media, Post, User } from "@prisma/client";

type CampaignProps = {
  id: number;
  name: string;
  post: PostProps[];
  isArchived: boolean;
};

type PostProps = {
  id: number;
  name: string;
  caption: string;
  hashtag: string;
  imagesComment: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  scheduledPublicationDate: Date | null;
  user: User;
  campaignId: number;
  media: Media[];
};
