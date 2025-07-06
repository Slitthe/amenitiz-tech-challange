import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/Pagination.tsx";

import { Button } from "@/components/ui/Button.tsx";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { usePagination } from "@/lib/hooks/usePagination.ts";

export function GrandmastersTablePagination({
    pageSize,
    activePage,
    totalItems,
    onPageChange,
    disabled,
}: {
    pageSize: number;
    activePage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}) {
    console.log({ totalItems });
    const { currentPages } = usePagination({
        pageSize: pageSize,
        currentPage: activePage,
        totalItems: totalItems,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const goToPage = (page: number) => {
        onPageChange(page);
    };

    const goToPreviousPage = () => {
        onPageChange(Math.max(1, activePage - 1));
    };

    const goToNextPage = () => {
        onPageChange(Math.min(totalPages, activePage + 1));
    };

    const skipNext = () => {
        onPageChange(Math.min(totalPages, activePage + 5));
    };

    const skipPrev = () => {
        onPageChange(Math.max(1, activePage - 5));
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button variant="ghost" className="hover:cursor-pointer" onClick={goToPreviousPage} disabled={disabled}>
                        <ChevronLeftIcon />
                        <span className="hidden sm:block">Previous</span>
                    </Button>
                </PaginationItem>
                {currentPages[0] > 1 ? (
                    <PaginationItem>
                        <Button className="hover:cursor-pointer" variant="ghost" onClick={skipPrev} disabled={disabled}>
                            <MoreHorizontalIcon className="size-4" />
                            <span className="sr-only">More pages</span>
                        </Button>
                    </PaginationItem>
                ) : null}

                {(disabled ? [1, 2, 3] : currentPages).map((currentPage) => (
                    <PaginationItem key={currentPage}>
                        <Button
                            disabled={disabled}
                            className="hover:cursor-pointer"
                            onClick={() => goToPage(currentPage)}
                            variant={activePage === currentPage ? "outline" : "ghost"}
                        >
                            {currentPage}
                        </Button>
                    </PaginationItem>
                ))}

                {currentPages[currentPages.length - 1] < totalPages || disabled ? (
                    <PaginationItem>
                        <Button className="hover:cursor-pointer" variant="ghost" onClick={skipNext} disabled={disabled}>
                            <MoreHorizontalIcon className="size-4" />
                            <span className="sr-only">More pages</span>
                        </Button>
                    </PaginationItem>
                ) : null}

                <PaginationItem>
                    <Button variant="ghost" className="hover:cursor-pointer" onClick={goToNextPage} disabled={disabled}>
                        <span className="hidden sm:block">Next</span>
                        <ChevronRightIcon />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
