import { ReactNode } from "react";
import "./Button.styles.css";

interface ButtonProps {
    children: ReactNode;
    category: "log-and-register" | "logout" | "delete-yes" | "delete-no" | "comment-action" | "form-action" | "score";
    type?: "submit" | "reset" | "button" | undefined;
    className: string;
    buttonFunction?: (args: any) => void;
}

const Button = (props: ButtonProps) => {
    const typeClass = () => {
        switch (props.category) {
            case "log-and-register":
                return "button__log-and-register";
            case "delete-yes":
                return "button__delete button__delete--yes";
            case "delete-no":
                return "button__delete button__delete--no";
            case "score":
                return "button__score";
            case "comment-action":
                return "button__comment-action";
            case "logout":
                return "button__logout";
            case "form-action":
                return "button__form-action";
            default:
                return "";
        }
    };

    return (
        <button
            onClick={props?.buttonFunction}
            type={props?.type}
            className={`${typeClass()} ${props.className}`.trim()}
        >
            {props.children}
        </button>
    );
};

export default Button;
