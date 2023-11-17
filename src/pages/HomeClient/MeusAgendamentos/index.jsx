import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

import { Link } from "react-router-dom";
import { Agendamentos } from "./Agendamentos";
import styles from "./styles.module.scss";

export const MeusAgendamentos = () => {
  const { user } = useContext(AuthContext);
  const [opcaoAgendamento, setOpcaoAgendamento] = useState("ativos");

  const openAgendamentos = (e, opcaoMenu) => {
    e.preventDefault();
    setOpcaoAgendamento(opcaoMenu);
  };

  return (
    <div className={styles.containerAgendamentos}>
      <div className={styles.containerMenuLateral}>
        <Link
          className={styles.opcaoMenu}
          onClick={(e) => openAgendamentos(e, "ativos")}
        >
          Ativos
        </Link>
        <Link
          className={styles.opcaoMenu}
          onClick={(e) => openAgendamentos(e, "concluídos")}
        >
          Concluídos
        </Link>
        <Link
          className={styles.opcaoMenu}
          onClick={(e) => openAgendamentos(e, "cancelados")}
        >
          Cancelados
        </Link>
        <Link
          className={styles.opcaoMenu}
          onClick={(e) => openAgendamentos(e, "todos")}
        >
          Todos
        </Link>
      </div>
      <div className={styles.containerMeusAgendamentos}>
        <Agendamentos opcaoAgendamento={opcaoAgendamento} />
      </div>
    </div>
  );
};
