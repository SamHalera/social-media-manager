import { ArrowLeft, Eye, GalleryThumbnails } from "lucide-react";
import React, { SetStateAction } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Media } from "@prisma/client";
import { CldImage } from "next-cloudinary";
const CarouselMedia = ({
  isCarouselView,
  setIsCarouselView,
  media,
}: {
  isCarouselView: boolean;
  setIsCarouselView: React.Dispatch<SetStateAction<boolean>>;
  media?: Media[];
}) => {
  return (
    <div className=" flex flex-col justify-center items-center gap-10">
      <div
        onClick={() => {
          setIsCarouselView(!isCarouselView);
        }}
        className="flex items-center gap-2 cursor-pointer bg-"
      >
        <ArrowLeft size={30} /> back to media manager
      </div>
      <Carousel className="w-full max-w-md mt-10">
        <CarouselContent className="mx-auto">
          {media?.map((item, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <CldImage
                      width="600"
                      height="600"
                      src={item.source}
                      crop="fill"
                      sizes="100vw"
                      alt="Media for my post"
                      className="rounded-md"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselMedia;
