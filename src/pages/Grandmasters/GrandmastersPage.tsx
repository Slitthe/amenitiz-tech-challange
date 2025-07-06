import { type ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { apiGetGrandmasters } from "@/api/chess-dot-com/grandmasters.ts";
import { AxiosError } from "axios";
import { debounce } from "lodash";
import { Input } from "@/components/ui/Input.tsx";
import { GrandmastersTable } from "@/pages/Grandmasters/components/GrandmastersTable.tsx";
import { GrandmastersTablePagination } from "@/pages/Grandmasters/components/GrandmastersTablePagination.tsx";

import { CircleX } from "lucide-react";

const pageSize = 50;

export const GrandmastersPage = () => {
    const tableContainerRef = useRef<HTMLDivElement | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [usernames, setUsernames] = useState<string[]>([]);

    const [filteredUsernames, setFilteredUsernames] = useState<string[]>([]);

    const [query, setQuery] = useState("");

    const onPageChange = (page: number) => {
        if (page === currentPage) {
            return;
        }

        const maxPage = Math.min(Math.ceil(filteredUsernames.length / pageSize) + 1, page);
        if (maxPage !== currentPage) {
            setCurrentPage(maxPage);
        }

        tableContainerRef?.current?.scrollTo(0, 0);
    };

    const getUsernames = async (abortSignal: AbortSignal) => {
        try {
            setIsLoading(true);
            const grandmasters = await apiGetGrandmasters(abortSignal);
            setUsernames(grandmasters.players);
            setFilteredUsernames(grandmasters.players);
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

        return () => {
            abortController.abort();
        };
    }, []);

    const filterDebounced = useCallback(
        debounce((query: string, originalUsernames: string[], pageSize: number, currentPage: number) => {
            const filtered = originalUsernames.filter((username) => username.includes(query));
            const page = Math.min(Math.ceil(filtered.length / pageSize), currentPage);

            if (page !== currentPage) {
                setCurrentPage(page);
            }

            setFilteredUsernames(filtered);
        }),
        []
    );

    const onQueryChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setQuery(value);
            filterDebounced(value, usernames, pageSize, currentPage);
        },
        [usernames, currentPage, pageSize, filterDebounced]
    );

    if (isError) {
        return (
            <div className="h-full flex items-center justify-center w-full flex-col gap-4" data-testid="grandmasters-error">
                <div className="text-lg">Something went wrong</div>
                <CircleX className="h-12 w-12 text-red-400" />
            </div>
        );
    }

    return (
        <>
            <Input className="p-6" placeholder="Enter username" value={query} onChange={onQueryChange} disabled={isLoading || isError} />
            <div className="overflow-auto relative flex-1 rounded border" ref={tableContainerRef}>
                <GrandmastersTable
                    isLoading={isLoading}
                    usernames={filteredUsernames.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)}
                />
            </div>

            <GrandmastersTablePagination
                onPageChange={onPageChange}
                activePage={currentPage}
                pageSize={pageSize}
                totalItems={filteredUsernames.length}
                disabled={isLoading || isError}
            />
        </>
    );
};
