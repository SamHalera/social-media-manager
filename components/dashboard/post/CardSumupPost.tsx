import { Post } from "@prisma/client";
import React, { SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, CalendarClock, User } from "lucide-react";
import { PostProps } from "@/types/types";
import dayjs from "dayjs";
import clsx from "clsx";
import SchedulePublicationModal from "./SchedulePublicationModal";
import CreatedAtMention from "./CreatedAtMention";
import ScheduledAtMention from "./ScheduledAtMention";
import PublishedAtMention from "./PublishedAtMention";

const CardSumupPost = ({ post }: { post: PostProps }) => {
  return (
    <Card className=" shadow-sm border border-slate-100 group-hover:bg-blue-50 duration-500 w-80">
      <CardHeader>
        <CardTitle className="text-center mb-4">
          <span className="text-xl text-blue-700 ">{post.name}</span>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-3 items-center justify-center ">
            <span
              className={clsx(
                "font-semibold text-xs  text-white rounded-full px-4 py-2",
                {
                  "bg-yellow-400": post.status === "DRAFT",
                  "bg-orange-400": post.status === "PENDING",
                  "bg-green-400": post.status === "PUBLISHED",
                }
              )}
            >
              {post.status}
            </span>
            <div className="border-t border-slate-300 py-3 flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <User />
                created by{" "}
                <span className="text-blue-500 font-semibold">
                  {post.user.firstname}
                </span>
              </div>

              <CreatedAtMention createdAt={post.createdAt} />
              {post.publishedAt ? (
                <PublishedAtMention publishedAt={post.publishedAt} />
              ) : (
                <div className="flex flex-col gap-2 items-center">
                  <ScheduledAtMention
                    scheduledPublicationDate={post.scheduledPublicationDate}
                  />
                  <span className="text-blue-500 font-semibold">
                    <SchedulePublicationModal data={post} />
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardSumupPost;
