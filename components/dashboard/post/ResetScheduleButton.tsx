import { schedulePublicationPost } from "@/actions/post";
import { useToast } from "@/hooks/use-toast";
import { PostProps } from "@/types/types";
import clsx from "clsx";
import { CalendarX } from "lucide-react";
import React from "react";

type ResponseProps =
  | {
      error: string;
      success?: undefined;
    }
  | {
      success: string;
      error?: undefined;
    };

const ResetScheduleButton = ({
  data,
  handleResponseToast,
}: {
  data: PostProps;
  handleResponseToast: (response: ResponseProps) => void;
}) => {
  const { toast } = useToast();
  return (
    <div
      onClick={async (e) => {
        try {
          if (data) {
            const response = await schedulePublicationPost(data.id, null);
            handleResponseToast(response);
          }
        } catch (error: any) {
          console.error(error);
          toast({
            variant: "destructive",
            description: error.message,
          });
        }
      }}
      className={clsx(
        "flex gap-1 items-center bg-blue-400 self-start rounded-sm px-3 py-2 cursor-pointer text-white hover:bg-blue-700 duration-500"
      )}
    >
      <CalendarX /> reset schedule
    </div>
  );
};

export default ResetScheduleButton;
