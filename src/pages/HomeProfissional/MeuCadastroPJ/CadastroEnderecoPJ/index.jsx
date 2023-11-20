import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../../components/Input";
import { api } from "../../../../services/api";
import styles from "./styles.module.scss";
import { schema } from "./validator";

export const CadastroEnderecoPJ = () => {
  const [id, setId] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [endereco, setEndereco] = useState({
    logradouro: "",
    numero: "",
    bairro: "",
    complemento: "",
    cep: "",
    cidade: "",
    estado: "",
  });

  const [atualizarDados, setAtualizarDados] = useState("");

  const loadDadosEndereco = async () => {
    const response = await api.get(`/endereco`);
    if (response.data < 1) {
      return;
    }
    setEndereco(response.data[0]);
  };

  const carregarCampos = () => {
    setId(endereco.id);
    setLogradouro(endereco.logradouro);
    setNumero(endereco.numero);
    setBairro(endereco.bairro);
    setComplemento(endereco.complemento);
    setCep(endereco.cep);
    setCidade(endereco.cidade);
    setEstado(endereco.estado);

    setValue("logradouro", endereco.logradouro);
    setValue("numero", String(endereco.numero));
    setValue("bairro", endereco.bairro);
    setValue("complemento", endereco.complemento);
    setValue("cep", endereco.cep);
    setValue("cidade", endereco.cidade);
    setValue("estado", endereco.estado);
  };

  const editarCadastro = async (data) => {
    try {
      const response = !id
        ? await api.post(`/endereco`, data)
        : await api.put(`/endereco/${id}`, data);
      toast.success(response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setAtualizarDados(true);
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

  useEffect(() => {
    loadDadosEndereco();
  }, [atualizarDados]);

  useEffect(() => {
    carregarCampos();
  }, [endereco]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      bairro: endereco.bairro,
      complemento: endereco.complemento,
      cep: endereco.cep,
      cidade: endereco.cidade,
      estado: endereco.estado,
    },
  });

  return (
    <div className={styles.containerMeuCadastro}>
      <h2 className={styles.titleMeusAgendamentos}>Meu endereço </h2>
      <form
        className={styles.formMeuCadastro}
        onSubmit={handleSubmit(editarCadastro)}
      >
        <div className={styles.wrapInput}>
          <Input
            className={
              logradouro !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="logradouro"
            error={errors.logradouro?.message}
            {...register("logradouro")}
            onChange={(e) => setLogradouro(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              logradouro !== "" ? "Logradouro" : "Digite o nome da rua"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              numero !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="numero"
            {...register("numero")}
            onChange={(e) => setNumero(e.target.value)}
            error={errors.numero?.message}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              numero !== "" ? "Número" : "Digite o número do endereço"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              bairro !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="bairro"
            {...register("bairro")}
            error={errors.bairro?.message}
            onChange={(e) => setBairro(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={bairro !== "" ? "Bairro" : "Digite o bairro"}
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              complemento !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="complemento"
            error={errors.complemento?.message}
            {...register("complemento")}
            onChange={(e) => setComplemento(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              complemento !== "" ? "Complemento" : "Digite um complemento"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              cep !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="cep"
            error={errors.cep?.message}
            {...register("cep")}
            onChange={(e) => setCep(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={cep !== "" ? "Cep" : "Digite o cep"}
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              cidade !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="cidade"
            error={errors.cidade?.message}
            {...register("cidade")}
            onChange={(e) => setCidade(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={cidade !== "" ? "Cidade" : "Digite a cidade"}
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              estado !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="estado"
            error={errors.estado?.message}
            {...register("estado")}
            onChange={(e) => setEstado(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              estado !== "" ? "Estado" : "Digite a sigla do estado"
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
