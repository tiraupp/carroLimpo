import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useContext, useState } from "react";

import { Input } from "../../components/Input";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./styles.module.scss";
import { schema } from "./validator";

import logo from "../../assets/logoSF.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(signIn)}>
      <div className={styles.container}>
        <div className={styles.containerLogin}>
          <div className={styles.wrapLogin}>
            <img
              className={styles.selectionImg}
              src={logo}
              alt="Logo Carro Limpo"
            />
            <span className={styles.loginFormTitle}>Bem Vindo!</span>
            <span className={styles.loginFormTitle}></span>

            <div className={styles.wrapInput}>
              <Input
                className={email !== "" ? `has-val styles.input` : "input"}
                type="email"
                id="email"
                label="Email"
                error={errors.email?.message}
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={email !== "" ? "Email" : "Digite seu email."}
              />
            </div>

            <div className={styles.wrapInput}>
              <Input
                className={password !== "" ? `has-val styles.input` : "input"}
                type="password"
                id="senha"
                label="Senha"
                error={errors.senha?.message}
                {...register("senha")}
                onChange={(e) => setPassword(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={
                  password !== "" ? "Senha" : "Digite sua senha."
                }
              />
            </div>

            <div className={styles.containerLoginFormBtn}>
              <button
                className={styles.loginFormBtn}
                type="submit"
                disabled={isSubmitting}
              >
                <div className={styles.loading}></div>
                {isSubmitting ? "Entrando..." : "Login"}
              </button>
            </div>
            <div className={styles.textCenter}>
              <span className={styles.text1}>Não possui conta?</span>
              <a href="/selection" className={styles.text2}>
                Criar conta
              </a>
            </div>
            <p className={styles.footer}>
              Tiraupp Sistemas - Todos direitos reservados
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
