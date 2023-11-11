import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const HomeAdm = () => {

  const { user} = useContext(AuthContext);

  return (
 
    <p key={user.id}>{user.nome}</p>
  );
};
