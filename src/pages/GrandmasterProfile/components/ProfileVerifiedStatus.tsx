import { Skeleton } from "@/components/ui/Skeleton.tsx";
import { ShieldCheck, ShieldX } from "lucide-react";
import type { GrandmasterDetails } from "@/api/chess-dot-com/grandmaster.ts";

export interface ProfileVerifiedStatusProps {
    loading: boolean;
    grandmaster: GrandmasterDetails | null;
}

export const ProfileVerifiedStatus = ({ loading, grandmaster }: ProfileVerifiedStatusProps) => {
    return (
        <>
            {loading ? <Skeleton className="h-4 w-16" /> : null}
            {grandmaster?.verified !== undefined ? (
                <>
                    {grandmaster.verified ? <ShieldCheck className="h-5 text-green-500" /> : <ShieldX className="h-5 text-red-400" />}
                    {grandmaster.verified ? "Verified" : "Not verified"}{" "}
                </>
            ) : null}
        </>
    );
};
