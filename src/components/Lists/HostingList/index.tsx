import HostingCard from "@/components/Cards/HostingCard";
import "./styles.scss";
import { useMemo, useState } from "react";
import { QueryObserverResult } from "react-query";
import EmptyState from "@/components/Empty";

interface HostingProps {
  id: number;
  name: string;
  plan: string;
  price: string;
  description: string[];
  created_at: string;
  status: string;
}

interface IHostingListProps {
  data: HostingProps[];
  refetchList?: Promise<QueryObserverResult<any, Error | null>>;
}

const HostingList = ({ data, refetchList }: IHostingListProps) => {
  const [selectedHosting, setSelectedHosting] = useState<HostingProps | null>(
    null
  );
  const hasHolding = useMemo(() => data.length > 0, [data]);

  const handleCardClick = (hosting: HostingProps) => {
    setSelectedHosting(hosting);
  };

  if (!data || !data.length) {
    return (
      <div style={{ marginTop: 100 }}>
        <EmptyState
          image="emptyFolder"
          title={"Oops! No data here."}
          description={
            "We do not have data for this search, please try searching again."
          }
        />
      </div>
    );
  }

  return (
    <>
      <div className="hosting-list">
        {hasHolding ? (
          data.map((item) => (
            <div
              key={item.id}
              className="hosting-list__card-wrapper"
              onClick={() => handleCardClick(item)}
            >
              <HostingCard data={item} refetchList={refetchList} />
            </div>
          ))
        ) : (
          <p className="no-users">No users found.</p>
        )}
      </div>
    </>
  );
};

export default HostingList;
