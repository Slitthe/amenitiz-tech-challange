import { Skeleton } from "@/components/ui/Skeleton.tsx";
import { Calendar } from "lucide-react";
import { formatJoinedDate } from "@/lib/utils/formatJoinedDate.ts";
import type { GrandmasterDetails } from "@/api/chess-dot-com/grandmaster.ts";

export interface ProfileJoinedDateProps {
    loading: boolean;
    grandmaster: GrandmasterDetails | null;
}

export const ProfileJoinedDate = ({ loading, grandmaster }: ProfileJoinedDateProps) => {
    return (
        <>
            {loading ? <Skeleton className="h-4 w-32" /> : null}
            {grandmaster?.joined ? (
                <>
                    <Calendar className="h-5" />
                    <span className="font-bold">Joined</span>: {formatJoinedDate(grandmaster.joined)}
                </>
            ) : null}
        </>
    );
};
