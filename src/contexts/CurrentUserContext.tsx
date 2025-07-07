import { createContext } from "react";
import { NewUser } from "../modal/ModalRegister";

type CurrentUserContextData = {
    currentUser: NewUser[];
    setCurrentUser: (currentUser: NewUser[]) => void;
};

const CurrentUserContext = createContext<CurrentUserContextData>({
    currentUser: [],
    setCurrentUser: () => {},
});

export default CurrentUserContext;
