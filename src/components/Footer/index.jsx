import { ImgLogo } from "../ImgLogo";
import { Container } from "./styles";

export const FooterPage = () => {
  return (
    <Container>
        <div className="container">
          <div className="logo">
            <ImgLogo />
            <p>Tiraupp Sistemas - Todos os direitos reservados</p>
          </div>
          <div className="contatos">
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
          <div className="titleEndereco">
            <p>Endereço:</p>
            <span>Av Manoel Porfirio de Melo</span>
            <span>Centro, Santa Rosa do Sul-SC</span>
          </div>
        </div>
    </Container>
  );
};
