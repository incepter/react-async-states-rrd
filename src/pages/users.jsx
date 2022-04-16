import { Outlet, Link } from "react-router-dom";

export const UsersList = ({ state: { data } }) => (
  <>
    <ul>
      {data.map((t) => (
        <li key={t.id}>
          <Link to={`${t.id}`}>{t.name}</Link>
        </li>
      ))}
    </ul>
    <br />
    <Outlet />
  </>
);

export function UsersFallback({ state }) {
  switch (state.status) {
    case "pending":
      return <span>loading...</span>;
    case "error":
      return <span>Error occured: {state.data?.toString()}</span>;
    case "aborted":
      return <span>You aborted the request</span>;
    default:
      return null;
  }
}

export const getUsers = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json());
