import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";

import { toast } from "react-toastify";
import searchBro from "../../../../../src/assets/search-bro.svg";

import { ModalAgendamentoPJ } from "../../../../modal/ModalAgendamentoPJ";
import { api } from "../../../../services/api";
import styles from "./styles.module.scss";

export const Agendamentos = ({ opcaoAgendamento }) => {
  const { user } = useContext(AuthContext);
  const [agendamento, setAgendamento] = useState([]);
  const [dadosAgendamento, setDadosAgendamento] = useState("");

  const loadDados = async () => {
    try {
      const response = await api.get(`agendamento/profissional`);
      switch (opcaoAgendamento) {
        case "ativos":
          setAgendamento(
            response.data.filter(
              (agenda) =>
                agenda.descricao === "Agendado" ||
                agenda.descricao === "Em Andamento"
            )
          );
          break;
        case "cancelados":
          setAgendamento(
            response.data.filter((agenda) => agenda.descricao === "Cancelado")
          );
          break;
        case "concluídos":
          setAgendamento(
            response.data.filter((agenda) => agenda.descricao === "Concluído")
          );
          break;
        default:
          setAgendamento(response.data);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatarData = (dataCompleta) => {
    const data = new Date(dataCompleta);

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e, dadosCardAgendamento) => {
    console.log(e);
    e.preventDefault();
    setDadosAgendamento(dadosCardAgendamento);

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await api.patch(
        `/agendamento/profissional/status/${dadosAgendamento.id}`,
        { status: dadosAgendamento.status_id }
      );
      loadDados();
      toast.success(`Agendamento ${dadosAgendamento.mensagemToast} com sucesso`, {
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

  useEffect(() => {
    loadDados();
  }, [opcaoAgendamento]);

  return (
    <div className={styles.containerMeusAgendamentos}>
      <h2 className={styles.titleMeusAgendamentos}>
        Meus Agendamentos: {opcaoAgendamento}
      </h2>

      {agendamento.length < 1 ? (
        <div>
          <img
            className={styles.imgSearch}
            src={searchBro}
            alt="Icone nenhum veiculo cadastrado"
          />
          <p className={styles.mensagem}>
            Você ainda não possui agendamentos {opcaoAgendamento}.
          </p>
        </div>
      ) : (
        <div className={styles.meusAgendamentos}>
          {agendamento.map(
            ({
              id,
              data_agendamento,
              horario_agendamento,
              valor,
              nome_servico,
              nome_usuario,
              modelo,
              placa,
              descricao,
            }) => (
              <div key={id} className={styles.containerCardAgendamento}>
                <div className={styles.cardAgendamento} value={id}>
                  <h3>
                    {nome_servico} R${" "}
                    {(valor / 100).toFixed(2).replace(".", ",")}
                  </h3>
                  <p>
                    Cliente: <span>{nome_usuario}</span>
                  </p>
                  <p>
                    Horário: {formatarData(data_agendamento)} -{" "}
                    {horario_agendamento}
                  </p>
                </div>
                {descricao === "Agendado" || descricao === "Em Andamento" ? (
                  <div className={styles.containerBtnCard}>
                    <button
                      className={styles.btnIniciar}
                      id="iniciar"
                      onClick={(e) => {
                        const dadosCardAgendamento = {
                          id,
                          data_agendamento,
                          horario_agendamento,
                          valor,
                          nome_servico,
                          nome_usuario,
                          modelo,
                          placa,
                          botao: e.target.id,
                          mensagemToast: "iniciado",
                          status_id: 3,
                        };
                        handleOpenModal(e, dadosCardAgendamento);
                      }}
                    >
                      Iniciar
                    </button>
                    <button
                      className={styles.btnFinalizar}
                      id="finalizar"
                      onClick={(e) => {
                        const dadosCardAgendamento = {
                          id,
                          data_agendamento,
                          horario_agendamento,
                          valor,
                          nome_servico,
                          nome_usuario,
                          modelo,
                          placa,
                          botao: e.target.id,
                          mensagemToast: "finalizado",
                          status_id: 4,
                        };
                        handleOpenModal(e, dadosCardAgendamento);
                      }}
                    >
                      Finalizar
                    </button>
                    <button
                      className={styles.btnCancelar}
                      id="cancelar"
                      onClick={(e) => {
                        const dadosCardAgendamento = {
                          id,
                          data_agendamento,
                          horario_agendamento,
                          valor,
                          nome_servico,
                          nome_usuario,
                          modelo,
                          placa,
                          botao: e.target.id,
                          mensagemToast: "cancelado",
                          status_id: 5,
                        };
                        handleOpenModal(e, dadosCardAgendamento);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <span>Serviço: {descricao}</span>
                )}
              </div>
            )
          )}
        </div>
      )}
      <ModalAgendamentoPJ
        isOpen={isModalOpen}
        message={{
          titulo: `Deseja ${dadosAgendamento.botao} o agendamento?`,
          servico: dadosAgendamento.nome_servico,
          veiculo: dadosAgendamento.modelo,
          nomeProfissional: dadosAgendamento.nome_usuario,
          dia: formatarData(dadosAgendamento.data_agendamento),
          horario: dadosAgendamento.horario_agendamento,
          valor: (dadosAgendamento.valor / 100).toFixed(2).replace(".", ","),
        }}
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
      />
    </div>
  );
};
