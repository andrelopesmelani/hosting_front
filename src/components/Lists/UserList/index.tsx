import { useEffect, useMemo, useState } from "react";

import "./styles.scss";
import { Users } from "@/types/user";
import { Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_USERS } from "@/utils/urlConfig";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { QueryObserverResult } from "react-query";
import EmptyState from "@/components/Empty";

interface UserListProps {
  users: Users[];
  refetchList?: Promise<QueryObserverResult<any, Error | null>>;
}

export default function UserList({ users, refetchList }: UserListProps) {
  const hasUsers = useMemo(() => users.length > 0, [users]);

  const [url, setUrl] = useState(`${GET_ALL_USERS}`);

  const [id, setId] = useState<number | null>(null);

  const navigate = useNavigate();

  const {
    mutate: deleteUser,
    isSuccess: isSuccessDelete,
    options: { isLoading: isLoadingDelete },
  } = REQUEST_SERVICE.DELETE({
    id: "deleteUser",
    url: url,
    queryToInvalidate: "deleteUser",
  });

    if (!users || !users.length) {
      return (
        <div style={{marginTop: 200}}>
          <EmptyState
            image="group"
            title={"Oops! No data here."}
            description={
              "We do not have data for this search, please try searching again."
            }/>

        </div>
        
      );
    }

  const handleDelete = (userId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    setId(userId);

    setUrl(`${GET_ALL_USERS}/${userId}`);
  };

  useEffect(() => {
    if (!id) return;
    deleteUser();
  }, [url, id]);

  useEffect(() => {
    if (isSuccessDelete) refetchList();
  }, [isSuccessDelete]);

  return (
    <div className="user-list-container">
      {hasUsers ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th style={{ display: "flex", justifyContent: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "even" : "odd"}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleDateString("pt-BR")}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  <div className="actions">
                    <div
                      className="eye"
                      onClick={() =>
                        navigate(`/users/${user.id}`, { state: user })
                      }
                    >
                      <Eye size={18} />
                    </div>
                    <div
                      className="trash"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash size={18} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-users">No users found.</p>
      )}
    </div>
  );
}
