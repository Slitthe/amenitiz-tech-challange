import { Skeleton } from "@/components/ui/Skeleton.tsx";
import { MapPin } from "lucide-react";
import type { GrandmasterDetails } from "@/api/chess-dot-com/grandmaster.ts";
import { useGetCountry } from "@/lib/hooks/useGetCountry.ts";

export interface ProfileLocationProps {
    loading: boolean;
    grandmaster: GrandmasterDetails | null;
}

export const ProfileLocation = ({ loading, grandmaster }: ProfileLocationProps) => {
    const { loading: countryLoading, countryDetails } = useGetCountry(grandmaster?.country?.split("/").at(-1));

    return (
        <>
            {loading || countryLoading ? <Skeleton className="h-4 w-16" /> : null}
            {(grandmaster?.location || countryDetails?.name) && !(loading || countryLoading) ? (
                <div className="flex items-center gap-1 ">
                    <MapPin className="h-5" />
                    <div>{grandmaster?.location ? grandmaster?.location : null}</div>
                    {grandmaster?.location && !countryDetails?.name ? "," : null}
                    {countryDetails?.name ? <div>{countryDetails?.name ? countryDetails?.name : null}</div> : null}
                </div>
            ) : null}
        </>
    );
};
