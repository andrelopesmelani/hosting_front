import { useEffect, useMemo, useState } from "react";

import "./styles.scss";
import { Domains } from "@/types/user";
import { Trash } from "lucide-react";
import { GET_ALL_DOMAINS, GET_ALL_USERS } from "@/utils/urlConfig";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { QueryObserverResult } from "react-query";
import EmptyState from "@/components/Empty";

interface UserDomainListProps {
  domains: Domains[];
  refetchList?: Promise<QueryObserverResult<any, Error | null>>;
}

export default function UserDomainList({
  domains,
  refetchList,
}: UserDomainListProps) {
  const hasDomains = useMemo(() => domains.length > 0, [domains]);

  const [url, setUrl] = useState(`${GET_ALL_DOMAINS}`);

  const [id, setId] = useState<number | null>(null);

  const {
    mutate: deleteUser,
    isSuccess: isSuccessDelete,
    options: { isLoading: isLoadingDelete },
  } = REQUEST_SERVICE.DELETE({
    id: "deleteUser",
    url: url,
    queryToInvalidate: "deleteUser",
  });

  if (!domains || !domains.length) {
    return (
      <div style={{ marginBottom: 50 }}>
        <EmptyState
          image="search"
          title={"Oops! No data here."}
          description={
            "We do not have data for this search, please try searching again."
          }
        />
      </div>
    );
  }

  const handleDelete = (domainId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this domain?"
    );
    if (!confirmDelete) return;
    setId(domainId);

    setUrl(`${GET_ALL_DOMAINS}/${domainId}`);
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
      {hasDomains ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Domain</th>
              <th>Expiration Date</th>
              <th>Created At</th>
              <th>Status</th>
              <th style={{ display: "flex", justifyContent: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {domains.map((domain, index) => (
              <tr key={domain.id} className={index % 2 === 0 ? "even" : "odd"}>
                <td>{domain.id}</td>
                <td>{domain.domain_name}</td>
                <td>
                  {new Date(domain.expiration_date).toLocaleDateString("pt-BR")}
                </td>
                <td>
                  {new Date(domain.created_at).toLocaleDateString("pt-BR")}
                </td>
                <td>
                  {" "}
                  <span className={`status ${domain.status}`}>
                    {domain.status}
                  </span>
                </td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  <div className="actions">
                    <div
                      className="trash"
                      onClick={() => handleDelete(domain.id)}
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
        <p className="no-domains">No domains found.</p>
      )}
    </div>
  );
}
