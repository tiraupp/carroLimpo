import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { RiImageEditLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { Input } from "../../../../components/Input";
import { ModalEditarFoto } from "../../../../modal/ModalEditarFoto";
import { api } from "../../../../services/api";
import styles from "./styles.module.scss";
import { schema } from "./validator";

export const CadastrarServico = () => {
  const navigate = useNavigate();

  const [categoriaVeiculo, setCategoriaVeiculo] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [nome, setNome] = useState("");
  const [arquivo, setArquivo] = useState("");

  const loadDados = async () => {
    const responseCategoriaVeiculo = await api.get(`/categoria_veiculo`);
    setCategoriaVeiculo(responseCategoriaVeiculo.data);
  };

  useEffect(() => {
    loadDados();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const cadastrar = async (data) => {
    const valorFormatado = data.valor.replace(/[^\d]/g, "");

    try {
      const formData = new FormData();
      formData.append("arquivo", arquivo);
      formData.append("nome", data.nome);
      formData.append("descricao", data.descricao);
      formData.append("valor", valorFormatado);
      formData.append("categoria_id", data.categoria_id);

      if (!arquivo) {
        return toast.error("A imagem deve ser selecionada", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      const response = await api.post("/servico", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/homeprofissional/servicos", {
        state: { atualizacao: true },
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

  const cancelar = (e) => {
    e.preventDefault();
    navigate("/homeprofissional/servicos", {
      state: { atualizacao: true },
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = async (data) => {
    const formData = new FormData();
    formData.append("arquivo", data.arquivo[0]);

    setArquivo(data.arquivo[0]);
    handleCloseModal();
  };
  const handleInputChange = (e) => {
    const novoValor = e.target.value.replace(/[^\d]/g, "");

    const valorFormatado = novoValor.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

    setValor(`R$ ${valorFormatado}`);
  };

  return (
    <div className={styles.containerMeuCadastro}>
      <h2 className={styles.titleMeusAgendamentos}>Cadastrar serviço</h2>
      <form
        className={styles.formMeuCadastro}
        onSubmit={handleSubmit(cadastrar)}
      >
        <Link className={styles.botaoEdicao} onClick={handleOpenModal}>
          <RiImageEditLine />
          <span className={styles.tituloBotaoServico}>
            Escolha uma imagem para o serviço
          </span>
        </Link>
        <div className={styles.wrapInput}>
          <Input
            className={
              nome !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="nome"
            {...register("nome")}
            onChange={(e) => setNome(e.target.value)}
            error={errors.nome?.message}
            spanClassName="focusInputBlue"
            dataPlaceholder={nome !== "" ? "Nome" : "Digite o nome do serviço"}
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              descricao !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="descricao"
            error={errors.descricao?.message}
            {...register("descricao")}
            onChange={(e) => setDescricao(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              descricao !== "" ? "Descrição" : "Digite a descrição do serviço"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              valor !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="valor"
            {...register("valor")}
            onChange={(e) => handleInputChange(e)}
            value={valor}
            error={errors.valor?.message}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              valor !== "" ? "Valor" : "Digite o valor do serviço"
            }
            clearErrors={clearErrors}
          />
        </div>

        <div className={styles.wrapInput}>
          <label htmlFor="categoria_id">
            Selecione a categoria do veículo:
          </label>
          <select
            className={styles.selecaoDados}
            id="categoria_id"
            {...register("categoria_id")}
          >
            <option value="">Selecione...</option>
            {categoriaVeiculo.map(({ id, descricao }) => (
              <option key={id} value={id}>
                {descricao}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.modalButtons}>
          <button
            className={styles.onCancel}
            onClick={(event) => cancelar(event)}
          >
            Cancelar
          </button>
          <button
            className={styles.onConfirm}
            type="submit"
            disabled={isSubmitting}
          >
            <div className={styles.loading}></div>
            {isSubmitting ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </form>
      <ModalEditarFoto
        titulo={"Selecione uma imagem para o serviço"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};
