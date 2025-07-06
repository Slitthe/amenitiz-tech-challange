import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table.tsx";
import { Skeleton } from "@/components/ui/Skeleton.tsx";

import { Link } from "react-router";

export function GrandmastersTable({ isLoading, usernames }: { isLoading: boolean; usernames: string[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="sticky top-0 z-10 bg-muted">Username</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading
                    ? Array.from({ length: 50 }).map((_, index) => (
                          <TableRow key={index}>
                              <TableCell className="font-medium">
                                  <Skeleton className="h-6 w-full" />
                              </TableCell>
                          </TableRow>
                      ))
                    : null}
                {usernames.map((username) => (
                    <TableRow key={username}>
                        <TableCell className="font-medium">
                            <Link to={`/grandmaster/${username}`} className="h-6 w-full inline-block hover:underline">
                                {username}
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
