"use client";
import { getPostById } from "@/actions/post";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateOrEditForm from "./CreateOrEditForm";
import CardSumupPost from "./CardSumupPost";
import { PostProps } from "@/types/types";
import { useRefreshStore } from "@/stores/refresh";
import AddMediaForm from "./media/AddMediaForm";
import CarouselMedia from "./media/CarouselMedia";

const PostContent = ({ id }: { id: number }) => {
  const [dataPost, setDataPost] = useState<PostProps | null>();
  const [addMediaView, setAddMediaView] = useState<boolean>(false);
  const [isCarouselView, setIsCarouselView] = useState<boolean>(false);

  const { refresh, setRefresh } = useRefreshStore();
  const router = useRouter();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const post = await getPostById(id);

        if (post) setDataPost(post);
        setRefresh(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchdata();
  }, [refresh]);
  return (
    <div className="flex flex-col gap-4 py-6">
      {isCarouselView ? (
        <CarouselMedia
          media={dataPost?.media}
          isCarouselView={isCarouselView}
          setIsCarouselView={setIsCarouselView}
        />
      ) : (
        <>
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

                <div className="w-full flex flex-col">
                  {addMediaView ? (
                    <AddMediaForm
                      post={dataPost}
                      isCarouselView={isCarouselView}
                      setIsCarouselView={setIsCarouselView}
                    />
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setAddMediaView(!addMediaView);
                        }}
                        className="self-end"
                      >
                        Manage post media
                      </Button>
                      <CreateOrEditForm
                        data={dataPost}
                        campaignId={dataPost.campaignId}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostContent;
