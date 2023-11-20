
import styles from "./styles.module.scss"

export const ModalAgendamentoPJ = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
      <h2>{message.titulo}</h2>
        <div className={styles.modalMessage}>
        
        <p>{message.servico}</p>
        <p>VEICULO: {message.veiculo}</p>
        <p>CLIENTE: {message.nomeProfissional} </p>
        <p>DATA: {message.dia} </p>
        <p>{message.horario} horas</p>
        <p>VALOR: R${message.valor}</p>

        </div>
        <div className={styles.modalButtons}>
        <button className={styles.onCancel} onClick={onCancel}>Cancelar</button>
        <button className={styles.onConfirm} onClick={onConfirm}>Confirmar</button>
        </div>


      </div>
    </div>
  );
};
