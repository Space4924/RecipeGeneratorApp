import { AuthContext } from "@/Context/AuthContext";
import { useContext } from "react";

type AuthContextType = {
  valid: boolean;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  userToken: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};
const useAuth=()=> {
    const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
}
export default useAuth;