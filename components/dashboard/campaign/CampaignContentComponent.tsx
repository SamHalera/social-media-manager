"use client";
import React, { useEffect, useState } from "react";

import CreateOrEditModal from "../post/CreateOrEditModal";

import { SkeletonCampaignContent } from "@/components/skeletons/SkeletonCampaignContent";

import { deleteOrArchiveCampaign, getCampaignById } from "@/actions/campaign";
import { CampaignProps } from "@/types/types";

import PostsListComponent from "../post/PostsListComponent";

import CreateOrEditCampaignModal from "./CreateOrEditCampaignModal";

import AlertDeleteOrArchiveCampaign from "@/components/AlertDeleteOrArchiveCampaign";
import { useToast } from "@/hooks/use-toast";

const CampaignContentComponent = ({ campaignId }: { campaignId: number }) => {
  const [dataCampaign, setDataCampaign] = useState<CampaignProps>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [refresh, setRefresh] = useState<boolean>(false);

  const { toast } = useToast();

  const handleDeleteOrArchiveCampaign = async (item: CampaignProps) => {
    try {
      const response = await deleteOrArchiveCampaign(item);

      if (response.success) {
        setRefresh(true);
        toast({
          variant: "default",
          description: response.success,
        });
      }
      if (response.error) {
        toast({
          variant: "destructive",
          description: response.error,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description:
          "Oups! something went wrong while deleting transaction! Try to submit the form again...",
      });
    }
  };
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
            <div className="flex flex-col items-center gap-4 self-center ">
              <h1 className="text-center text-2xl text-blue-600 font-semibold ">
                {dataCampaign?.name}
              </h1>
              <div className="flex justify-between gap-10 bg-slate-100 py-4 px-6 rounded-lg">
                {dataCampaign && (
                  <>
                    <CreateOrEditCampaignModal
                      setRefresh={setRefresh}
                      campaign={dataCampaign}
                    />
                    <AlertDeleteOrArchiveCampaign
                      item={dataCampaign}
                      actionToContinue={handleDeleteOrArchiveCampaign}
                      pathToRedirect={`/dashboard/campaign/${dataCampaign?.id}`}
                    />
                  </>
                )}
              </div>
            </div>

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
