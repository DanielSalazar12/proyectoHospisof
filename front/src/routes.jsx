import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  HeartIcon,
  ClipboardIcon,
  UserIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import {
  Home,
  Medicamentos,
  Medicos,
  Diagnostico,
  Users,
  Tables,
  Citas,
} from "@/pages/dashboard"; //importamos los componentes de las paginas

import { SignIn, SignUp } from "@/pages/auth";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Usuarios",
        path: "/usuarios",
        element: <Users />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Pacientes",
        path: "/pacientes",
        element: <Tables />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Agenda de citas",
        path: "/citas",
        element: <Citas />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "diagnostico",
        path: "/diagnostico",
        element: <Diagnostico />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "medicamentos",
        path: "/medicamentos",
        element: <Medicamentos />,
      },
      {
        icon: <ClipboardDocumentIcon {...icon} />,
        name: "medicos",
        path: "/medicos",
        element: <Medicos />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
