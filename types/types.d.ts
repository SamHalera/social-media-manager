import { Media, Post, User } from "@prisma/client";

type CampaignProps = {
  id: number;
  name: string;
  post: PostProps[];
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
  user: User;
  campaignId: number;
  media: Media[];
};
///////////////
type WalletProps = {
  id: number;
  name: string;
  balance: number;
  transaction: TransactionProps[];
};

type TransactionProps = {
  id: number;
  label: string;
  type: string;
  date: Date;
  amount: number;
  transactionStatus: string;
  paymentMethod: string;
  walletId: number;
};
type TransactionFormValuesProps = {
  id: number;
  label: string;
  type: string;
  date: Date;
  amount: string;
  transactionStatus: string;
  paymentMethod: string;
  walletId: number;
};

type TransactionsChartProps = {
  month: string;
  incomes: number;
  expenses: number;
};
