import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../../components/Input";
import { api } from "../../../../services/api";
import styles from "./styles.module.scss";
import { schema } from "./validator";

export const CadastroPessoal = () => {
  const { user, recarregarDadosUsuario } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setData_nascimento] = useState("");

  const formatarData = (dataCompleta) => {
    const data =
      dataCompleta !== ""
        ? new Date(dataCompleta)
        : new Date("2020-01-01T00:00:00");

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    return `${ano}-${mes}-${dia}`;
  };

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
    setData_nascimento(formatarData(user.data_nascimento));

    setValue("nome", user.nome);
    setValue("email", user.email);
    setValue("celular", user.celular);
    setValue("cpf", user.cpf);
    setValue(formatarData(user.data_nascimento));
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
      data_nascimento: formatarData(user.data_nascimento),
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
              data_nascimento !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="date"
            id="data_nascimento"
            error={errors.data_nascimento?.message}
            {...register("data_nascimento")}
            onChange={(e) => setData_nascimento(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              data_nascimento !== ""
                ? "Data de nascimento"
                : "Data de nascimento"
            }
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
