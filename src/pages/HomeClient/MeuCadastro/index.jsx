import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

import { Link } from "react-router-dom";
import { Agendamentos } from "./Agendamentos";
import styles from "./styles.module.scss";

export const MeuCadastro = () => {
  const { user } = useContext(AuthContext);
  const [opcaoMenuCadastro, setOpcaoMenuCadastro] = useState("ativos");

  const openAgendamentos = (e, opcaoMenu) => {
    e.preventDefault();
    setOpcaoMenuCadastro(opcaoMenu);
  };

  return (
    <div className={styles.containerAgendamentos}>
      <div className={styles.containerMenuLateral}>
        <Link
          className={styles.opcaoMenu}
          onClick={(e) => openAgendamentos(e, "ativos")}
        >
          Dados Pessoais
        </Link>
        <Link
          className={styles.opcaoMenu}
          onClick={(e) => openAgendamentos(e, "concluídos")}
        >
          Endereço
        </Link>
        <Link
          className={styles.opcaoMenu}
          onClick={(e) => openAgendamentos(e, "cancelados")}
        >
          Veículos
        </Link>
        <Link
          className={styles.opcaoMenu}
          onClick={(e) => openAgendamentos(e, "todos")}
        >
          Segurança
        </Link>
      </div>
      <div className={styles.containerMeusAgendamentos}>
        <Agendamentos opcaoAgendamento={opcaoMenuCadastro} />
      </div>
    </div>
  );
};
