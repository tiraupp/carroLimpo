import { forwardRef } from "react";
import { toast } from "react-toastify";
import { Container } from "./styles";

export const Input = forwardRef(
  (
    { id, error, className, spanClassName, dataPlaceholder, clearErrors, ...rest },
    ref
  ) => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      clearErrors(id);
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
