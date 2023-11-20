import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../providers/AuthProvider";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../../../../components/Input";
import { api } from "../../../../../services/api";
import styles from "./styles.module.scss";
import { schema } from "./validator";
import { toast } from "react-toastify";

export const AtualizarVeiculo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { veiculoSelecionado } = location.state || {};

  const [categoriaVeiculo, setCategoriaVeiculo] = useState([]);

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [categoria_id, setCategoria_id] = useState("");

  const loadDados = async () => {
    const responseCategoriaVeiculo = await api.get(`/categoria_veiculo`);
    setCategoriaVeiculo(responseCategoriaVeiculo.data);

    setMarca(veiculoSelecionado.marca);
    setModelo(veiculoSelecionado.modelo);
    setPlaca(veiculoSelecionado.placa);
    setAno(veiculoSelecionado.ano);
    setCategoria_id(veiculoSelecionado.categoria_id);
    
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
    defaultValues: {
      marca: veiculoSelecionado.marca,
      modelo: veiculoSelecionado.modelo,
      placa: veiculoSelecionado.placa,
      ano: String(veiculoSelecionado.ano),
      categoria_id: String(veiculoSelecionado.categoria_id),
    },
  });

  const cadastrar = async (data) => {
    try {
      const response = await api.put(`/veiculo/${veiculoSelecionado.id}`,data)
      toast.success(response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/homeclient/meucadastro/veiculos", {
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
    navigate("/homeclient/meucadastro/veiculos", {
      state: { atualizacao: true },
    });
  };

  useEffect(() => {
    setCategoria_id(categoria_id);
  }, [categoria_id]);

  return (
    <div className={styles.containerMeuCadastro}>
      <h2 className={styles.titleMeusAgendamentos}>Atualizar veículo:</h2>
      <form
        className={styles.formMeuCadastro}
        onSubmit={handleSubmit(cadastrar)}
      >
        <div className={styles.wrapInput}>
          <Input
            className={
              marca !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="marca"
            error={errors.marca?.message}
            {...register("marca")}
            onChange={(e) => setMarca(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              marca !== "" ? "Marca" : "Digite a marca do veículo"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              modelo !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="modelo"
            {...register("modelo")}
            onChange={(e) => setModelo(e.target.value)}
            error={errors.modelo?.message}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              modelo !== "" ? "Modelo" : "Digite o modelo do veículo"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              placa !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="placa"
            {...register("placa")}
            onChange={(e) => setPlaca(e.target.value)}
            error={errors.placa?.message}
            spanClassName="focusInputBlue"
            dataPlaceholder={
              placa !== "" ? "Placa" : "Digite a placa do veículo"
            }
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <Input
            className={
              ano !== ""
                ? `has-val input color-text-blue`
                : "input color-text-blue"
            }
            type="text"
            id="ano"
            error={errors.ano?.message}
            {...register("ano")}
            onChange={(e) => setAno(e.target.value)}
            spanClassName="focusInputBlue"
            dataPlaceholder={ano !== "" ? "Ano" : "Digite o ano do veículo"}
            clearErrors={clearErrors}
          />
        </div>
        <div className={styles.wrapInput}>
          <label htmlFor="categoria_id">Selecione a categoria do veículo:</label>
          <select
            className={styles.selecaoDados}
            id="categoria_id"
            {...register("categoria_id")}
          >
            <option value={categoria_id}>
              {categoriaVeiculo.find(({ id }) => categoria_id == id)?.descricao}
            </option>
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
    </div>
  );
};
