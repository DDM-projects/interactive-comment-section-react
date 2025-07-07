import Button from "../button/Button";
import "./Modal.styles.css";
import UsersContext from "../contexts/UsersContext";
import { useEffect, useState, useContext } from "react";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ModalRegisterProps {
    closeModal: () => void;
    newUser?: NewUser;
}

interface InitialRegisterValues {
    login: string;
    password: string;
    username: string;
}

const initialRegisterValues: InitialRegisterValues = {
    login: "",
    password: "",
    username: "",
};

export interface NewUser {
    id: string;
    username: string;
    createdAt: string;
    login: string;
    password: string;
    image: { png: string };
}

const vaidationSchema = Yup.object().shape({
    login: Yup.string()
        .min(2, "Login must contain at least 2 characters")
        .max(14, "Login can contain max 14 characters")
        .required("Login is required"),
    password: Yup.string()
        .min(6, "Password must contain at least 6 characters")
        .max(20, "Password can contain max 20 characters")
        .matches(/\d/, "Password must contains at least one number")
        .required("Password is required"),
    username: Yup.string()
        .required("Username is required")
        .min(2, "Username must contain at least 2 characters")
        .max(20, "Username can contain max 20 characters"),
});

const ModalRegister = (props: ModalRegisterProps) => {
    const { users, setUsers } = useContext(UsersContext);
    const [isLoginIncorrect, setIsLoginIncorrect] = useState(false);
    const [isUsernameIncorrect, setIsUsernameIncorrect] = useState(false);

    useEffect(() => {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem("users") || "[]");

        if (dataFromLocalStorage && dataFromLocalStorage.length) {
            setUsers(dataFromLocalStorage);
        } else {
            setUsers([]);
        }
    }, []);

    const onSubmit = (values: InitialRegisterValues) => {
        const newUser: NewUser = {
            id: nanoid(),
            username: values.username,
            createdAt: new Date().toLocaleString(),
            login: values.login,
            password: values.password,
            image: { png: `https://robohash.org/${values.username}.png` },
        };

        if (users.some((user) => user.login === values.login)) {
            setIsLoginIncorrect(true);
            return;
        }

        if (users.some((user) => user.username === values.username)) {
            setIsUsernameIncorrect(true);
            return;
        }

        if (values.username && values.login && values.password) {
            const newUsers = [...users, newUser];
            setUsers(newUsers);
            localStorage.setItem("users", JSON.stringify(newUsers));
            props.closeModal();
        }
    };

    return (
        <>
            <div onClick={props.closeModal} className="cover"></div>
            <Formik initialValues={initialRegisterValues} validationSchema={vaidationSchema} onSubmit={onSubmit}>
                {(props) => {
                    return (
                        <section className="modal-register">
                            <Form action="" name="registerForm" className="modal-register__form">
                                <div className="modal-register__input">
                                    <h1 className="modal-register__header">Register</h1>
                                    <Field
                                        type="text"
                                        id="login"
                                        name="login"
                                        placeholder="login"
                                        className={`modal-register__login modal__login ${
                                            (props.errors.login && props.touched.login) || isLoginIncorrect
                                                ? "modal-register__login-error"
                                                : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="login"
                                        component="div"
                                        className="modal-register__form-error error"
                                    />
                                    {isLoginIncorrect && (
                                        <p className="error">This login already exists. Try something else</p>
                                    )}
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="password"
                                        className={`modal-register__password modal__password ${
                                            props.errors.password && props.touched.password
                                                ? "modal-register__password-error"
                                                : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="modal-register__form-error error"
                                    />
                                    <Field
                                        type="username"
                                        id="username"
                                        name="username"
                                        placeholder="username"
                                        className={`modal-register__username modal__username ${
                                            (props.errors.username && props.touched.username) || isUsernameIncorrect
                                                ? "modal-register__username-error"
                                                : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="modal-register__form-error error"
                                    />
                                    {isUsernameIncorrect && (
                                        <p className="error">This username already exists. Try something else</p>
                                    )}
                                    <Button type="submit" category="log-and-register" className="">
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        </section>
                    );
                }}
            </Formik>
        </>
    );
};
export default ModalRegister;
