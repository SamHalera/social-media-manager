"use client";
import React, { useEffect, useState } from "react";

import CreateOrEditModal from "../post/CreateOrEditModal";

import { SkeletonCampaignContent } from "@/components/skeletons/SkeletonCampaignContent";

import { getCampaignById } from "@/actions/campaign";
import { CampaignProps } from "@/types/types";

import PostsListComponent from "../post/PostsListComponent";

const CampaignContentComponent = ({ campaignId }: { campaignId: number }) => {
  const [dataCampaign, setDataCampaign] = useState<CampaignProps>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaign = await getCampaignById(campaignId);

        if (campaign) {
          setDataCampaign(campaign);
        }
        setRefresh(false);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="w-full flex flex-col  lg:flex-row justify-around">
      {isLoading ? (
        <SkeletonCampaignContent />
      ) : (
        <>
          <div className="flex flex-col flex-1 relative">
            <h1>{dataCampaign?.name}</h1>

            <div className="p-10">
              <CreateOrEditModal
                setRefresh={setRefresh}
                campaignId={campaignId}
              />
            </div>

            <PostsListComponent dataPosts={dataCampaign?.post} />
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignContentComponent;
