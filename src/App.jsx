import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./providers/AuthProvider";
import { RegisterProvider } from "./providers/RegisterProvider";
import { RoutesMain } from "./routes";
import { Global } from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <ToastContainer />
      <Global />
      <RegisterProvider>
        <AuthProvider>
          <RoutesMain />
        </AuthProvider>
      </RegisterProvider>
    </>
  );
}

export default App;
