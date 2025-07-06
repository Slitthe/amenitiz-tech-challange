import { Skeleton } from "@/components/ui/Skeleton.tsx";
import { Badge } from "@/components/ui/Badge.tsx";
import { LucideExternalLink } from "lucide-react";
import type { GrandmasterDetails } from "@/api/chess-dot-com/grandmaster.ts";

export interface ProfileNameProps {
    loading: boolean;
    grandmaster: GrandmasterDetails | null;
}

export const ProfileName = ({ loading, grandmaster }: ProfileNameProps) => {
    return (
        <>
            {loading ? <Skeleton className="h-4 w-24" /> : null}
            {loading ? <Skeleton className="h-4 w-32" /> : null}
            {grandmaster?.username ? (
                <div className="flex items-center flex-col justify-center gap-2">
                    {grandmaster?.title ? <Badge>{grandmaster?.title}</Badge> : null}
                    <a target="_blank" rel="noreferrer" href={grandmaster?.url} className="font-bold h-4 hover:underline flex items-center justify-center">
                        {grandmaster?.username}
                        <LucideExternalLink className="h-4" />
                    </a>
                </div>
            ) : null}
            {grandmaster?.name ? <div className="h-4">{grandmaster.name}</div> : null}
        </>
    );
};
