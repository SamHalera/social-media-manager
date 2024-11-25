import { PostProps } from "@/types/types";
import { Post } from "@prisma/client";
import clsx from "clsx";
import { CalendarClock } from "lucide-react";
import Link from "next/link";
import React from "react";

const PostItemComponent = ({
  post,
  index,
}: {
  post: PostProps;
  index: number;
}) => {
  return (
    <Link
      href={`/dashboard/post/${post.id}`}
      key={post.id}
      className="border-l-4 border-blue-600 px-4 py-6 flex flex-col gap-2 items-center bg-slate-200 rounded-md shadow-md flex-1 h-48 hover:shadow-none hover:bg-slate-100 duration-500"
    >
      <div className="flex justify-between w-full">
        <span className=" w-8 h-8 flex justify-center items-center rounded-full text-white bg-blue-400">
          {index + 1}
        </span>
        <span
          className={clsx(
            " px-4 flex items-center justify-center rounded-full text-sm",
            {
              "bg-yellow-300": post.status === "DRAFT",
              "bg-green-300": post.status === "PUBLISHED",
            }
          )}
        >
          {post.status.toLowerCase()}
        </span>
      </div>
      <h2 className="text-blue-400 font-semibold">{post.name}</h2>
      <div
        className="text-sm italic"
        dangerouslySetInnerHTML={{
          __html: `"${post.caption.substring(0, 100)} (...)"`,
        }}
      />
      <div className="text-sm flex items-center gap-1">
        <CalendarClock />
        Scheduled on{" "}
        <span className="italic font-semibold text-blue-400">no schedule</span>
      </div>
    </Link>
  );
};

export default PostItemComponent;
