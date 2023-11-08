import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import styles from "./styles.module.scss";
import { schema } from "./validator";
import { unstable_HistoryRouter } from "react-router-dom";

export const Selection = () => {


    const history = unstable_HistoryRouter();
  
    const handleNavegarRegisterClient = () => {
      history.push("/registerclient"); 
    };

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
          <button onClick={handleNavegarRegisterClient()} className={styles.selectionBtn}>
              Quero ser cliente 
            </button>
            

            <button className={styles.selectionBtn}>Tenho uma lavação</button>
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
