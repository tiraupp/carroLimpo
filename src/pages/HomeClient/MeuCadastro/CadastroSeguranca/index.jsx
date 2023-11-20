import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../../components/Input";
import { api } from "../../../../services/api";
import styles from "./styles.module.scss";
import { schema } from "./validator";

export const CadastroSeguranca = () => {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [recarregarPagina, setRecarregarPagina] = useState("");

  const editarSenha = async (data) => {
    try {
      const response = await api.put(`/usuario/alterarsenha`, data);
      toast.success(response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setRecarregarPagina(true);
      reset({
        senhaAtual: "",
        novaSenha: "",
        confirmarSenha: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  useEffect(() => {
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
  }, [recarregarPagina]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className={styles.containerMeuCadastro}>
      <h2 className={styles.titleMeusAgendamentos}>Minha Senha </h2>
      <form
        className={styles.formMeuCadastro}
        onSubmit={handleSubmit(editarSenha)}
      >
        <div className={styles.wrapInput}>
          <Input
            className={
              senhaAtual !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="password"
            id="senhaAtual"
            error={errors.senhaAtual?.message}
            {...register("senhaAtual")}
            onChange={(e) => setSenhaAtual(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              senhaAtual !== "" ? "Senha Atual" : "Digite sua senha atual"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              novaSenha !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="password"
            id="novaSenha"
            {...register("novaSenha")}
            onChange={(e) => setNovaSenha(e.target.value)}
            error={errors.novaSenha?.message}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              novaSenha !== "" ? "Nova Senha" : "Digite a nova senha"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              confirmarSenha !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="password"
            id="confirmarSenha"
            {...register("confirmarSenha")}
            error={errors.confirmarSenha?.message}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              confirmarSenha !== ""
                ? "Confirmar Senha"
                : "Digite novamente a senha"
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
