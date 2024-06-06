import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RegisterForm from "./componant/RegisterForm";
import LoginForm from "./componant/LoginForm";
import Antelope from "./componant/Antelope";
import Menu from "./componant/Menu";
import HomePage from "./componant/HomePage";
import { UserProvider } from "./componant/UserContext";
import AntelopeMyCollection from "./componant/AntelopeMyCollection";

export const App = () => (
  <ChakraProvider theme={theme}>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/my-collection" element={<AntelopeMyCollection/>} />
          <Route path="/all-collection" element={<Antelope />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </UserProvider>
  </ChakraProvider>
);
