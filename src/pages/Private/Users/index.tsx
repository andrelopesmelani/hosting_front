import UserList from "@/components/Lists/UserList";
import Title from "@/components/Typography/Title";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { GET_ALL_USERS } from "@/utils/urlConfig";
import { ThreeDots } from "react-loader-spinner";
import './styles.scss'

export default function Users() {
  const {
    data: dataUsers,
    options: { isLoading, isFetching, refetch },
  } = REQUEST_SERVICE.GET<any>({
    url: GET_ALL_USERS,
    id: "dataUsers",
    config: {
      enabled: true,
      refetchOnWindowFocus: false,
    },
  });

  const filteredUsers =
    dataUsers?.length > 0 ? dataUsers.filter((user) => user.role === 0) : [];

  return (
    <div>
      <Title title="Users" subtitle="Manage your registered users" />
      {isLoading || isFetching ? (
        <div className="loading-list">
          <ThreeDots color="#1b59f8" />
        </div>
      ) : (
        <UserList users={filteredUsers} refetchList={refetch} />
      )}
    </div>
  );
}
