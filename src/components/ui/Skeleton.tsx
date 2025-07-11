import { cn } from "@/lib/utils/cn.ts";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return <div data-slot="skeleton" data-testid="ui-skeleton" className={cn("bg-accent animate-pulse rounded-md", className)} {...props} />;
}

export { Skeleton };
