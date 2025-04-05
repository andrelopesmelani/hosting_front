import HostingCardsUser from "@/components/Cards/HostingCardsUser";
import "./styles.scss";
import { GET_ALL_USERS, GET_HOSTING } from "@/utils/urlConfig";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import UserDomainList from "@/components/Lists/UserDomainList";

const userId = localStorage.getItem("user_id")

export default function MyDomains() {
    const {
        data: dataDomains,
        options: { isLoading, isFetching, refetch },
      } = REQUEST_SERVICE.GET<any>({
        url: `${GET_ALL_USERS}/${userId}/domains`,
        id: "dataUsers",
        config: {
          enabled: true,
          refetchOnWindowFocus: false,
        },
      });
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
        <UserDomainList domains={dataDomains} refetchList={refetch} />
      )}
    </section>
  );
}
