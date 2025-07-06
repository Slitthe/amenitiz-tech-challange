import { render, screen } from "@testing-library/react";
import { GrandmasterProfilePage } from "./GrandmasterProfilePage.tsx";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

vi.mock("react-router", async () => {
    const actual = await vi.importActual<typeof import("react-router")>("react-router");

    return {
        ...actual,
        useParams: () => ({ username: "mockedUser" }),
    };
});

const testUser: GrandmasterDetails = {
    player_id: 123345678,
    "@id": "https://api.chess.com/pub/player/123345678",
    url: "https://www.chess.com/member/my-example-username",
    username: "my-example-username",
    title: "GM",
    followers: 22,
    country: "https://api.chess.com/pub/country/US",
    last_online: 1682953663,
    joined: 1363866586,
    status: GrandmasterStatus.premium,
    is_streamer: false,
    verified: false,
};

vi.mock("@/api/chess-dot-com/grandmaster.ts"); // mock once here

import * as grandmasterApi from "@/api/chess-dot-com/grandmaster.ts";
import { type GrandmasterDetails, GrandmasterStatus } from "@/api/chess-dot-com/grandmaster.ts";

describe("Grandmaster profile page", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("render content on successful API response", async () => {
        vi.mocked(grandmasterApi.apiGetGrandmaster).mockResolvedValue(testUser);

        render(
            <MemoryRouter initialEntries={["/"]}>
                <GrandmasterProfilePage />
            </MemoryRouter>
        );

        const userElement = await screen.findByText(testUser.username);
        expect(userElement).toBeInTheDocument();
    });

    it("renders error UI on API exception", async () => {
        vi.mocked(grandmasterApi.apiGetGrandmaster).mockRejectedValue(new Error("API failure"));

        render(
            <MemoryRouter initialEntries={["/"]}>
                <GrandmasterProfilePage />
            </MemoryRouter>
        );

        const errorUi = await screen.findByTestId("grandmaster-profile-error");

        expect(errorUi).toBeInTheDocument();
    });

    it("renders loading ui", async () => {
        vi.mocked(grandmasterApi.apiGetGrandmaster).mockImplementation(
            () =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(testUser);
                    }, 500);
                })
        );

        render(
            <MemoryRouter initialEntries={["/"]}>
                <GrandmasterProfilePage />
            </MemoryRouter>
        );

        await new Promise((r) => setTimeout(r, 100));

        const skeletonsInyMyCloset = screen.getAllByTestId("ui-skeleton");
        expect(skeletonsInyMyCloset.length).toBeGreaterThan(0);
    });
});
