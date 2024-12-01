import { Copy, CopyCheck, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";

import { UploadMediaFormType } from "./AddMediaForm";
import { CldImage } from "next-cloudinary";
import { Input } from "@/components/ui/input";

const AddMediaRow = ({
  field,
  remove,
  index,
}: {
  field: FieldArrayWithId<UploadMediaFormType, "mediaPosts", "mediaId">;
  remove: UseFieldArrayRemove;
  index: number;
}) => {
  console.log("field=+>", field);
  const [copyChecked, setCopyChecked] = useState<boolean>(false);
  return (
    <div className=" flex flex-col gap-3 bg-slate-100 rounded-md shadow-sm p-4 w-72 items-center">
      <Trash2
        onClick={() => {
          remove(index);
        }}
        className="size-6 self-end text-red-400 cursor-pointer"
      />
      <CldImage
        width="200"
        height="200"
        src={field.source}
        crop="fill"
        sizes="100vw"
        alt="Media for my post"
        className="rounded-md"
      />

      <Input
        type="text"
        disabled
        value={field.source}
        name={`mediaPosts.${index}.source`}
      />
      <div
        onClick={async () => {
          await navigator.clipboard.writeText(field.source);
          setCopyChecked(true);
          setTimeout(() => {
            setCopyChecked(false);
          }, 300);
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        {copyChecked ? <CopyCheck className="text-slate-500" /> : <Copy />}

        <span className="text-xs">copy url</span>
      </div>
    </div>
  );
};

export default AddMediaRow;
