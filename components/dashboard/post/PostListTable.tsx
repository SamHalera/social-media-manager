import React, { SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { CampaignProps, PostProps } from "@/types/types";
import { useFiltersPostStore } from "@/stores/filtersPost";
import { filterAndSortDataPosts } from "@/lib/postHelpers";
import clsx from "clsx";
import { EyeIcon } from "lucide-react";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import { deletePost } from "@/actions/post";
import { useToast } from "@/hooks/use-toast";

const PostListTable = ({
  dataPosts,
  setRefresh,
}: {
  dataPosts: PostProps[] | null | undefined;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const { toast } = useToast();
  const { status, scheduledPublicationDate, createdAtDate } =
    useFiltersPostStore();

  const filteredAndSortedPosts = filterAndSortDataPosts(
    dataPosts ?? [],
    status,
    scheduledPublicationDate,
    createdAtDate,
    searchedValue
  );
  const handleDeleteTransaction = async (item: PostProps) => {
    try {
      const response = await deletePost(item);
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
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="w-80">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Caption</TableHead>
            <TableHead className="w-[100px]">
              Scheduled publication date
            </TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedPosts.map((item, index) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{index}</TableCell>
                <TableCell className="font-medium">
                  {dayjs(item.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="">
                  <span
                    className={clsx("text-xs  px-3 py-1 rounded-full", {
                      "bg-indigo-300": item.status === "DRAFT",
                      "bg-indigo-700 text-white": item.status === "PUBLISHED",
                    })}
                  >
                    {item.status.toLowerCase()}
                  </span>
                </TableCell>

                <TableCell className={clsx("text-right", {})}>
                  {item.caption.substring(0, 100)} ...
                </TableCell>
                <TableCell className="text-right flex justify-end gap-4">
                  <EyeIcon />
                  {/* <div className=" cursor-pointer h-10 w-10 bg-red-200 text-red-700 hover:bg-red-700 hover:text-red-200 p-3 duration-500 flex justify-center items-center rounded-full"> */}
                  <AlertDeleteAction
                    item={item}
                    deleteToContinue={handleDeleteTransaction}
                    pathToRedirect={`/dashboard/campaign/${item.campaignId}`}
                  />
                  {/* </div> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostListTable;
