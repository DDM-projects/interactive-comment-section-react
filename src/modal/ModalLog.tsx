import Button from "../button/Button";
import "./Modal.styles.css";
import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import UsersContext from "../contexts/UsersContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface ModalLogProps {
    closeModal: () => void;
    changeButton?: () => void;
}

interface InitialLogValues {
    login: string;
    password: string;
    rememberUser: boolean;
}

const initialLogValues: InitialLogValues = {
    login: "",
    password: "",
    rememberUser: false,
};

const validationSchema = Yup.object().shape({
    login: Yup.string().required("Login is required"),
    password: Yup.string().required("Password is required"),
    rememberUser: Yup.boolean(),
});

const ModalLog = (props: ModalLogProps) => {
    const { users, setUsers } = useContext(UsersContext);
    const { setCurrentUser } = useContext(CurrentUserContext);
    const [isLoginError, setIsLoginError] = useState(false);

    useEffect(() => {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem("users") || "[]");

        if (dataFromLocalStorage && dataFromLocalStorage.length) {
            setUsers(dataFromLocalStorage);
        } else {
            setUsers([]);
        }
    }, []);

    const onSubmit = (values: InitialLogValues) => {
        const foundUser = users.find((user) => user.login === values.login && user.password === values.password);

        if (!foundUser) {
            setIsLoginError(true);
            return;
        }

        if (foundUser) {
            const newCurrentUser = { ...foundUser, rememberUser: values.rememberUser };
            setCurrentUser([newCurrentUser]);
            localStorage.setItem("currentUser", JSON.stringify([newCurrentUser]));
            props.closeModal();
            props.changeButton?.();
        }
    };

    return (
        <>
            <div onClick={props.closeModal} className="cover"></div>

            <Formik initialValues={initialLogValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <section className="modal-log">
                    <Form action="" name="loginForm" className="modal-log__form">
                        <div className="modal-log__input">
                            <h1 className="modal-log__header">Login</h1>
                            <Field
                                type="text"
                                id="login"
                                name="login"
                                placeholder="login"
                                className="modal-log__login modal__login"
                            />
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="password"
                                className="modal-log__password modal__password"
                            />
                            {isLoginError && <p className="modal-log__error">Incorrect login or password</p>}
                            <div className="modal-log__options">
                                <label htmlFor="rememberUser" className="modal-log__remember-user">
                                    <Field
                                        type="checkbox"
                                        id="rememberUser"
                                        name="rememberUser"
                                        className="modal-log__remember-checkbox"
                                    />
                                    Remember me
                                </label>
                                <a href="#">Forgot password?</a>
                            </div>
                            <Button type="submit" category="log-and-register" className="modal-log__button">
                                Login
                            </Button>
                        </div>
                    </Form>
                </section>
            </Formik>
        </>
    );
};

export default ModalLog;
