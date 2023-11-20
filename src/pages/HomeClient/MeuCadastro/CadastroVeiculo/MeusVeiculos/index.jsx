import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../providers/AuthProvider";

import styles from "./styles.module.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../../../services/api";

export const MeusVeiculos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { veiculo } = location.state || {};

  const [veiculoSelecionado, setVeiculoSelecionado] = useState("");

  const cadastrarVeiculo = () => {
    event.preventDefault();

    navigate("/homeclient/meucadastro/veiculos/cadastrarveiculo")
  };

  const atualizarVeiculo = () => {
    event.preventDefault();
    if(!veiculoSelecionado){
      toast.warning("Selecione o veículo", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    return
    }
    navigate("/homeclient/meucadastro/veiculos/atualizarveiculo", {state: {veiculoSelecionado}});
  };

  const excluirVeiculo = async () => {
    event.preventDefault();
    if(!veiculoSelecionado){
      toast.warning("Selecione o veículo", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    return
    }

    try {
      const response = await api.delete(`/veiculo/${veiculoSelecionado.id}`)
      toast.success(response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/homeclient/meucadastro/veiculos", {
        state: { atualizacao: true },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className={styles.containerMeusVeiculos}>
      <h2 className={styles.titleMeusVeiculos}>Meus Veículos</h2>
      <div className={styles.meusVeiculos}>
        {veiculo.map(({ id, marca, modelo, placa, ano, categoria_id }) => (
          <label
            key={id}
            className={
              id === veiculoSelecionado.id
                ? styles.cardVeiculoSelecionado
                : styles.cardVeiculo
            }
          >
            <input
              className={styles.inputRadio}
              type="radio"
              name="veiculoSelecionado"
              value={id}
              onChange={() => {
                setVeiculoSelecionado({
                  id,
                  marca,
                  modelo,
                  placa,
                  ano,
                  categoria_id,
                });
              }}
            />

            <p>{marca}</p>
            <p>{modelo}</p>
            <p>{placa}</p>
            <p>{ano}</p>
          </label>
        ))}
      </div>
      <div className={styles.containerBtn}>
        <button className={styles.btnAtualizar} onClick={atualizarVeiculo}>
          <div className={styles.loading}></div>
          Editar dados do veículo
        </button>
        <button className={styles.btnCadastrar} onClick={cadastrarVeiculo}>
          <div className={styles.loading}></div>
          Cadastrar novo veículo
        </button>
        <button className={styles.btnExcluir} onClick={excluirVeiculo}>
          <div className={styles.loading}></div>
          Excluir veículo
        </button>
      </div>
    </div>
  );
};
