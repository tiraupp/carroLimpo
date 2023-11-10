import { useContext, useState } from "react";
import { ImgLogo } from "../../components/ImgLogo";
import { Input } from "../../components/Input";
import styles from "./styles.module.scss";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../Selection/validator";
import { Link } from "react-router-dom";

export const RegisterProfessional = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

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
            <ImgLogo></ImgLogo>
            <span className={styles.loginFormTitle}>Cadastro de Empresa / Lavação!</span>
            <span className={styles.loginFormTitle}></span>
            <div className={styles.wrapInput}>
              <Input
                className={name !== "" ? `has-val styles.input` : "input"}
                type="name"
                id="name"
                error={errors.name?.message}
                {...register("name")}
                onChange={(e) => setName(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={name !== "" ? "Nome" : "Digite seu nome."}
              />
            </div>

            <div className={styles.wrapInput}>
              <Input
                className={email !== "" ? `has-val styles.input` : "input"}
                type="email"
                id="email"
                error={errors.email?.message}
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={email !== "" ? "Email" : "Digite seu email."}
              />
            </div>

            <div className={styles.wrapInput}>
              <Input
                className={phone !== "" ? `has-val styles.input` : "input"}
                type="phone"
                id="phone"
                error={errors.phone?.message}
                {...register("phone")}
                onChange={(e) => setPhone(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={phone !== "" ? "Nº Celular" : "Digite o Nº Celular."}
              />
            </div>

            <div className={styles.wrapInput}>
              <Input
                className={password !== "" ? `has-val styles.input` : "input"}
                type="password"
                id="senha"
                error={errors.senha?.message}
                {...register("senha")}
                onChange={(e) => setPassword(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={
                  password !== "" ? "Senha" : "Digite sua senha."
                }
              />
            </div>

            <div className={styles.wrapInput}>
              <Input
                className={confirm !== "" ? `has-val styles.input` : "input"}
                type="confirm"
                id="confirm"
                error={errors.confirm?.message}
                {...register("confirm")}
                onChange={(e) => setConfirm(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={
                  confirm !== "" ? "Confirme sua senha" : "Digite novamente sua senha."
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
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
            <span className={styles.textCenter}>Já possui conta?</span>
          <Link to="/" className={styles.link}>
            <button className={styles.btnLogin} disabled={isSubmitting}>
              Fazer Login
            </button>
          </Link>
            <p className={styles.footer}>
              Tiraupp Sistemas - Todos direitos reservados
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
