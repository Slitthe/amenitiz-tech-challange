import { chessDotComApiClient } from "./base.ts";
import { z } from "zod";

export enum GrandmasterStatus {
    closed = "closed",
    fairPlayViolations = "closed:fair_play_violations",
    basic = "basic",
    premium = "premium",
    mod = "mod",
    staff = "staff",
}

const grandmasterDetails = z.object({
    avatar: z.string().min(1).optional(),
    player_id: z.number(),
    "@id": z.string().min(1),
    url: z.string().min(1),
    name: z.string().min(1).optional(),
    username: z.string().min(1),
    followers: z.number(),
    country: z.string().min(1),
    location: z.string().min(1).optional(),
    last_online: z.number(),
    joined: z.number(),
    status: z.nativeEnum(GrandmasterStatus),
    is_streamer: z.boolean(),
    verified: z.boolean().optional(),
    title: z.string().min(1).optional(),
});

export type GrandmasterDetails = z.infer<typeof grandmasterDetails>;

export const apiGetGrandmaster = async (username: string, abortSignal?: AbortSignal): Promise<GrandmasterDetails> => {
    const response = await chessDotComApiClient.get<unknown>(`/player/${username}`, {
        signal: abortSignal,
    });

    const parseResponseResult = await grandmasterDetails.safeParseAsync(response.data);
    if (parseResponseResult.error) {
        console.log({ parseResponseResult });
        throw new Error(parseResponseResult.error.message);
    }

    return parseResponseResult.data;
};
