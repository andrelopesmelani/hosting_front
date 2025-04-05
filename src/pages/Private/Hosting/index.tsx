import Button from "@/components/Buttons/Button";
import HostingList from "@/components/Lists/HostingList";
import ModalCreateHosting from "@/components/Modal/ModalCreateHosting";
import Title from "@/components/Typography/Title";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { GET_HOSTING } from "@/utils/urlConfig";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Hosting() {
  const [hostings, setHostings] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    if (dataHosting) setHostings(hostings);
  }, [hostings]);
  return (
    <div>
      <Title
        title="Hostings"
        subtitle="Manage your registered hostings"
        button={
          <div style={{ width: 200 }}>
            <Button title="Add Hosting" onClick={() => setIsModalOpen(true)} />
          </div>
        }
      />

      {isLoading || isFetching ? (
        <div className="loading-list">
          <ThreeDots color="#1b59f8" />
        </div>
      ) : (
        <HostingList data={dataHosting} refetchList={refetch} />
      )}

      <ModalCreateHosting
        open={isModalOpen}
        setOpen={setIsModalOpen}
        refetchList={refetch}
      />
    </div>
  );
}
