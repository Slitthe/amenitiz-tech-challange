import { chessDotComApiClient } from "./base.ts";
import { z } from "zod";

const grandmastersSchema = z.object({
    players: z.array(z.string().min(1)),
});

export type Grandmasters = z.infer<typeof grandmastersSchema>;

export const apiGetGrandmasters = async (abortSignal?: AbortSignal): Promise<Grandmasters> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await chessDotComApiClient.get<unknown>("/titled/GM", {
        signal: abortSignal,
    });

    const parseResponseResult = await grandmastersSchema.safeParseAsync(response.data);
    if (parseResponseResult.error) {
        throw new Error(parseResponseResult.error.message);
    }

    return parseResponseResult.data;
};
