import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useContext, useState } from "react";

import { ImgLogo } from "../../components/ImgLogo";
import { Input } from "../../components/Input";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./styles.module.scss";
import { schema } from "./validator";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
            <ImgLogo />
            <span className={styles.loginFormTitle}>Bem Vindo!</span>
            <div className={styles.wrapInput}>
              <Input
                className={email !== "" ? `has-val styles.input` : "input"}
                type="email"
                id="email"
                error={errors.email?.message}
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={email !== "" ? "Email" : "Digite seu email"}
              />
            </div>
            <div className={styles.wrapInput}>
              <Input
                className={senha !== "" ? `has-val styles.input` : "input"}
                type="password"
                id="senha"
                error={errors.senha?.message}
                {...register("senha")}
                onChange={(e) => setSenha(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={senha !== "" ? "Senha" : "Digite sua senha"}
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
