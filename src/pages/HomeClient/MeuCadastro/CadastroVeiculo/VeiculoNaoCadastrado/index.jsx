import styles from "./styles.module.scss";

import { useNavigate } from "react-router-dom";
import searchBro from "../../../../../assets/search-bro.svg";

export const VeiculoNaoCadastrado = () => {
  const navigate = useNavigate();

  const cadastrarVeiculo = () => {
    event.preventDefault();

    navigate("/homeclient/meucadastro/veiculos/cadastrarveiculo");
  };

  return (
    <div className={styles.nenhumVeiculoEncontrado}>
      <img
        className={styles.imgSearch}
        src={searchBro}
        alt="Icone nenhum veiculo cadastrado"
      />
      <p className={styles.mensagem}>
        Você ainda não possui veículos cadastrados.
      </p>
      <div className={styles.containerBtn}>
        <button className={styles.Btn} onClick={cadastrarVeiculo}>
          <div className={styles.loading}></div>
          Cadastrar Veículo
        </button>
      </div>
    </div>
  );
};
