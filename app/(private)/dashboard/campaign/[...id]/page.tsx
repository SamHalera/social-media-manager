import CampaignContentComponent from "@/components/dashboard/campaign/CampaignContentComponent";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="w-full">
      <CampaignContentComponent campaignId={parseFloat(id)} />
    </div>
  );
};

export default page;
