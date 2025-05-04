import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  HeartIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";

import {
  Home,
  Profile,
  Medicamentos,
  Medicos,
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
        icon: <UserCircleIcon {...icon} />,
        name: "diagnostico",
        path: "/diagnostico",
        element: <Profile />,
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
