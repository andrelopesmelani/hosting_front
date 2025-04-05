import { ReactNode } from "react";
import "./styles.scss";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ITitle {
  title: string;
  subtitle?: string;
  button?: ReactNode;
  back?: boolean
}

const Title = ({ title, subtitle, button, back }: ITitle) => {
  const navigate = useNavigate()
  return (
    <div className="title-container">
      <div style={{display: 'flex', alignItems: 'start', gap: 20}}>
       {back && <ArrowLeftIcon style={{marginTop: 20, cursor: 'pointer'}} onClick={() => navigate(-1)} />}
        <div className="right-container">
          <span className="title">{title}</span>
          <span className="subtitle">{subtitle}</span>
        </div>
      </div>

      {button}
    </div>
  );
};

export default Title;
