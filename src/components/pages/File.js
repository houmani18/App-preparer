import { createBrowserRouter } from "react-router-dom";
import Accueil from "./Accueil";  // Mettez à jour le chemin ici
import LayoutUtilisateur from "./Layout/LayoutUtilisateur";
import LayoutFormateur from "./layout/LayoutFormateur";
import Layout from "./layout/Layout";
import Formateur from "./components/formateur/Formateur";
import Login from "./components/authen/Login";
import File from './pages/File';  // Assurez-vous que le chemin est correct ici
import HomeFormateur from "./components/formateur/HomeFormateur";
import Inscription from "./components/Home/Inscription";

export const Reda = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <LayoutUtilisateur />,
    children: [
      {
        path: "/Utilisateur/Util",
        element: <Accueil />,
      },
      {
        path: "/users/profile",
        element: <File />,
      },
      {
        path: '/inscription/:id',
        element: <Inscription />,
      },
    ],
  },
  {
    element: <LayoutFormateur />,
    children: [
      {
        path: "/formateur/home",
        element: <HomeFormateur />,
      },
      {
        path: "/formateur/ajouter",
        element: <Formateur />,
      },
    ],
  },
]);
