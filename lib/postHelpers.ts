import { PostProps } from "@/types/types";
import { isAfter, isBefore, isEqual } from "date-fns";
import { DateRange } from "react-day-picker";

export const filterAndSortDataPosts = (
  data: PostProps[],
  status: string[],
  publicationDate: DateRange | undefined,
  createdAtDate: DateRange | undefined,
  searchedValue: string
) => {
  return (
    data
      //   .sort((a, b) => {
      //     return a.createdAt.getTime() - b.createdAt.getTime();
      //   })

      .filter((elt: PostProps) => {
        if (status.length > 0) return status.includes(elt.status);
        else return elt;
      })
      //   .filter((elt) => {
      //     if (publicationDate && publicationDate.from && publicationDate.to) {
      //       return (
      //         isEqual(elt.publicationDate, publicationDate.from) ||
      //         isEqual(elt.publicationDate, publicationDate.to) ||
      //         (isAfter(elt.publicationDate, publicationDate.from) && isBefore(elt.publicationDate, publicationDate.to))
      //       );
      //     } else {
      //       return elt;
      //     }
      //   })
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
