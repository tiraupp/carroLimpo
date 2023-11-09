import logo from "../../assets/logoSF.png";
import { Container } from "./styles";

export const ImgLogo = () => {
  return (
    <Container>
      <img className="logoImg" src={logo} alt="Logo Carro Limpo" />
    </Container>
  );
};
