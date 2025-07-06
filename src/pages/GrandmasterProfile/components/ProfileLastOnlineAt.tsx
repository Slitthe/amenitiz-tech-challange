import { Skeleton } from "@/components/ui/Skeleton.tsx";
import { Clock } from "lucide-react";
import { formatLastOnline } from "@/lib/utils/formatLastOnlineDate.ts";
import { useEffect, useState } from "react";
import type { GrandmasterDetails } from "@/api/chess-dot-com/grandmaster.ts";
import { DateTime } from "luxon";

export interface ProfileLastOnlineAtProps {
    loading: boolean;
    grandmaster: GrandmasterDetails | null;
}
export const ProfileLastOnlineAt = ({ grandmaster, loading }: ProfileLastOnlineAtProps) => {
    const [lastCheckedAtTime, setLastCheckedAtTime] = useState<number>(DateTime.now().toSeconds());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLastCheckedAtTime(DateTime.now().toSeconds());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            {loading ? <Skeleton className="h-4 w-48" /> : null}
            {grandmaster?.last_online ? (
                <>
                    <Clock className="h-5" /> <span className="font-bold">Last seen</span> {formatLastOnline(grandmaster?.last_online, lastCheckedAtTime)} ago
                </>
            ) : null}
        </>
    );
};
