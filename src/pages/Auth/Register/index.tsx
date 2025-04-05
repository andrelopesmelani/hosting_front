import { useEffect, useState } from "react";
import DetailTop from "@/assets/images/detail-top.png";
import DetailBottom from "@/assets/images/detail-bottom.png";
import "./styles.scss";
import InputText from "@/components/Inputs/InputText";
import Button from "@/components/Buttons/Button";
import InputSelect from "@/components/Inputs/InputSelect";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { REGISTER } from "@/utils/urlConfig";
import { Link } from 'react-router-dom';
import { positions } from "@/constants/data";

interface IForm {
  name: string;
  email: string;
  password: string;
  role: number;
}

const Register = () => {
  const [register, setRegister] = useState<IForm>({
    name: "",
    email: "",
    password: "",
    role: 0,
  });

  const [errors, setErrors] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const {
    data,
    mutate,
    isSuccess,
    options: {isLoading, isError, error },
  } = REQUEST_SERVICE.POST({
    id: "createUser",
    url: REGISTER,
    queryToInvalidate: "createUser",
    body: register,
  });

  const handleChange = (name: string, value: string | number) => {
    setRegister({ ...register, [name]: value });
  };

  useEffect(() => {
    if (isSuccess) {
      setErrors({
        name: "",
        email: "",
        password: "",
      });
      setRegister({
        name: "",
        email: "",
        password: "",
        role: 0,
      });
    }
    if (isError && error) {
      setErrors(error?.response?.data.errors);
    }
  }, [isError, error, isSuccess]);

  useEffect(() => {
    if (!data) return;
  }, [data]);

  return (
    <div className="container">
      <div className="login">
        <img src={DetailTop} className="detail-top" alt="" />
        <img src={DetailBottom} className="detail-bottom" alt="" />
        <div className="content">
          <div className="title">
            <p>Sing up!</p>
          </div>
          <span className="subtitle">
            Fill in the required fields to create your account and access your
            Hosting platform.
          </span>

          <div className="container-input">
            <InputText
              label="Name"
              placeholder="Name"
              value={register.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />
            <InputText
              label="Email"
              placeholder="Email"
              value={register.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />

            <InputText
              label="Password"
              type="password"
              placeholder="Password"
              value={register.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />

            <InputSelect
              label="Position"
              value={register.role}
              options={positions}
              onChange={(value) => handleChange("role", value)}
            />
          </div>
          <div style={{ marginTop: 28 }}>
            <Button
              title="Sing up"
              onClick={() => mutate()}
              loading={isLoading}
              disabled={isLoading}
            />
          </div>

          <div className="footer">
            <p>
              Already have an account?{" "}
              <Link to="/" className="signup">
                Sing in
              </Link>
            </p>
            <span>© 2025 All Rights Reserved at HostPro.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
