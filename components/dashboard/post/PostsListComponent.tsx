import { PostProps } from "@/types/types";
import { Post } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import PostItemComponent from "./PostItemComponent";
import SearchBarPosts from "../campaign/SearchBarPosts";
import FiltersPosts from "@/components/filters/FiltersPosts";
import { useFiltersPostStore } from "@/stores/filtersPost";
import { filterAndSortDataPosts } from "@/lib/postHelpers";

const PostsListComponent = ({
  dataPosts,
}: {
  dataPosts: PostProps[] | null | undefined;
}) => {
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const { status, publicationDate, createdAtDate } = useFiltersPostStore();

  const filteredAndSortedPosts = filterAndSortDataPosts(
    dataPosts ?? [],
    status,
    publicationDate,
    createdAtDate,
    searchedValue
  );
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full">
      <FiltersPosts
        inputValue={inputValue}
        setInputValue={setInputValue}
        setSearchedValue={setSearchedValue}
      />

      <div className="flex flex-wrap gap-2 justify-start items-center w-full">
        {filteredAndSortedPosts
          ?.filter((item) => {
            if (status.length > 0) {
              return status.includes(item.status);
            }
            return item;
          })
          .map((post, index) => {
            return (
              <PostItemComponent key={post.id} post={post} index={index} />
            );
          })}
      </div>
    </div>
  );
};

export default PostsListComponent;
