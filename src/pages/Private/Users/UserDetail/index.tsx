import { useLocation, useNavigate } from "react-router-dom";
import { Users } from "@/types/user";
import "./styles.scss";
import Title from "@/components/Typography/Title";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { GET_ALL_USERS } from "@/utils/urlConfig";
import { ThreeDots } from "react-loader-spinner";
import UserDomainList from "@/components/Lists/UserDomainList";

export default function UserDetail() {
  const { state } = useLocation();
  const user = state as Users;

  if (!user) {
    return (
      <div className="user-detail-container error">Usuário não encontrado.</div>
    );
  }

  const {
    data: dataDomains,
    options: { isLoading, isFetching, refetch },
  } = REQUEST_SERVICE.GET<any>({
    url: `${GET_ALL_USERS}/${user.id}/domains`,
    id: "dataUsers",
    config: {
      enabled: true,
      refetchOnWindowFocus: false,
    },
  });

  return (
    <>
      <Title title="User Detail" subtitle="See the resume of user." back />
      <div className="user-detail-container">
        <div className="banner-container">
          <div className="banner">
            <div className="user-content">
              <div className="content">
                <label>Name</label>
                <span>{user.name}</span>
              </div>
              <div className="content">
                <label>Email</label>
                <span>{user.email}</span>
              </div>
              <div className="content">
                <label>Created at</label>
                <span>
                  {new Date(user.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
          <div className="avatar">{user.name.slice(0, 2).toUpperCase()}</div>
        </div>
        <div className="info-container">
          <div className="user-domains">
            <h3>Registered Domains</h3>
            {isLoading || isFetching ? (
              <div className="loading-dots">
                <ThreeDots color="#1b59f8" />
              </div>
            ) : (
              <UserDomainList domains={dataDomains} refetchList={refetch} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
