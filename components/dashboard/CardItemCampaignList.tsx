import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

import { CampaignProps } from "@/types/types";
import { StickyNote } from "lucide-react";
import clsx from "clsx";

const CardItemCampaignList = ({ campaign }: { campaign: CampaignProps }) => {
  return (
    <div>
      <Link href={`/dashboard/campaign/${campaign.id}`} className="group">
        <Card className=" shadow-sm border border-slate-100 group-hover:bg-blue-50 duration-500">
          <CardHeader>
            <span
              className={clsx(
                "self-end px-2 py-1 rounded-full text-xs mb-2 text-slate-700",
                {
                  "bg-green-400": !campaign.isArchived,
                  "bg-yellow-400": campaign.isArchived,
                }
              )}
            >
              {campaign.isArchived ? "archived" : "active"}
            </span>
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
