import { createContext } from "react";
import { NewUser } from "../modal/ModalRegister";

type UsersContextData = {
    users: NewUser[];
    setUsers: (users: NewUser[]) => void;
};

const UsersContext = createContext<UsersContextData>({
    users: [],
    setUsers: () => {},
});

export default UsersContext;
