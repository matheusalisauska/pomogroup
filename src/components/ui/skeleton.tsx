import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent dark:bg-gray-100/50 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
