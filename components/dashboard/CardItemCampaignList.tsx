import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

import { Campaign } from "@prisma/client";
import { CampaignProps } from "@/types/types";
import { Facebook, Instagram, StickyNote } from "lucide-react";

const CardItemCampaignList = ({ campaign }: { campaign: CampaignProps }) => {
  return (
    <div>
      <Link href={`/dashboard/campaign/${campaign.id}`} className="group">
        <Card className=" shadow-sm border border-slate-100 group-hover:bg-blue-50 duration-500">
          <CardHeader>
            <CardTitle className="text-center mb-4">
              <span className="">{campaign.name}</span>
            </CardTitle>
            <CardDescription>
              <div className="flex gap-3 items-center text-blue-700 font-semibold text-xl">
                <StickyNote />
                {campaign.post.length} Posts
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-6 justify-around">
            <div className="flex flex-col gap-2 items-center"></div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CardItemCampaignList;
