import Button from "../button/Button";
import "./Navbar.styles.css";
import ModalLog from "../modal/ModalLog";
import ModalRegister from "../modal/ModalRegister";
import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [isLogOutBtnVisible, setIsLogOutBtnVisible] = useState(false);
    const [isLoginBtnVisible, setIsLoginBtnVisible] = useState(true);
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const openLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    const openRegisterModal = () => {
        setIsRegisterModalVisible(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalVisible(false);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalVisible(false);
    };

    const logOutBtnAppearance = () => {
        setIsLogOutBtnVisible(true);
        setIsLoginBtnVisible(false);
    };

    const logOut = () => {
        setIsLogOutBtnVisible(false);
        setIsLoginBtnVisible(true);
        setCurrentUser([]);
        localStorage.setItem("currentUser", JSON.stringify([]));
    };

    const addLogOutBtn = () => {
        if (isLogOutBtnVisible || currentUser.length) {
            return (
                <Button buttonFunction={logOut} category="logout" className="navbar__logout-button">
                    Log out
                </Button>
            );
        }
        return <></>;
    };

    return (
        <>
            {isLoginModalVisible && <ModalLog closeModal={closeLoginModal} changeButton={logOutBtnAppearance} />}
            {isRegisterModalVisible && <ModalRegister closeModal={closeRegisterModal} />}

            <div className="navbar">
                <div className="navbar__menu-container">
                    <div className="navbar__menu">
                        <Link to="/home" className="navbar__menu-link">
                            HOME
                        </Link>
                        <Link to="/comments" className="navbar__menu-link">
                            COMMENTS
                        </Link>
                        <Link to="/contact" className="navbar__menu-link">
                            CONTACT
                        </Link>
                    </div>
                </div>
                <div className="navbar__log-container">
                    {isLogOutBtnVisible || currentUser.length ? (
                        <div className="navbar__current-user">
                            <p> Witaj, {currentUser[0].username} </p>
                        </div>
                    ) : (
                        ""
                    )}
                    <section className="navbar__log-and-register">
                        {isLoginBtnVisible && !currentUser.length && (
                            <Button
                                buttonFunction={openLoginModal}
                                category="log-and-register"
                                className="navbar__log-button"
                            >
                                Login
                            </Button>
                        )}
                        {addLogOutBtn()}
                        {isLoginBtnVisible && !currentUser.length && (
                            <Button
                                buttonFunction={openRegisterModal}
                                category="log-and-register"
                                className="navbar__register-button"
                            >
                                Register
                            </Button>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};

export default Navbar;
