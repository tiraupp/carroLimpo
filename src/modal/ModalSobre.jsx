import styles from "./styles.module.scss";

export const ModalSobre = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContentFoto}>
        <h2>Aplicação Carro Limpo</h2>
        <div className={styles.modalContentFoto}>
          <div>
            <label>Aplicativo para gestão de </label>
            <label> agenda de lavação Automotiva.</label>
          </div>
          <label>Desenvolvido por Tiago Raupp da Rosa</label>
          <div>
            <label>Trabalho de conclusão de curso: </label>
            <label>Análise e Desenvolvimento de Sistemas - ULBRA.</label>
          </div>
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.onCancel} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
