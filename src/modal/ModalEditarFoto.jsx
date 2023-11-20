
import styles from "./styles.module.scss"
import { useForm } from 'react-hook-form';


export const ModalEditarFoto = ({titulo, isOpen, onClose, onFileUpload }) => {
  if (!isOpen) {
    return null;
  }
  const { handleSubmit, register } = useForm();

  const handleFileUpload = (data) => {
    onFileUpload(data);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContentFoto}>
      <h2>{titulo}</h2>
      <form className={styles.modalContentFoto} onSubmit={handleSubmit(handleFileUpload)}>
        <label htmlFor="arquivo">Escolha uma nova foto:</label>
        <input type="file" id="arquivo" {...register('arquivo')} />
        <div className={styles.modalButtons}>
        <button className={styles.onCancel} onClick={onClose}>Cancelar</button>
        <button className={styles.onConfirm} type="submit">Salvar</button>
        </div>
        
      </form>
      </div>
      
    </div>
  );
};
