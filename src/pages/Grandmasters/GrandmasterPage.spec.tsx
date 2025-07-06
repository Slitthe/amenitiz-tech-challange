import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

vi.mock("react-router", async () => {
    const actual = await vi.importActual<typeof import("react-router")>("react-router");

    return {
        ...actual,
        useParams: () => ({ username: "mockedUser" }),
    };
});

const testGms: Grandmasters = {
    players: ["first_username", "second_username", "third_username"],
};

vi.mock("@/api/chess-dot-com/grandmasters.ts");

import { GrandmastersPage } from "@/pages/Grandmasters/GrandmastersPage.tsx";
import * as grandmastersApi from "@/api/chess-dot-com/grandmasters.ts";
import type { Grandmasters } from "@/api/chess-dot-com/grandmasters.ts";

describe("Grandmaster profile page", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("render content on successful API response", async () => {
        vi.mocked(grandmastersApi.apiGetGrandmasters).mockResolvedValue(testGms);

        render(
            <MemoryRouter initialEntries={["/"]}>
                <GrandmastersPage />
            </MemoryRouter>
        );

        const userElement = await screen.findByText(testGms.players[0]);
        expect(userElement).toBeInTheDocument();
    });

    it("renders error UI on API exception", async () => {
        vi.mocked(grandmastersApi.apiGetGrandmasters).mockRejectedValue(new Error());

        render(
            <MemoryRouter initialEntries={["/"]}>
                <GrandmastersPage />
            </MemoryRouter>
        );

        const errorUi = await screen.findByTestId("grandmasters-error");

        expect(errorUi).toBeInTheDocument();
    });

    it("renders loading ui", async () => {
        vi.mocked(grandmastersApi.apiGetGrandmasters).mockImplementation(
            () =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(testGms);
                    }, 500);
                })
        );

        render(
            <MemoryRouter initialEntries={["/"]}>
                <GrandmastersPage />
            </MemoryRouter>
        );

        await new Promise((r) => setTimeout(r, 100));

        const skeletonsInyMyCloset = screen.getAllByTestId("ui-skeleton");
        expect(skeletonsInyMyCloset.length).toBeGreaterThan(0);
    });
});
