import { Navigate, Route, Routes } from "react-router";
import { Home } from "./pages/home/Home.tsx";
import { Header } from "./shared/components/layout/Header.tsx";

export const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};
