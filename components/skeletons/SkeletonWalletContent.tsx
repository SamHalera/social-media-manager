import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonWalletContent() {
  return (
    <div className="w-full flex justify-around  gap-4">
      <div className="mt-8 pr-4 border-r border-blue-200">
        <Skeleton className="h-[260px] w-[290px] rounded-xl" />
      </div>
      <div className="flex flex-col flex-1 relative self-center">
        <div className="space-y-4 p-8">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}
