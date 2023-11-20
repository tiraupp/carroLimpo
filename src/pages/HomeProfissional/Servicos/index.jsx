import { useEffect, useState } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { api } from "../../../services/api";
import styles from "./styles.module.scss";

export const Servicos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { atualizacao } = location.state || {};

  const [servico, setServico] = useState([]);

  const loadDadosServico = async () => {
    const responseServico = await api.get(`/servico/profissional`);

    if (servico.length !== responseServico.data.length) {
      setServico(responseServico.data);
      return;
    }
  };

  const recarregarDados = async () => {
    const responseServico = await api.get(`/servico/profissional`);
    setServico(responseServico.data);
  };

  const verificarServico = async () => {
    loadDadosServico();
    servico.length > 0
      ? navigate("meusservicos", { state: { servico } })
      : navigate("serviconaocadastrado");
  };

  useEffect(() => {
    loadDadosServico();
  }, []);

  useEffect(() => {
    verificarServico();
  }, [servico]);

  useEffect(() => {
    recarregarDados();
  }, [atualizacao]);
  return (
    <div className={styles.containerMeuCadastro}>
      <Outlet />
    </div>
  );
};
