import { Hosting } from "@/types/user";
import { CheckCheck } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import InputText from "@/components/Inputs/InputText";
import InputSelect from "@/components/Inputs/InputSelect";
import { optionsStatus } from "@/constants/data";
import { useEffect, useState } from "react";
import YearSelector from "@/components/Inputs/YearSelector";
import Button from "@/components/Buttons/Button";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { POST_DOMAINS } from "@/utils/urlConfig";

interface IForm {
  domainName: string;
  status: string;
  experitionDate: string;
  displayDate: string;
  selectedYear?: number;
}

const userId = localStorage.getItem("user_id");

export default function SignDomain() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const plan = state as Hosting;

  let parsedDescription: string[] = [];

  try {
    parsedDescription = Array.isArray(plan.description)
      ? plan.description
      : JSON.parse(plan.description);
  } catch (e) {
    console.error(e);
  }

  const [domain, setDomain] = useState<IForm>({
    domainName: "",
    status: "active",
    experitionDate: "",
    displayDate: "",
  });

  const [errors, setErrors] = useState<any>({
    domain_name: "",
    status: "",
    experition_date: "",
  });

  const {
    mutate,
    isSuccess,
    options: { isLoading, isError, error },
  } = REQUEST_SERVICE.POST({
    id: "createDomain",
    url: `${POST_DOMAINS}`,
    queryToInvalidate: "createDomain",
    body: {
      domain_name: domain.domainName,
      hosting_id: plan.id,
      user_id: userId,
      expiration_date: domain.experitionDate,
      status: domain.status,
    },
  });

  const handleChange = (name: string, value: string | number) => {
    setDomain({ ...domain, [name]: value });
  };

  useEffect(() => {
    if (isSuccess) {
      setErrors({
        domain_name: "",
        status: "",
        experition_date: "",
      });
      setDomain({
        domainName: "",
        status: "",
        experitionDate: "",
        displayDate: "",
      });
      navigate("/my-domains");
    }
    if (isError && error) {
      setErrors(error?.response?.data.errors);
    }
  }, [isError, error, isSuccess]);

  return (
    <section className="hosting-plans">
      <div className="hosting-container">
        <h1 className="title">Choose your hosting plan</h1>
        <p className="subtitle">
          Affordable plans with powerful features for all types of websites
        </p>
      </div>

      <div className="sign-container">
        <div className="form-container">
          <InputText
            label="Domain"
            placeholder="Domain"
            value={domain.domainName}
            onChange={(e) => handleChange("domainName", e.target.value)}
            error={errors.domain_name}
          />

          <YearSelector
            selectedYear={domain.selectedYear || null}
            label="Select how many years of plan"
            onSelect={(display, value, years) =>
              setDomain({
                ...domain,
                experitionDate: value,
                displayDate: display,
                selectedYear: years,
              })
            }
          />

          <InputText
            label="Plan Expiration"
            placeholder=""
            value={domain.displayDate}
            disabled
            error={errors.expiration_date}
  
          />

          <InputSelect
            label="Status"
            value={domain.status}
            options={optionsStatus}
            onChange={(value) => handleChange("status", value)}
          />
          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignSelf: "end",
              width: "30%",
            }}
          >
            <Button
              title="Sign"
              onClick={() => mutate()}
              loading={isLoading}
              disabled={isLoading}
            />
          </div>
        </div>

        <div
          key={plan.id}
          className={`plan-card ${plan.status === "active" ? "popular" : ""}`}
        >
          {plan.status === "active" && (
            <span className="badge">{plan.plan}</span>
          )}
          <div>
            <h2>{plan.name}</h2>
            <p className="price">${plan.price} / month</p>
          </div>

          <ul>
            {parsedDescription.map((feature, i) => (
              <li key={i}>
                <CheckCheck /> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
