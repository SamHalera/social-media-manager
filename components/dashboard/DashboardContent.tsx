"use client";
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import { SkeletonCard } from "../skeletons/SkeletonCard";

import { getCampaigns } from "@/actions/campaign";
import CardItemCampaignList from "./CardItemCampaignList";
import { CampaignProps } from "@/types/types";

const CreateOrEditCampaignModal = dynamic(
  () => import("@/components/dashboard/campaign/CreateOrEditCampaignModal")
);

const DashboardContent = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [dataCampaign, setDataCampaign] = useState<CampaignProps[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaigns = await getCampaigns();

        if (campaigns) setDataCampaign(campaigns);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl text-blue-500 mb-4">My Campaigns</h2>
      <div className="flex flex-col items-center">
        <span className="mb-2">create a campaign</span>
        <CreateOrEditCampaignModal setRefresh={setRefresh} />
      </div>
      <div className="flex justify-center items-center gap-6 my-10">
        {dataCampaign ? (
          dataCampaign.map((campaign) => {
            return (
              <CardItemCampaignList key={campaign.id} campaign={campaign} />
            );
          })
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
