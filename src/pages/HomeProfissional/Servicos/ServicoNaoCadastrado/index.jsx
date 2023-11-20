import styles from "./styles.module.scss";

import { useNavigate } from "react-router-dom";
import searchBro from "../../../../assets/search-bro.svg";

export const ServicoNaoCadastrado = () => {
  const navigate = useNavigate();

  const cadastrarServico = () => {
    event.preventDefault();

    navigate("/homeprofissional/servicos/cadastrarservico");
  };

  return (
    <div className={styles.nenhumServicoEncontrado}>
      <img
        className={styles.imgSearch}
        src={searchBro}
        alt="Icone nenhum servico cadastrado"
      />
      <p className={styles.mensagem}>
        Você ainda não possui serviços cadastrados.
      </p>
      <div className={styles.containerBtn}>
        <button className={styles.Btn} onClick={cadastrarServico}>
          <div className={styles.loading}></div>
          Cadastrar Serviço
        </button>
      </div>
    </div>
  );
};
