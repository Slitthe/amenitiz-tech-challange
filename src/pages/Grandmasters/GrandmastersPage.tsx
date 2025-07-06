import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { apiGetGrandmasters } from "@/api/chess-dot-com/grandmasters.ts";
import { AxiosError } from "axios";
import { debounce } from "lodash";
import { Input } from "@/components/ui/Input.tsx";
import { GrandmastersTable } from "@/pages/Grandmasters/components/GrandmastersTable.tsx";
import { GrandmastersTablePagination } from "@/pages/Grandmasters/components/GrandmastersTablePagination.tsx";

const pageSize = 50;

export const GrandmastersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [usernames, setUsernames] = useState<string[]>([]);

    const [filteredUsernames, setFilteredUsernames] = useState<string[]>([]);

    const [query, setQuery] = useState("");

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        filterDebounced(query, usernames, pageSize, currentPage);
    };

    const getUsernames = async (abortSignal: AbortSignal) => {
        try {
            setIsLoading(true);
            const grandmasters = await apiGetGrandmasters(abortSignal);
            setUsernames(grandmasters.players);
            setFilteredUsernames(grandmasters.players.slice((currentPage - 1) * pageSize, currentPage * pageSize + pageSize));
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

        getUsernames(abortController.signal);
    }, []);

    const filterDebounced = useCallback(
        debounce((query: string, originalUsernames: string[], pageSize: number, currentPage: number) => {
            const filtered = originalUsernames.filter((username) => username.includes(query));
            const page = Math.min(Math.ceil(filtered.length / pageSize), currentPage);
            if (page !== currentPage) {
                setCurrentPage(page);
            }

            const paginatedFilteredUsernames = filtered.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
            setFilteredUsernames(paginatedFilteredUsernames);
        }),
        []
    );

    const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        filterDebounced(value, usernames, pageSize, currentPage);
    };

    return (
        <>
            <Input className="p-6" placeholder="Enter username" value={query} onChange={onQueryChange} disabled={isLoading || isError} />
            <div className="overflow-auto relative flex-1 rounded border">
                <GrandmastersTable isLoading={isLoading} usernames={filteredUsernames} />
            </div>

            <GrandmastersTablePagination
                onPageChange={onPageChange}
                activePage={currentPage}
                pageSize={pageSize}
                totalItems={usernames.length}
                disabled={isLoading || isError}
            />
        </>
    );
};
