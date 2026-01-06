import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-xs", // 24px
        default: "h-8 w-8 text-sm", // 32px
        md: "h-10 w-10 text-base", // 40px
        lg: "h-12 w-12 text-lg", // 48px
        xl: "h-14 w-14 text-xl", // 56px
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg", // Figma shows rounded-xl sometimes, but rounded-lg is common.
      },
    },
    defaultVariants: {
      size: "default",
      shape: "circle",
    },
  }
);

function Avatar({
  className,
  size,
  shape,
  ...props
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape }), className)}
      {...props} />
  );
}

function AvatarImage({
  className,
  ...props
}) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square h-full w-full", className)}
      {...props} />
  );
}

function AvatarFallback({
  className,
  ...props
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex h-full w-full items-center justify-center font-normal text-foreground",
        className
      )}
      {...props} />
  );
}

export { Avatar, AvatarImage, AvatarFallback }