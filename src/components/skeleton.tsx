import {Button, Skeleton} from "@nextui-org/react";

import {ISkeleton} from "@/types/skeleton";
import {Icon} from "@iconify/react";

export default function RSkeleton({numberOfSkeletons, childStyle, parentStyle}: ISkeleton) {
  const skeletons = new Array(numberOfSkeletons ?? 10).fill(null);

  return (
    <>
      <div className="w-full flex items-center gap-3">
        <div className={`w-full ${parentStyle ? parentStyle : "flex flex-col gap-2"}`}>
          {skeletons &&
            skeletons?.map((_, index) => (
              <Skeleton key={index} className={`${childStyle ?? "h-10 w-full rounded-lg"}`} />
            ))}
        </div>
      </div>
    </>
  );
}
