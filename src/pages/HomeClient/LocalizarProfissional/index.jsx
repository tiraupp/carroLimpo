import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

import { useForm } from "react-hook-form";
import { GoChevronLeft, GoChevronRight, GoStarFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import searching from "../../../assets/searching.svg";
import { Input } from "../../../components/Input";
import { api } from "../../../services/api";
import styles from "./styles.module.scss";


export const LocalizarProfissional = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [profissional, setProfissional] = useState([]);
  const [localizarProfissional, setLocalizarProfissional] = useState("");
  const [cidade, setCidade] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    clearErrors,
  } = useForm();

  const loadDados = async () => {
    if(!user.endereco.cidade){
      toast.info("Você não possui endereço cadastrado, cadastre um endereço para uma melhor experiência", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    try {
      const cidade = user.endereco[0].cidade;
      const responseProfissional = await api.get(
        `/profissional/listar?cidade=${cidade}`
      );
      setProfissional(responseProfissional.data);
    } catch (error) {
      toast.error(error.response.data.mensagem, { autoClose: 2000 });
    }
  };

  const loadProfissionais = async (data) => {
    if(!localizarProfissional && !cidade){
      return toast.warn("Informe nome do profissional/empresa ou a ciadde", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    const filtro = data.localizarProfissional !== "" ? "nome" : "cidade";
    const query =
      data.localizarProfissional !== "" ? localizarProfissional : cidade;
    try {
      const response = await api.get(`/profissional/listar?${filtro}=${query}`);
      setProfissional(response.data);
      if(response.data.length < 1)
      return toast.error("Nenhum profissional/empresa encontrada", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error(error.response.data.mensagem, { autoClose: 2000 });
    }
  };

  const [startIndex, setStartIndex] = useState(0);

  const cardsPerPage = 3;
  const totalCards = profissional.length;

  const handleNext = () => {
    const newIndex = Math.min(
      startIndex + cardsPerPage,
      totalCards - cardsPerPage
    );
    setStartIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = Math.max(startIndex - cardsPerPage, 0);
    setStartIndex(newIndex);
  };

  useEffect(() => {
    loadDados();
  }, []);

  return (
    <div className={styles.localizarProfissional}>
      <h2 className={styles.title}>
        Busque o profissional pelo nome ou por uma cidade
      </h2>
      <form
        className={styles.formAgendamentos}
        onSubmit={handleSubmit(loadProfissionais)}
      >
        <div className={styles.agendamentos}>
          <div className={styles.divSelecaoDados}>
            <div className={styles.wrapInput}>
              <Input
                className={
                  localizarProfissional !== ""
                    ? `has-val styles.input color-text-blue`
                    : "input"
                }
                type="text"
                id="localizarProfissional"
                error={errors.localizarProfissional?.message}
                {...register("localizarProfissional")}
                onChange={(e) => setLocalizarProfissional(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={
                  localizarProfissional !== ""
                    ? "Profissional"
                    : "Digite o nome do profissional/empresa"
                }
                clearErrors={clearErrors}
              />
            </div>
          </div>
          <div className={styles.divSelecaoDados}>
            <div className={styles.wrapInput}>
              <Input
                className={
                  cidade !== ""
                    ? `has-val styles.input color-text-blue`
                    : "input"
                }
                type="text"
                id="cidade"
                error={errors.cidade?.message}
                {...register("cidade")}
                onChange={(e) => setCidade(e.target.value)}
                spanClassName="focusInput"
                dataPlaceholder={cidade !== "" ? "Cidade" : "Digite uma cidade"}
                clearErrors={clearErrors}
              />
            </div>
          </div>
        </div>
        <div className={styles.divBtn}>
          <button
            className={styles.formBtn}
            type="submit"
            disabled={isSubmitting}
          >
            <div className={styles.loading}></div>
            {isSubmitting ? "Buncando..." : "Buscar"}
          </button>
        </div>
      </form>

      {profissional.length > 0 ? (
        <div className={styles.divSelecaoProfissionais}>
          <button
            className={styles.goButton}
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <GoChevronLeft className={styles.goButton} />
          </button>
          {profissional
            .slice(startIndex, startIndex + cardsPerPage)
            .map(({ nome, id, url_perfil, avaliacao }) => (
              <div key={id} className={styles.cardProfissional}>
                <Link className={styles.linkCards} to={"/homeclient/agendarservico"} state={ { profissionalSelecionado:{ nome, id, url_perfil, avaliacao } }} >
                  <img
                    className={styles.imagemProfissional}
                    src={url_perfil}
                    alt="imagem do estabelecimento"
                  />
                  <p>{nome}</p>
                  <p>
                    {Array.from({ length: avaliacao }, (_, index) => (
                      <span key={index}>
                        <GoStarFill className={styles.goStar} />
                      </span>
                    ))}
                  </p>
                </Link>
              </div>
            ))}

          <button
            className={styles.goButton}
            onClick={handleNext}
            disabled={startIndex + cardsPerPage >= totalCards}
          >
            <GoChevronRight className={styles.goButton} />
          </button>
        </div>
      ) : (
        <img
          src={searching}
          alt="icone de pesquisa"
          className={styles.iconeSearching}
        />
      )}
    </div>
  );
};
