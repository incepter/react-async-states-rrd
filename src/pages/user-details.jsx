import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

export const UserDetails = ({ state: { data } }) => {
  const navigate = useNavigate();
  console.log("tt", data);
  return (
    <Modal
      onCancel={() => navigate("/users")}
      visible
      title={`User ${data.name} details`}
    >
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Modal>
  );
};

export function UsersDetailsFallback({ state }) {
  console.log("hh", state);
  if (state === "initial" || state === "pending") {
    return null;
  }
  return (
    <Modal visible title={`User ${state.props?.payload.id} details`}>
      {state === "initial" || state === "pending" ? "Loading..." : null}
      {state === "error" ? `Error occurred... ${state.data?.toString()}` : null}
      {state === "aborted" ? "You aborted" : null}
    </Modal>
  );
}

export const getUser = ({ payload: { id } }) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((r) =>
    r.json()
  );
