import chessPng from "./assets/chess_bg.png";

import { Navigate, Route, Routes } from "react-router";
import { GrandmastersPage } from "@/pages/Grandmasters/GrandmastersPage.tsx";
import { GrandmasterProfilePage } from "@/pages/GrandmasterProfile/GrandmasterProfilePage.tsx";

export const App = () => {
    return (
        <div className="flex flex-col h-full py-12 items-center">
            <div className="flex items-center justify-center">
                <img src={chessPng} alt="Logo" className="h-20 invert" />
                <h1 className="uppercase text-3xl font-bold tracking-wider">Grandmasters</h1>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden w-full px-8 gap-4 pb-4 lg:w-xl lg:px-2 lg:mt-4">
                <Routes>
                    <Route path="/" element={<GrandmastersPage />} />
                    <Route path="/grandmaster/:username" element={<GrandmasterProfilePage />} />
                    <Route path="*" element={<Navigate to={"/"} replace />} />
                </Routes>
            </div>
        </div>
    );
};
