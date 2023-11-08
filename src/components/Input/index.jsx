import { forwardRef } from "react";
import { toast } from "react-toastify";
import { Container } from "./styles";

export const Input = forwardRef(
  ({ id, error, className, spanClassName, dataPlaceholder, ...rest }, ref) => {
    console.log(error);
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000, // Tempo em milissegundos que o toast ficará visível
        hideProgressBar: false, // Exibir barra de progresso
        closeOnClick: true, // Fechar ao clicar no toast
        pauseOnHover: true, // Pausar ao passar o mouse
      });
    }
    

    return (
      <Container>
        <input className={className} id={id} ref={ref} {...rest} />
        <span
          className={spanClassName}
          data-placeholder={dataPlaceholder}
        ></span>
      </Container>
    );
  }
);
