import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/Card.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { useEffect, useState } from "react";

import { ArrowLeft, CircleX, User } from "lucide-react";
import { Link, useParams } from "react-router";
import { apiGetGrandmaster, type GrandmasterDetails } from "@/api/chess-dot-com/grandmaster.ts";
import { AxiosError } from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar.tsx";

import { ProfileLocation } from "@/pages/GrandmasterProfile/components/ProfileLocation.tsx";
import { ProfileLastOnlineAt } from "@/pages/GrandmasterProfile/components/ProfileLastOnlineAt.tsx";
import { ProfileName } from "@/pages/GrandmasterProfile/components/ProfileName.tsx";
import { ProfileVerifiedStatus } from "@/pages/GrandmasterProfile/components/ProfileVerifiedStatus.tsx";
import { ProfileFollowers } from "@/pages/GrandmasterProfile/components/ProfileFollowers.tsx";
import { ProfileJoinedDate } from "@/pages/GrandmasterProfile/components/ProfileJoinedDate.tsx";

export const GrandmasterProfilePage = () => {
    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [grandmaster, setGrandmaster] = useState<GrandmasterDetails | null>(null);

    const getGrandmaster = async (username: string, abortSignal: AbortSignal) => {
        try {
            setIsLoading(true);
            const grandmaster = await apiGetGrandmaster(username, abortSignal);
            setGrandmaster(grandmaster);
            setIsLoading(false);
        } catch (e) {
            if (!(e instanceof AxiosError && e.code === "ERR_CANCELED")) {
                setIsError(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();

        if (username) {
            getGrandmaster(username, abortController.signal);
        }

        return () => {
            abortController.abort();
        };
    }, [username]);

    if (isError) {
        return (
            <Card className="w-full" data-testid="grandmaster-profile-error">
                <CardHeader className="flex items-center justify-between">
                    <CardAction>
                        <Button asChild variant="link" className="hover:cursor-pointer">
                            <Link to={"/"}>
                                <ArrowLeft />
                                Go Back
                            </Link>
                        </Button>
                    </CardAction>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <ProfileName loading={isLoading} grandmaster={grandmaster} />
                    </div>
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={grandmaster?.avatar} />
                        <AvatarFallback>
                            <User className="w-12 h-12 bg-muted" />
                        </AvatarFallback>
                    </Avatar>
                </CardHeader>
                <CardContent className="flex flex-col  items-center justify-center gap-4 min-h-80">
                    <div className="text-lg">Something went wrong</div>
                    <CircleX className="h-12 w-12 text-red-400" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full" data-testid="grandmaster-profile-content">
            <CardHeader className="flex items-center justify-between">
                <CardAction>
                    <Button asChild variant="link" className="hover:cursor-pointer">
                        <Link to={"/"}>
                            <ArrowLeft />
                            Go Back
                        </Link>
                    </Button>
                </CardAction>
                <div className="flex flex-col items-center justify-center gap-2">
                    <ProfileName loading={isLoading} grandmaster={grandmaster} />
                </div>
                <Avatar className="h-12 w-12">
                    <AvatarImage src={grandmaster?.avatar} />
                    <AvatarFallback>
                        <User className="w-12 h-12 bg-muted" />
                    </AvatarFallback>
                </Avatar>
            </CardHeader>
            <CardContent className="flex flex-col  justify-center gap-4">
                <div className="h-4 flex gap-1 items-center">
                    <ProfileLocation grandmaster={grandmaster} loading={isLoading} />
                </div>
                <div className="h-4 flex gap-1 items-center">
                    <ProfileVerifiedStatus grandmaster={grandmaster} loading={isLoading} />
                </div>

                <div className="h-4 flex gap-1 items-center">
                    <ProfileFollowers grandmaster={grandmaster} loading={isLoading} />
                </div>

                <div className="h-4 flex gap-1 items-center">
                    <ProfileJoinedDate loading={isLoading} grandmaster={grandmaster} />
                </div>

                <div className="h-4 flex gap-1 items-center">
                    <ProfileLastOnlineAt grandmaster={grandmaster} loading={isLoading} />
                </div>
            </CardContent>
        </Card>
    );
};
