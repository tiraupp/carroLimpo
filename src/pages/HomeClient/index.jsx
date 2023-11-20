import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { ImgLogo } from "../../components/ImgLogo";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

import { RiImageEditLine } from "react-icons/ri";
import { ModalEditarFoto } from "../../modal/ModalEditarFoto";
import { FaWhatsapp } from "react-icons/fa";
import { GrInstagram ,GrLinkedin } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { ModalSobre } from "../../modal/ModalSobre";

export const HomeClient = () => {
  const { user, recarregarDadosUsuario } = useContext(AuthContext);

  const dataAtual = new Date();
  const formatoData = {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR", formatoData);

  const extrairPrimeiroNome = (nomeCompleto) => {
    const partesDoNome = nomeCompleto.split(" ");
    const primeiroNome = partesDoNome[0];
    return primeiroNome;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSobreOpen, setIsModalSobreOpen] = useState(false);



  const handleOpenModalSobre = () => {
    setIsModalSobreOpen(true);
  };

  const handleCloseModalSobre = () => {
    setIsModalSobreOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = async (data) => {
    try {
      const formData = new FormData();
      formData.append("arquivo", data.arquivo[0]);
      console.log(data.arquivo[0]);
      const response = await api.put("/usuario/editarimagem", formData, {
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
      recarregarDadosUsuario();
    } catch (error) {
      console.error("Erro ao enviar foto do perfil:", error);
      toast.error("Erro ao enviar foto do perfil", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    handleCloseModal();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.menuContainer}>
            <div className={styles.saudacao}>
              <div className={styles.imagemContainer}>
                <img
                  className={styles.imagemPerfil}
                  src={user.url_perfil}
                  alt=""
                />
                <button
                  className={styles.botaoEdicao}
                  onClick={handleOpenModal}
                >
                  <RiImageEditLine />
                </button>
              </div>

              <div className={styles.usuario}>
                <span className={styles.title}>
                  Olá, {extrairPrimeiroNome(user.nome)}
                </span>
                <span className={styles.data}>{dataFormatada}</span>
              </div>
            </div>
            <div className={styles.containerOpcoesMenu}>
              <Link className={styles.menu} to={"meucadastro/dadospessoais"}>
                Meu Cadastro
              </Link>
              <Link className={styles.menu} to={"localizarprofissional"}>
                Agendar
              </Link>
              <Link className={styles.menu} to={"meusagendamentos"}>
                Meus Agendamentos
              </Link>
              <Link
                className={styles.menu}
                onClick={() => localStorage.clear("@ts-carro_limpo:token")}
                to={"/"}
              >
                Sair
              </Link>
            </div>
          </div>
          <Outlet />
        </div>
      </div>

      <footer className={styles.containerFooter}>
        <div className={styles.containerLogo}>
          <ImgLogo />
          <p>Tiraupp Sistemas - Todos os direitos reservados</p>
        </div>
        <div className={styles.containerContatos}>
          <p className={styles.tituloContatos}>Contatos:</p>
          <div className={styles.iconesContatos}>
          <a
          className={styles.icones}
            href="mailto:tiraupp@rede.ulbra.br"
            target="_blank"
            rel="noreferrer"
          >
            <MdOutlineEmail />
          </a>
          <a
          className={styles.icones}
            href="https://www.instagram.com/ocarrolimpo/"
            target="_blank"
            rel="noreferrer"
          >
            <GrInstagram />
          </a>
          <a
          className={styles.icones}
            href="https://wa.me/48999799419"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a
          className={styles.icones}
            href="https://www.linkedin.com/in/tiago-raupp/"
            target="_blank"
            rel="noreferrer"
          >
            <GrLinkedin />
          </a>
          <a
          className={styles.icones}
          onClick={handleOpenModalSobre}
          >
            <BiLike />
          </a>
          </div>
          
        </div>
        <div className={styles.containerEndereco}>
          <p className={styles.tituloEndereco}>Endereço:</p>
          <span>Av Santa Rosa do Sul</span>
          <br></br>
          <span>Centro, Santa Rosa do Sul-SC</span>
        </div>
      </footer>
      <ModalEditarFoto
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileUpload={handleFileUpload}
      />
      <ModalSobre
        isOpen={isModalSobreOpen}
        onClose={handleCloseModalSobre}
      />
    </>
  );
};
