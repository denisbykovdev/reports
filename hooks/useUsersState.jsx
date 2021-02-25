import { useContext } from "react";
import { UsersStateContext } from "../providers/UsersProvider"

const useUsersState = () => useContext(UsersStateContext);

export default useUsersState;
