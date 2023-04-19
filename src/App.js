import Rotas from "./route";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./assets/styles/globalStyle";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Rotas />
      </Router>
    </AuthProvider>
  );
}

export default App;
