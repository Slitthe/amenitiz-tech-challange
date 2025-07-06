import { useMemo } from "react";

interface UsePaginationProps {
    pageSize: number;
    currentPage: number;
    totalItems: number;
    siblingCount?: number;
}

interface UsePaginationProps {
    pageSize: number;
    currentPage: number;
    totalItems: number;
    minPagesToShow?: number;
}

export function usePagination({ pageSize, currentPage, totalItems, minPagesToShow = 3 }: UsePaginationProps) {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const currentPages = useMemo(() => {
        if (totalPages <= minPagesToShow) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const half = Math.floor(minPagesToShow / 2);
        let start = currentPage - half;
        let end = currentPage + half;

        if (minPagesToShow % 2 === 0) {
            end -= 1;
        }

        if (start < 1) {
            end += 1 - start;
            start = 1;
        }
        if (end > totalPages) {
            start -= end - totalPages;
            end = totalPages;
        }

        start = Math.max(1, start);

        const pages = [];
        for (let i = start; i <= end && pages.length < minPagesToShow; i++) {
            pages.push(i);
        }

        return pages;
    }, [currentPage, totalPages, minPagesToShow]);

    return {
        currentPages,
    };
}
