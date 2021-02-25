import { useContext } from "react";
import { UsersDispatchContext } from "../providers/UsersProvider";

const useUsersDispatch = () => useContext(UsersDispatchContext);

export default useUsersDispatch;
