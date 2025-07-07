import { useEffect, useState } from "react";
import MainTemplate from "./mainTemplate/MainTemplate";
import "./Global.css";
import { NewUser } from "./modal/ModalRegister";
import CurrentUserContext from "./contexts/CurrentUserContext";
import UsersContext from "./contexts/UsersContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Comments from "./comments/Comments";
import Contact from "./contact/Contact";

function App() {
    const [currentUser, setCurrentUser] = useState<NewUser[]>([]);
    const [users, setUsers] = useState<NewUser[]>([]);

    useEffect(() => {
        const storedCurrentUser = localStorage.getItem("currentUser");

        if (storedCurrentUser) {
            const parsedCurrentUser = JSON.parse(storedCurrentUser);

            if (parsedCurrentUser.length && parsedCurrentUser[0].rememberUser) {
                setCurrentUser([parsedCurrentUser[0]]);
            } else {
                setCurrentUser([]);
                localStorage.setItem("currentUser", JSON.stringify([]));
            }
        }

        const usersFromLocalStorage = JSON.parse(localStorage.getItem("users") || "[]");

        const findAdminUser = usersFromLocalStorage.find((user: NewUser) => user.id === "0");

        if (!findAdminUser) {
            const adminUser = {
                id: "0",
                username: "admin",
                createdAt: new Date().toLocaleString(),
                login: "admin",
                password: "admin1234",
                image: { png: `https://robohash.org/admin.png` },
            };
            const usersWithAdmin = [adminUser, ...usersFromLocalStorage];
            setUsers(usersWithAdmin);
            localStorage.setItem("users", JSON.stringify(usersWithAdmin));
        }
    }, []);

    return (
        <>
            <UsersContext.Provider value={{ users, setUsers }}>
                <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
                    <Router>
                        <MainTemplate>
                            <Routes>
                                <Route path="/" element={<Navigate to="/comments" replace />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/comments" element={<Comments />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="*" element={<h1> ERROR</h1>} />
                            </Routes>
                        </MainTemplate>
                    </Router>
                </CurrentUserContext.Provider>
            </UsersContext.Provider>
        </>
    );
}

export default App;
