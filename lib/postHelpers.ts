import { PostProps } from "@/types/types";
import { isAfter, isBefore, isEqual } from "date-fns";
import { DateRange } from "react-day-picker";

export const filterAndSortDataPosts = (
  data: PostProps[],
  status: string[],
  scheduledPublicationDate: DateRange | undefined,
  createdAtDate: DateRange | undefined,
  searchedValue: string
) => {
  console.log("createdAtDate inside function===>", createdAtDate);
  return (
    data
      //   .sort((a, b) => {
      //     return a.createdAt.getTime() - b.createdAt.getTime();
      //   })

      .filter((elt: PostProps) => {
        if (status.length > 0) return status.includes(elt.status);
        else return elt;
      })
      .filter((elt) => {
        if (createdAtDate && createdAtDate.from && createdAtDate.to) {
          return (
            isEqual(elt.createdAt, createdAtDate.from) ||
            isEqual(elt.createdAt, createdAtDate.to) ||
            (isAfter(elt.createdAt, createdAtDate.from) &&
              isBefore(elt.createdAt, createdAtDate.to))
          );
        } else {
          return elt;
        }
      })
      .filter((elt) => {
        if (
          elt.scheduledPublicationDate &&
          scheduledPublicationDate &&
          scheduledPublicationDate.from &&
          scheduledPublicationDate.to
        ) {
          return (
            isEqual(
              elt.scheduledPublicationDate,
              scheduledPublicationDate.from
            ) ||
            isEqual(
              elt.scheduledPublicationDate,
              scheduledPublicationDate.to
            ) ||
            (isAfter(
              elt.scheduledPublicationDate,
              scheduledPublicationDate.from
            ) &&
              isBefore(
                elt.scheduledPublicationDate,
                scheduledPublicationDate.to
              ))
          );
        } else {
          return elt;
        }
      })
      .filter((elt) => {
        if (searchedValue) {
          return (
            elt.name.toLowerCase().includes(searchedValue.toLowerCase()) ||
            elt.caption.toLowerCase().includes(searchedValue.toLowerCase())
          );
        }
        return elt;
      })
  );
};
