import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const HomeClient = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <p>Seja bem vido!</p>
      <p key={user.id}> {user.nome}</p>
    </>
  );
};
