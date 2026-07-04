import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-zinc-500 data-horizontal:h-0.5 data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props} />
  );
}

export { Separator }
