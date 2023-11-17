import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

import { useForm } from "react-hook-form";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { ImgLogo } from "../../components/ImgLogo";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import { GoStarFill } from "react-icons/go";

export const HomeClient = () => {
  const { user } = useContext(AuthContext);

  const dataAtual = new Date();
  const formatoData = {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR", formatoData);


  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.menuContainer}>
            <div className={styles.saudacao}>
              <img
                className={styles.imagemPerfil}
                src={user.url_perfil}
                alt=""
              />
              <span className={styles.title}>Olá, {user.nome}</span>
              <span className={styles.data}>{dataFormatada}</span>
            </div>
            <div className={styles.containerOpcoesMenu}>
              <div className={styles.opcoesMenu}>
                <Link className={styles.menu} to={"meucadastro"}>Meu Cadastro</Link>
                <Link className={styles.menu} to={"localizarprofissional"}>Agendar</Link>
                <Link className={styles.menu} to={"meusagendamentos"}>Meus Agendamentos</Link>
                <Link className={styles.menu} onClick={()=>localStorage.clear("@ts-carro_limpo:token")} to={"/"}>Sair</Link>
              </div>
              <div className={styles.containerUsuario}>
                <span>Programa de Fidelidade: {user.pontos}</span>
                <span>classificação: {Array.from({ length: user.avaliacao }, (_, index) => (
              <span key={index}>
                <GoStarFill className={styles.goStar} />
              </span>
            ))}</span>
              </div>
            </div>
          </div>
          <Outlet/>
        </div>
      </div>

      <footer className={styles.containerFooter}>
        <div className={styles.logo}>
          <ImgLogo />
          <p>Tiraupp Sistemas - Todos os direitos reservados</p>
        </div>
        <div className={styles.contatos}>
          <p>Contatos:</p>
          <a
            href="mailto:seuemail@example.com"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="https://www.instagram.com/seuinstagram"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com/seufacebook"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://wa.me/seunumerodetelefone"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="https://twitter.com/seutwitter"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div className={styles.titleEndereco}>
          <p>Endereço:</p>
          <span>Av Manoel Porfirio de Melo</span>
          <span>Centro, Santa Rosa do Sul-SC</span>
        </div>
      </footer>
    </>
  );
};
