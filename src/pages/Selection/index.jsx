import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";
import { schema } from "./validator";

export const Selection = () => {
  const {
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <div className={styles.container}>
      <div className={styles.containerSelection}>
        <div className={styles.wrapSelection}>
          <img
            className={styles.selectionImg}
            src="./src/assets/logoSF.png"
            alt="Logo Carro Limpo"
          />
          <span className={styles.selectionTitle}>
            Selecione a opção e Cadastre-se!
          </span>
          <div className={styles.containerselectionBtn}>
            <button
              className={styles.selectionBtn}
              type="submit"
              disabled={isSubmitting}
            >
              Quero ser cliente
            </button>
            <button
              className={styles.selectionBtn}
              type="submit"
              disabled={isSubmitting}
            >
              Tenho uma lavação
            </button>
          </div>

          <span className={styles.textCenter}>Já possui conta?</span>

          <button
            className={styles.btnLogin}
            type="submit"
            disabled={isSubmitting}
          >
            Fazer Login
          </button>
          <p className={styles.footer}>
            Tiraupp Sistemas - Todos direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
};
