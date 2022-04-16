import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Demo";
import "./styles.css";
import "antd/dist/antd.css";
import { getUsers, UsersFallback, UsersList } from "./pages/users";
import {
  getUser,
  UserDetails,
  UsersDetailsFallback
} from "./pages/user-details";

export default function App() {
  return (
    <Router>
      <Routes routes={routesProp} />
    </Router>
  );
}

let routesProp = [
  {
    path: "users",
    routeProps: { exact: true }, // <Route from react-router-dom

    render: UsersList,
    fallback: UsersFallback,

    producer: getUsers,
    nestedRoutes: [
      {
        path: ":id",
        render: UserDetails,
        routeProps: { exact: true },
        fallback: UsersDetailsFallback,
        getDeps: (params) => [params.id],
        getPayload: (params) => ({
          id: params.id
        }),
        producer: getUser
      }
    ]
  }
];
