import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ImgLogo } from "../../components/ImgLogo";
import styles from "./styles.module.scss";

export const Selection = () => {
  const {
    formState: { errors },
  } = useForm({});

  toast.error(errors, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });

  return (
    <div className={styles.container}>
      <div className={styles.containerSelection}>
        <div className={styles.wrapSelection}>
          <ImgLogo />
          <span className={styles.selectionTitle}>
            Selecione a opção e Cadastre-se!
          </span>
          <div className={styles.containerselectionBtn}>
            <Link to="/registerclient" className={styles.link}>
              <button className={styles.selectionBtn}>Quero ser cliente</button>
            </Link>
            <Link to="/registerprofessional" className={styles.link}>
              <button className={styles.selectionBtn}>Tenho uma lavação</button>
            </Link>
            <span className={styles.textCenter}>Já possui conta?</span>
            <Link to="/" className={styles.link}>
              <button className={styles.btnLogin}>Fazer Login</button>
            </Link>
          </div>

          <p className={styles.footer}>
            Tiraupp Sistemas - Todos direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
};
