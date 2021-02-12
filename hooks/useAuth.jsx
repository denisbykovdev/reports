import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
    const { authState, login } = useContext(AuthContext);
    return { authState, login };
}

export default useAuth;