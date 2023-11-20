import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

import { GoStarFill } from "react-icons/go";
import { Link, Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

export const MeuCadastroPJ = () => {
  const { user } = useContext(AuthContext);
  // const [opcaoMenuCadastro, setOpcaoMenuCadastro] = useState("ativos");

  // const openAgendamentos = (e, opcaoMenu) => {
  //   e.preventDefault();
  //   setOpcaoMenuCadastro(opcaoMenu);
  // };

  return (
    <div className={styles.containerAgendamentos}>
      <div className={styles.containerMenuLateral}>
        <Link className={styles.opcaoMenu} to={"dadospessoais"}>
          Dados Pessoais
        </Link>
        <Link className={styles.opcaoMenu} to={"endereco"}>
          Endereço
        </Link>
        <Link className={styles.opcaoMenu} to={"seguranca"}>
          Segurança
        </Link>
      </div>
      <div className={styles.containerMeusDados}>
        <div className={styles.containerUsuario}>
          <span>
            {Array.from({ length: user.avaliacao }, (_, index) => (
              <span key={index}>
                <GoStarFill className={styles.goStar} />
              </span>
            ))}
          </span>
        </div>
        <Outlet />
      </div>
      
    </div>
  );
};
