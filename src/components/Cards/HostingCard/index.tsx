import { Calendar, DollarSign, Layers, Plus, Trash } from "lucide-react";
import "./styles.scss";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import InputText from "@/components/Inputs/InputText";
import InputSelect from "@/components/Inputs/InputSelect";
import Button from "@/components/Buttons/Button";
import { GET_HOSTING } from "@/utils/urlConfig";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { QueryObserverResult } from "react-query";
import { optionsStatus } from "@/constants/data";

interface HostingProps {
  id: number;
  name: string;
  plan: string;
  price: string;
  description: string[];
  created_at: string;
  status: string;
}

interface IHostingData {
  data: HostingProps;
    refetchList?: Promise<QueryObserverResult<any, Error | null>>;
}

interface IForm {
  name: string;
  plan: string;
  price: string;
  description: string[];
  status: string;
}

const HostingCard = ({ data, refetchList }: IHostingData) => {
  if (!data) return null;
  let parsedDescription: string[] = [];

  try {
    parsedDescription = JSON.parse(data?.description || "[]");
  } catch (error) {
    console.warn("Erro ao fazer parse da descrição:", data?.description, error);
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [hosting, setHosting] = useState<IForm>({
    name: data.name,
    price: data.price,
    plan: data.plan,
    status: data.status,
    description: Array.isArray(parsedDescription) ? parsedDescription : [],
  });

  const [newDescription, setNewDescription] = useState("");

  const {
    mutate,
    isSuccess,
    options: { isLoading, isError, error },
  } = REQUEST_SERVICE.PUT({
    id: "dataHosting",
    url: `${GET_HOSTING}/${data.id}`,
    queryToInvalidate: "dataHosting",
    body: hosting,
  });

  const {
    mutate: mutateDelete,
    isSuccess: isSuccessDelete,
    options: { isLoading: isLoadingDelete},
  } = REQUEST_SERVICE.DELETE({
    id: 'deleteHosting',
    url: `${GET_HOSTING}/${data.id}`,
    queryToInvalidate: 'deleteHosting',
  });

  const handleChange = (name: string, value: string | number) => {
    setHosting({ ...hosting, [name]: value });
  };

  const handleAddDescription = () => {
    if (newDescription.trim() === "") return;
    setHosting((prev) => ({
      ...prev,
      description: [...prev.description, newDescription.trim()],
    }));
    setNewDescription("");
  };

  const handleRemoveDescription = (index: number) => {
    setHosting((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddDescription();
    }
  };

  useEffect(() => {
    if (isSuccess) setIsOpen(false);
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDelete) {
      setIsOpen(false)
      refetchList()
    };
  }, [isSuccessDelete]);

  return (
    <>
      <div className="hosting-card" onClick={() => setIsOpen(true)}>
        <div className="hosting-card__header">
          <h2>{data.name}</h2>
          <span className={`hosting-card__status ${data?.status}`}>
            {data?.status}
          </span>
        </div>

        <div className="hosting-card__info">
          <p className="icon-text">
            <Layers size={16} /> Plan: <strong>{data?.plan}</strong>
          </p>
          <p className="icon-text">
            <DollarSign size={16} /> Price: <strong>$ {data?.price}</strong>
          </p>
          <p className="icon-text">
            <Calendar size={16} /> Created at:{" "}
            <strong>
              {new Date(data?.created_at).toLocaleDateString("pt-BR")}
            </strong>
          </p>
        </div>

        <ul className="hosting-card__description">
          {parsedDescription.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isOpen} title="Edit Host" onClose={() => setIsOpen(false)}>
        <div className="modal-container">
          <InputText
            label="Name"
            placeholder="Name"
            value={hosting.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <InputText
            label="Plan"
            placeholder="Plan"
            value={hosting.plan}
            onChange={(e) => handleChange("plan", e.target.value)}
          />

          <InputText
            label="Price"
            placeholder="Price"
            value={hosting.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />

          <InputSelect
            label="Status"
            value={hosting.status}
            options={optionsStatus}
            onChange={(value) => handleChange("status", value)}
          />



          <div className="description-section">
            <h3>Descriptions</h3>
            <ul className="description-list">
              {hosting.description.map((desc, index) => (
                <li key={index}>
                  {desc}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveDescription(index)}
                  >
                    <Trash size={14} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="description-input">
              <InputText
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add new description..."
              />
              <button onClick={handleAddDescription}>
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={() => mutate()}
            title="Save"
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={() => mutateDelete()}
            title="Delete"
            loading={isLoadingDelete}
            disabled={isLoadingDelete}
            danger
          />
        </div>
      </Modal>
    </>
  );
};

export default HostingCard;
