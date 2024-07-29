import {Icon} from "@iconify/react";
import {Button, Progress, Skeleton} from "@nextui-org/react";
import React from "react";

export default function FormSkeleton({
  numberOfSkeletons,
  isButton,
}: {
  numberOfSkeletons?: number;
  isButton?: boolean;
}) {
  const skeletons = new Array(numberOfSkeletons ?? 3).fill(null);
  const buttonState: boolean = isButton ?? true;

  return (
    <>
      <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-full" />
      <div className="w-full flex items-center gap-3">
        <div className={`w-full flex flex-col gap-2`}>
          {skeletons &&
            skeletons?.map((_, index) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Skeleton key={index} className={`h-10 w-full rounded-lg`} />
                <Skeleton key={index} className={`h-10 w-full rounded-lg`} />
                <Skeleton key={index} className={`h-10 w-full rounded-lg`} />
              </div>
            ))}
        </div>
      </div>

      {buttonState && (
        <div className="flex flex-wrap justify-end gap-3 mt-3" id="buttons">
          <Button
            isLoading={true}
            radius="sm"
            color="default"
            type="reset"
            variant="solid"
            className="font-semibold"
          >
            <Icon height={24} icon="majesticons:close-line" width={24} />
          </Button>
          <Button
            isLoading={true}
            className="font-semibold"
            color="default"
            radius="sm"
            type="submit"
            variant="solid"
          >
            <Icon height={24} icon="ic:round-download-done" width={24} />
          </Button>
        </div>
      )}
    </>
  );
}
