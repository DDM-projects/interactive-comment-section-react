import MainContent from "../mainContent/MainContent";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./MainTemplate.styles.css";
import { ReactNode } from "react";

const MainTemplate = ({ children }: { children: ReactNode }) => {
    return (
        <div className="main-template">
            <Navbar />
            <MainContent>{children}</MainContent>
            <Footer />
        </div>
    );
};

export default MainTemplate;
