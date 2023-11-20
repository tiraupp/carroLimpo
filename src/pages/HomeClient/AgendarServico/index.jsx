import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoStarFill } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import schedule from "../../../assets/schedule.svg";
import { Modal } from "../../../modal/Modal";
import { AuthContext } from "../../../providers/AuthProvider";
import { api } from "../../../services/api";
import styles from "./styles.module.scss";

export const AgendarServico = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    nome,
    id: id_profissional,
    url_perfil,
    avaliacao,
  } = location.state?.profissionalSelecionado || {};

  const [calendario, setCalendario] = useState("");
  const [servico, setServico] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [veiculo, setVeiculo] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("");
  const [dadosAgendamento, setDadosAgendamento] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const loadDados = async () => {
    try {
      const response = await api.get(
        `/servico?profissional=${id_profissional}`
      );
      setServico(response.data);

      const token = localStorage.getItem("@ts-carro_limpo:token");
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      const responseVeiculo = await api.get(`/veiculo`);
      setVeiculo(responseVeiculo.data);
    } catch (error) {
      toast.error(error.response.data.mensagem, { autoClose: 2000 });
    }
  };

  const buscarAgenda = async (event) => {
    event.preventDefault();
    const horariosAtendimento = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];
    const response = await api.get(
      `/agendamento/profissional?profissional_id=${id_profissional}&data_agendamento=${calendario}`
    );

    const horariosAgendados = response.data.map(
      (item) => item.horario_agendamento
    );

    const horariosLivres = horariosAtendimento.filter(
      (horario) => !horariosAgendados.includes(horario)
    );

    setHorariosDisponiveis(horariosLivres);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (data) => {
    (data.usuario_id = user.id),
      (data.veiculo_id = veiculoSelecionado.id),
      (data.profissional_id = id_profissional),
      (data.servico_id = servicoSelecionado.id),
      (data.valor = servicoSelecionado.valor),
      (data.data_agendamento = calendario),
      (data.status_id = 2),
      (data.horario_agendamento = horarioSelecionado.horario);
    setDadosAgendamento(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("@ts-carro_limpo:token");

      api.defaults.headers.common.authorization = `Bearer ${token}`;
      await api.post(`/agendamento/`, dadosAgendamento);

      navigate("/homeclient/meusagendamentos");

      toast.success("Agendamento cadastrado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error(error.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log(error);
    }
    handleCloseModal();
  };

  const formatarData = (dataCompleta) => {
    const data = new Date(`${dataCompleta}T00:00:00`);

    const dia = data.getDate();
    const mes = data.getMonth() + 1; // O mês é baseado em zero, então somamos 1
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    loadDados();
  }, []);

  return (
    <form
      className={styles.localizarProfissional}
      onSubmit={handleSubmit(handleOpenModal)}
    >
      <div className={styles.containerProfissional}>
        <div className={styles.dadosProfissional}>
          <h2 className={styles.title}>{nome}</h2>
          <p>
            {Array.from({ length: avaliacao }, (_, index) => (
              <span key={index}>
                <GoStarFill className={styles.goStar} />
              </span>
            ))}
          </p>
        </div>
      </div>
      <div
        className={styles.formAgendamentos}
        onSubmit={handleSubmit(buscarAgenda)}
      >
        <div className={styles.agendamentos}>
          <div className={styles.divSelecaoDados}>
            <label htmlFor="calendario">Selecione uma data: </label>
            <input
              className={styles.inputSelecaoDados}
              type="date"
              id="calendario"
              name="calendario"
              onChange={(e) => {
                setCalendario(e.target.value);
              }}
            />
          </div>

          <div className={styles.divSelecaoDados}>
            <label htmlFor="veiculo">Selecione o veículo: </label>
            <select
              className={styles.selecaoDados}
              id="veiculoSelecionado"
              onChange={(e) => {
                setVeiculoSelecionado(JSON.parse(e.target.value));
              }}
            >
              <option value="">Selecione...</option>
              {veiculo.map(({ id, modelo, placa }) => (
                <option key={id} value={JSON.stringify({ id, modelo })}>
                  {modelo} - {placa}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.containerServicoProfissional}>
          <h3 className={styles.titleServicos}> Selecione o serviço:</h3>
          <div className={styles.servicosProfissional}>
            {servico.map(({ nome, id, descricao, valor, url_imagem }) => (
              <label
                key={id}
                className={
                  id === servicoSelecionado.id
                    ? styles.cardProfissionalSelecionado
                    : styles.cardProfissional
                }
              >
                <input
                  className={styles.inputRadio}
                  type="radio"
                  name="servicoSelecionado"
                  value={id}
                  onChange={() => {
                    setServicoSelecionado({
                      nome,
                      id,
                      descricao,
                      valor,
                      url_imagem,
                    });
                  }}
                />
                <img
                  className={styles.imagemServico}
                  src={url_imagem}
                  alt="imagem do serviço"
                />
                <p>{nome}</p>
                <p>R$ {(valor / 100).toFixed(2).replace(".", ",")}</p>
                <span data-descricao={descricao} />
              </label>
            ))}
          </div>
        </div>

        <div className={styles.divBtn}>
          <button className={styles.formBtn} onClick={buscarAgenda}>
            <div className={styles.loading}></div>
            {isSubmitting ? "Buncando..." : "Buscar"}
          </button>
        </div>
      </div>

      <h3 className={styles.h3title}>Selecione o horário desejado:</h3>
      {horariosDisponiveis.length > 0 ? (
        <div className={styles.divSelecaoHorario}>
          {horariosDisponiveis.map((horario, index) => (
            <label
              key={index}
              className={
                horario == horarioSelecionado.horario
                  ? styles.cardHorarioSelecionado
                  : styles.cardHorario
              }
            >
              <input
                className={styles.radioHorarios}
                type="radio"
                name="horarioSelecionado"
                value={horario}
                onChange={() => {
                  setHorarioSelecionado({
                    horario,
                  });
                }}
              />
              <p>{horario}</p>
            </label>
          ))}
        </div>
      ) : (
        <img src={schedule} alt="icone de pesquisa" className={styles.icone} />
      )}
      <div className={styles.divBtnAgendar}>
        <button
          className={styles.btnAgendar}
          type="submit"
          disabled={isSubmitting}
        >
          <div className={styles.loading}></div>
          {isSubmitting ? "Agendando..." : "Agendar"}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        message={{
          titulo: "Deseja confirmar o agendamento?",
          servico: servicoSelecionado.nome,
          veiculo: veiculoSelecionado.modelo,
          nomeProfissional: nome,
          dia: formatarData(calendario),
          horario: horarioSelecionado.horario,
          valor: (servicoSelecionado.valor / 100).toFixed(2).replace(".", ","),
        }}
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
      />
    </form>
  );
};
