import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ImgLogo } from "../../components/ImgLogo";
import { Input } from "../../components/Input";
import { AuthContext } from "../../providers/AuthProvider";
import { schema } from "../Selection/validator";
import styles from "./styles.module.scss";

export const RegisterProfessional = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");

  const handleRegistrationTypeChange = (event) => {
    setRegistrationType(event.target.value);
  };

  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <form className={styles.registerForm} onSubmit={handleSubmit(signIn)}>
      <div className={styles.container}>
        <div className={styles.containerRegister}>
          <div className={styles.wrapRegister}>
            <div className={styles.editRegister}>
            <ImgLogo></ImgLogo>
            <span className={styles.registerFormTitle}>
              Cadastro de Empresa / Lavação!
            </span>
            <div className={styles.wrapInput}>
              <Input
                className={name !== "" ? `has-val styles.input` : "input"}
                type="name"
                id="name"
                error={errors.name?.message}
                {...register("name")}
                onChange={(e) => setName(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={
                  name !== "" ? "Nome" : "Digite seu nome ou nome da empresa"
                }
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

            <div className={styles.registrationType}>
              <label htmlFor="registrationType">Tipo de Cadastro: </label>
              <select
                id="registrationType"
                name="registrationType"
                value={registrationType}
                onChange={handleRegistrationTypeChange}
              >
                <option value="">Selecione...</option>
                <option value="pessoaFisica">Cadastro Pessoa Física</option>
                <option value="pessoaJuridica">Cadastro Pessoa Jurídica</option>
              </select>
            </div>
            {registrationType === "pessoaFisica" ? (
              <div className={styles.wrapInput}>
                <Input
                  className={cpf !== "" ? `has-val styles.input` : "input"}
                  type="cpf"
                  id="cpf"
                  error={errors.cpf?.message}
                  {...register("cpf")}
                  onChange={(e) => setCpf(e.target.value)}
                  spanClassName="focusInput"
                  dataPlaceholder={cpf !== "" ? "CPF" : "Digite seu CPF"}
                />
              </div>
            ) : (
              <div className={styles.wrapInput}>
                <Input
                  className={cnpj !== "" ? `has-val styles.input` : "input"}
                  type="cnpj"
                  id="cnpj"
                  error={errors.cnpj?.message}
                  {...register("cnpj")}
                  onChange={(e) => setCnpj(e.target.value)}
                  spanClassName="focusInput"
                  dataPlaceholder={cnpj !== "" ? "CNPJ" : "Digite seu CNPJ"}
                />
              </div>
            )}

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
                  confirm !== ""
                    ? "Confirme sua senha"
                    : "Digite novamente sua senha."
                }
              />
            </div>
            </div>
            
            <div className={styles.interationForm}>
              <div className={styles.containerRegisterFormBtn}>
                <button
                  className={styles.registerFormBtn}
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
      </div>
    </form>
  );
};
