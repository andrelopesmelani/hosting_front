import { CheckCheck } from "lucide-react";
import "./styles.scss";
import Button from "@/components/Buttons/Button";
import { useNavigate } from "react-router-dom";

const HostingCardsUser = ({ data }: any) => {
  const navigate = useNavigate();
  return (
    <div className="plans">
      {data.map((plan: any, idx: number) => {
        let parsedDescription: string[] = [];

        try {
          parsedDescription = Array.isArray(plan.description)
            ? plan.description
            : JSON.parse(plan.description);
        } catch (e) {
          console.error("Erro ao fazer parse da descrição:", e);
        }

        return (
          <div
            key={plan.id || idx}
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
            <Button
              title="Subscribe Now"
              onClick={() => navigate(`/sign-domain`, { state: plan })}
              
            />
          </div>
        );
      })}
    </div>
  );
};

export default HostingCardsUser;
