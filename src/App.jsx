import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./providers/AuthProvider";
import { RoutesMain } from "./routes";
import { Global } from "./styles/GlobalStyle";


function App() {
  return (
    <>

      <ToastContainer />
      <Global />
      <AuthProvider>
        <RoutesMain />
      </AuthProvider>
    </>
  );
}

export default App;
