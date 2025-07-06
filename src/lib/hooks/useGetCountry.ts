import { useEffect, useState } from "react";
import { apiGetCountry, type CountryDetails } from "@/api/chess-dot-com/country.ts";

export const useGetCountry = (countryCode?: string) => {
    const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);
    const [loading, setLoading] = useState(false);

    const getCountry = async (username: string, abortSignal: AbortSignal) => {
        try {
            setLoading(true);
            const country = await apiGetCountry(username, abortSignal);
            setCountryDetails(country);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        if (countryCode) {
            getCountry(countryCode, abortController.signal);
        }

        return () => {
            abortController.abort();
        };
    }, [countryCode]);

    return { loading, countryDetails };
};
