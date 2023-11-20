import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../../components/Input";
import { api } from "../../../../services/api";
import styles from "./styles.module.scss";
import { schema } from "./validator";

export const CadastroPessoalPJ = () => {
  const { user, recarregarDadosUsuario } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");

  const editarCadastro = async (data) => {
    try {
      const response = await api.put(`/usuario/dadospessoais`, data);
      recarregarDadosUsuario();
      toast.success(response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const carregarDados = () => {
    setNome(user.nome || "");
    setEmail(user.email || "");
    setCelular(user.celular || "");
    setCpf(user.cpf || "");
    setCnpj(user.cnpj || "");

    setValue("nome", user.nome);
    setValue("email", user.email);
    setValue("celular", user.celular);
    setValue("cpf", user.cpf);
    setValue("cnpj", user.cnpj);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: nome,
      email: email,
      celular: celular,
      cpf: cpf,
      cnpj: cnpj,
    },
  });

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className={styles.containerMeuCadastro}>
      <h2 className={styles.titleMeusAgendamentos}>Meus dados pessoais</h2>
      <form
        className={styles.formMeuCadastro}
        onSubmit={handleSubmit(editarCadastro)}
      >
        <div className={styles.wrapInput}>
          <Input
            className={
              nome !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="nome"
            error={errors.nome?.message}
            {...register("nome")}
            onChange={(e) => setNome(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={nome !== "" ? "Nome" : "Digite seu nome"}
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              email !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="email"
            {...register("email")}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email?.message}
            spanClassName="focusInputBlue"
            dataPlaceholder={email !== "" ? "Email" : "Digite seu email"}
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              celular !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="celular"
            {...register("celular")}
            onChange={(e) => setCelular(e.target.value)}
            error={errors.celular?.message}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              celular !== "" ? "Celular" : "Digite o nº do seu celular"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              cpf !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="cpf"
            error={errors.cpf?.message}
            {...register("cpf")}
            onChange={(e) => setCpf(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={cpf !== "" ? "CPF" : "Digite seu CPF"}
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              cnpj !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="cnpj"
            error={errors.cnpj?.message}
            {...register("cnpj")}
            onChange={(e) => setCnpj(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={cnpj !== "" ? "CNPJ" : "Digite seu cnpj"}
            clearErrors={clearErrors}
          />
        </div>

        <div className={styles.containerLoginFormBtn}>
          <button
            className={styles.loginFormBtn}
            type="submit"
            disabled={isSubmitting}
          >
            <div className={styles.loading}></div>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};
