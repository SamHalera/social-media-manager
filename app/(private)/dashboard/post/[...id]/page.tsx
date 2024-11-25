import PostContent from "@/components/dashboard/post/PostContent";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = parseFloat(params.id);
  return (
    <div>
      <PostContent id={id} />
    </div>
  );
};

export default page;
