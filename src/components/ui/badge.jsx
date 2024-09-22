import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        yellow: "border-transparent bg-[#FEFAEF] text-[#FAB000] hover:bg-yellow-100/80",
        red: "border-transparent bg-[#FFF0F1] text-[#F64946] hover:bg-red-100/80",
        green: "border-transparent bg-[#F0FFFD] text-[#00A18B] hover:bg-green-100/80",
        blue: "border-transparent bg-[#F0F5FF] text-[#0449D0] hover:bg-blue-100/80",
        grey: "border-transparent bg-[#EFEFEF] text-[#737373] hover:bg-grey-100/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
