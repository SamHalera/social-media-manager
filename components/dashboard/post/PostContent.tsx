"use client";
import { getPostById } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateOrEditForm from "./CreateOrEditForm";
import CardSumupPost from "./CardSumupPost";
import { PostProps } from "@/types/types";

const PostContent = ({ id }: { id: number }) => {
  const [dataPost, setDataPost] = useState<PostProps | null>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const post = await getPostById(id);

        if (post) setDataPost(post);
      } catch (error) {
        console.error(error);
      }
    };
    fetchdata();
  }, [refresh]);
  return (
    <div className="flex flex-col gap-4 py-6">
      <Button
        onClick={() =>
          router.push(`/dashboard/campaign/${dataPost?.campaignId}`)
        }
        className="self-start"
      >
        <ArrowLeft /> back to list
      </Button>
      <div className="p-4">
        {dataPost && (
          <div className="flex flex-col gap-10 items-center">
            <CardSumupPost post={dataPost} />
            <div className="w-2/3">
              <CreateOrEditForm
                data={dataPost}
                setRefresh={setRefresh}
                campaignId={dataPost.campaignId}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostContent;
