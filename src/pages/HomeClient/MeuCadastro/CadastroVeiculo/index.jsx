import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../../services/api";
import styles from "./styles.module.scss";

export const CadastroVeiculo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { atualizacao} = location.state || {};

  const [veiculo, setVeiculo] = useState([]);
  

  const loadDadosVeiculo = async () => {
    const responseVeiculo = await api.get(`/veiculo`);

    if(veiculo.length !== responseVeiculo.data.length) {
      setVeiculo(responseVeiculo.data);
      return
    }
  };

  const recarregarDados = async () => {
    const responseVeiculo = await api.get(`/veiculo`);
      setVeiculo(responseVeiculo.data);
  };

  const verificarVeiculo = async () => {
    loadDadosVeiculo()
    veiculo.length > 0
      ? navigate("meusveiculos", { state: { veiculo } })
      : navigate("veiculonaocadastrado");
  };

  useEffect(() => {
    loadDadosVeiculo();
  }, []);

  useEffect(() => {
    verificarVeiculo();

  }, [veiculo]);

  useEffect(() => {
    recarregarDados();

  }, [atualizacao]);
  return (
    <div className={styles.containerMeuCadastro}>
      <Outlet />
    </div>
  );
};