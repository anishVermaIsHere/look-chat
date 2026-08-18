import { Icons } from "@/widgets/icons"
import { cn } from "@/lib/utils"

export default function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="flex justify-center items-center gap-4 h-screen">
        <Icons.loader
        role="status"
        aria-label="Loading"
        className={cn("size-8 animate-spin", className)}
        {...props}
        />
    </div>
  )
}


