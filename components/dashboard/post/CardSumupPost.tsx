import { Post } from "@prisma/client";
import React from "react";
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

const CardSumupPost = ({ post }: { post: PostProps }) => {
  return (
    <Card className=" shadow-sm border border-slate-100 group-hover:bg-blue-50 duration-500 w-80">
      <CardHeader>
        <CardTitle className="text-center mb-4">
          <span className="text-xl text-blue-700 ">{post.name}</span>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-3 items-center justify-center ">
            <span className="font-semibold text-xs bg-yellow-400 text-white rounded-full px-4 py-2">
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
              <div className="flex gap-2 items-center">
                <Calendar />
                created at :{" "}
                <span className="text-blue-500 font-semibold">
                  {dayjs(post.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <CalendarClock />
                scheduled publish at :{" "}
                <span className="text-blue-500 font-semibold">
                  {post.publishedAt
                    ? dayjs(post?.publishedAt).format("DD/MM/YYYY")
                    : "no schedule"}
                </span>
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-6 justify-around">
        <div className="flex flex-col gap-2 items-center"></div>
      </CardContent>
    </Card>
  );
};

export default CardSumupPost;
