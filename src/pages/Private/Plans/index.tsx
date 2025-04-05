import HostingCardsUser from "@/components/Cards/HostingCardsUser";
import "./styles.scss";
import { GET_HOSTING } from "@/utils/urlConfig";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Plans() {
  const [hostings, setHostings] = useState<any[]>([]);

  const {
    data: dataHosting,
    options: { isLoading, isFetching, refetch },
  } = REQUEST_SERVICE.GET<any>({
    url: GET_HOSTING,
    id: "dataHosting",
    config: {
      enabled: true,
      refetchOnWindowFocus: false,
    },
  });

  useEffect(() => {
    if (dataHosting) setHostings(dataHosting);
  }, [dataHosting]);

  const filteredUsers =
    dataHosting?.length > 0
      ? dataHosting.filter(
          (hosting: { status: string }) => hosting.status === "active"
        )
      : [];
  return (
    <section className="hosting-plans">
      <div className="hosting-container">
        <h1 className="title">Choose your hosting plan</h1>
        <p className="subtitle">
          Affordable plans with powerful features for all types of websites
        </p>
      </div>

      {isLoading || isFetching ? (
        <div className="loading-hosting">
          <ThreeDots color="#1b59f8" />
        </div>
      ) : (
        <HostingCardsUser data={filteredUsers} />
      )}
    </section>
  );
}
