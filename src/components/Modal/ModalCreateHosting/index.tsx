import Button from "@/components/Buttons/Button";
import InputSelect from "@/components/Inputs/InputSelect";
import InputText from "@/components/Inputs/InputText";
import Modal from "@/components/Modal";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { GET_HOSTING } from "@/utils/urlConfig";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { QueryObserverResult } from "react-query";

interface IModalCreate{
    open: boolean;
    setOpen: (open: boolean) => void
    refetchList?: Promise<QueryObserverResult<any, Error | null>>
}

interface IForm {
  name: string;
  plan: string;
  price: string;
  description: string[];
  status: string;
}

const optionsStatus = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const ModalCreateHosting = ({open, setOpen, refetchList}: IModalCreate) => {

  const [hosting, setHosting] = useState<IForm>({
    name: "",
    price: "",
    plan: "",
    status: "",
    description: [],
  });

  const [newDescription, setNewDescription] = useState("");

  const {
    data,
    mutate,
    isSuccess,
    options: { isLoading, isError, error },
  } = REQUEST_SERVICE.POST({
    id: "createHosting",
    url: `${GET_HOSTING}/create`,
    queryToInvalidate: "createHosting",
    body: hosting,
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
    if (isSuccess) {
        setOpen(false)
        refetchList()
    };
  }, [isSuccess]);

  return (
    <Modal isOpen={open} title="Create Host" onClose={() => setOpen(false)}>
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
          title="Create"
          loading={isLoading}
          disabled={isLoading}
        />
      </div>
    </Modal>
  );
};

export default ModalCreateHosting;
