import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const HomeClient = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    
  },[]);

  return (
    <>
      <p>Seja bem vido!</p>
      <p key={user.id}> {user.nome}</p>
    </>
  );
};
