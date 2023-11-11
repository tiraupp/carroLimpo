import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ImgLogo } from "../../components/ImgLogo";
import { Input } from "../../components/Input";
import { RegisterContext } from "../../providers/RegisterProvider";
import styles from "./styles.module.scss";
import { schema } from "./validator";

export const RegisterClient = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirm, setConfirm] = useState("");

  const { usuarioRegister } = useContext(RegisterContext);

  const onSubmit = (data) => {
    const userType = {
      ...data,
      tipo_perfil: "2",
    };
    usuarioRegister(userType);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.containerLogin}>
          <div className={styles.wrapLogin}>
            <ImgLogo></ImgLogo>
            <span className={styles.loginFormTitle}>Cadastro de Clientes!</span>
            <span className={styles.loginFormTitle}></span>
            <div className={styles.wrapInput}>
              <Input
                className={nome !== "" ? `has-val styles.input` : "input"}
                type="nome"
                id="nome"
                error={errors.nome?.message}
                {...register("nome")}
                onChange={(e) => setNome(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={nome !== "" ? "Nome" : "Digite seu nome"}
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
                dataPlaceholder={email !== "" ? "Email" : "Digite seu email"}
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
                dataPlaceholder={
                  phone !== "" ? "Nº Celular" : "Digite o Nº Celular"
                }
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

            <div className={styles.wrapInput}>
              <Input
                className={confirm !== "" ? `has-val styles.input` : "input"}
                type="password"
                id="confirm"
                error={errors.confirm?.message}
                {...register("confirm")}
                onChange={(e) => setConfirm(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={
                  confirm !== ""
                    ? "Confirme sua senha"
                    : "Digite novamente sua senha"
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
