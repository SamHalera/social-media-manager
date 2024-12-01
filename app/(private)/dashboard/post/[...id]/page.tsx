import PostContent from "@/components/dashboard/post/PostContent";
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
