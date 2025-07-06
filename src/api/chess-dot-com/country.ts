import { chessDotComApiClient } from "./base.ts";
import { z } from "zod";

const countrySchema = z.object({
    "@id": z.string().min(1),
    code: z.string().min(1),
    name: z.string().min(1),
});

export type CountryDetails = z.infer<typeof countrySchema>;

export const apiGetCountry = async (countryCode: string, abortSignal?: AbortSignal): Promise<CountryDetails> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await chessDotComApiClient.get<unknown>(`/country/${countryCode}`, {
        signal: abortSignal,
    });

    const parseResponseResult = await countrySchema.safeParseAsync(response.data);
    if (parseResponseResult.error) {
        throw new Error(parseResponseResult.error.message);
    }

    return parseResponseResult.data;
};
