import { useState } from "react";

import styles from "./styles.module.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";

export const MeusServicos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { servico } = location.state || {};

  const [servicoSelecionado, setServicoSelecionado] = useState("");

  const cadastrarServico = () => {
    event.preventDefault();

    navigate("/homeprofissional/servicos/cadastrarservico");
  };

  const atualizarServico = () => {
    event.preventDefault();
    if (!servicoSelecionado) {
      toast.warning("Selecione o serviço", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    navigate("/homeprofissional/servicos/atualizarservico", {
      state: { servicoSelecionado },
    });
  };

  const excluirServico = async () => {
    event.preventDefault();
    if (!servicoSelecionado) {
      toast.warning("Selecione o serviço", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    try {
      const response = await api.delete(`/servico/${servicoSelecionado.id}`);
      toast.success(response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/homeprofissional/servicos", {
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
    <div className={styles.containerMeusServicos}>
      <h2 className={styles.titleMeusServicos}>Meus Serviços</h2>
      <div className={styles.meusServicos}>
        {servico.map(
          ({ id, nome, categoria_id, descricao, valor, url_imagem }) => (
            <label
              key={id}
              className={
                id === servicoSelecionado.id
                  ? styles.cardServicoSelecionado
                  : styles.cardServico
              }
            >
              <input
                className={styles.inputRadio}
                type="radio"
                name="servicoSelecionado"
                value={id}
                onChange={() => {
                  setServicoSelecionado({
                    id,
                    nome,
                    categoria_id,
                    descricao,
                    valor,
                    url_imagem,
                  });
                }}
              />
              <img src={url_imagem} alt="Imagem do serviço" />
              <p>{nome}</p>
              <p>R$ {(valor / 100).toFixed(2).replace(".", ",")}</p>
            </label>
          )
        )}
      </div>
      <div className={styles.containerBtn}>
        <button className={styles.btnAtualizar} onClick={atualizarServico}>
          <div className={styles.loading}></div>
          Editar dados do serviço
        </button>
        <button className={styles.btnCadastrar} onClick={cadastrarServico}>
          <div className={styles.loading}></div>
          Cadastrar novo serviço
        </button>
        <button className={styles.btnExcluir} onClick={excluirServico}>
          <div className={styles.loading}></div>
          Excluir serviço
        </button>
      </div>
    </div>
  );
};
