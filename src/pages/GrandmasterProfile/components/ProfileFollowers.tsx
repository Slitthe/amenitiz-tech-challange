import { Skeleton } from "@/components/ui/Skeleton.tsx";
import { User } from "lucide-react";
import type { GrandmasterDetails } from "@/api/chess-dot-com/grandmaster.ts";

export interface ProfileVerifiedStatusProps {
    loading: boolean;
    grandmaster: GrandmasterDetails | null;
}

export const ProfileFollowers = ({ loading, grandmaster }: ProfileVerifiedStatusProps) => {
    return (
        <>
            {loading ? <Skeleton className="h-4 w-32" /> : null}
            {grandmaster?.followers ? (
                <>
                    <User className="h-5" /> {grandmaster?.followers} followers
                </>
            ) : null}
        </>
    );
};
