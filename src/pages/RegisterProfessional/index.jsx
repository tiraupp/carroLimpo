import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ImgLogo } from "../../components/ImgLogo";
import { Input } from "../../components/Input";
import { RegisterContext } from "../../providers/RegisterProvider";
import styles from "./styles.module.scss";
import { schemaCNPJ } from "./validatorCNPJ";
import { schemaCPF } from "./validatorCPF";

export const RegisterProfessional = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");

  const handleRegistrationTypeChange = (event) => {
    setRegistrationType(event.target.value);
  };
  const { usuarioRegister } = useContext(RegisterContext);

  const onSubmit = (data) => {
    const { confirmarSenha, ...userType } = data;

    userType.tipo_perfil = "1";
    
    usuarioRegister(userType);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    resolver:
      registrationType === "pessoaFisica"
        ? zodResolver(schemaCPF)
        : zodResolver(schemaCNPJ),
  });

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.wrapRegister}>
            <div className={styles.containerLogo}>
              <ImgLogo></ImgLogo>
              <span className={styles.registerFormTitle}>
                Cadastro de Empresa / Lavação!
              </span>
            </div>
            <div className={styles.editRegister}>
              <div className={styles.wrapInput}>
                <Input
                  className={nome !== "" ? `has-val styles.input` : "input"}
                  type="text"
                  id="nome"
                  error={errors.nome?.message}
                  {...register("nome")}
                  onChange={(e) => setNome(e.target.value)}
                  spanClassName="focusInput"
                  dataPlaceholder={
                    nome !== "" ? "Nome" : "Digite seu nome ou nome da empresa"
                  }
                  clearErrors={clearErrors}
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
                  clearErrors={clearErrors}
                />
              </div>

              <div className={styles.wrapInput}>
                <Input
                  className={celular !== "" ? `has-val styles.input` : "input"}
                  type="tel"
                  id="celular"
                  error={errors.celular?.message}
                  {...register("celular")}
                  onChange={(e) => setCelular(e.target.value)}
                  spanClassName="focusInput"
                  dataPlaceholder={
                    celular !== ""
                      ? "Nº Celular"
                      : "Digite o Nº Celular 11 99999-9999"
                  }
                  clearErrors={clearErrors}
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
                  <option value="pessoaJuridica">
                    Cadastro Pessoa Jurídica
                  </option>
                </select>
              </div>
              {registrationType === "pessoaFisica" ? (
                <div className={styles.wrapInput}>
                  <Input
                    className={cpf !== "" ? `has-val styles.input` : "input"}
                    type="text"
                    id="cpf"
                    error={errors.cpf?.message}
                    {...register("cpf")}
                    onChange={(e) => setCpf(e.target.value)}
                    spanClassName="focusInput"
                    dataPlaceholder={cpf !== "" ? "CPF" : "Digite seu CPF"}
                    clearErrors={clearErrors}
                  />
                </div>
              ) : (
                <div className={styles.wrapInput}>
                  <Input
                    className={cnpj !== "" ? `has-val styles.input` : "input"}
                    type="text"
                    id="cnpj"
                    error={errors.cnpj?.message}
                    {...register("cnpj")}
                    onChange={(e) => setCnpj(e.target.value)}
                    spanClassName="focusInput"
                    dataPlaceholder={cnpj !== "" ? "CNPJ" : "Digite seu CNPJ"}
                    clearErrors={clearErrors}
                  />
                </div>
              )}
              </div>
              <div className={styles.containerSenhas}>
              <div className={styles.wrapInput}>
                <Input
                  className={senha !== "" ? `has-val styles.input` : "input"}
                  type="password"
                  id="senha"
                  error={errors.senha?.message}
                  {...register("senha")}
                  onChange={(e) => setSenha(e.target.value)}
                  spanClassName="focusInput"
                  dataPlaceholder={senha !== "" ? "Senha" : "Digite sua senha."}
                  clearErrors={clearErrors}
                />
              </div>

              <div className={styles.wrapInput}>
                <Input
                  className={
                    confirmarSenha !== "" ? `has-val styles.input` : "input"
                  }
                  type="password"
                  id="confirmarSenha"
                  error={errors.confirmarSenha?.message}
                  {...register("confirmarSenha")}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  spanClassName="focusInput"
                  dataPlaceholder={
                    confirmarSenha !== ""
                      ? "Confirme sua senha"
                      : "Digite novamente sua senha."
                  }
                  clearErrors={clearErrors}
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
    </form>
  );
};
