import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const Home = () => {

  const { user} = useContext(AuthContext);

  return (
 
    <p key={user.id}>{user.nome}</p>
  );
};
