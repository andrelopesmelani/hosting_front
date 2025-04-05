import "./styles.scss";
import { useEffect, useState } from "react";
import DetailTop from "@/assets/images/detail-top.png";
import DetailBottom from "@/assets/images/detail-bottom.png";
import InputText from "@/components/Inputs/InputText";
import Button from "@/components/Buttons/Button";
import REQUEST_SERVICE from "@/utils/requestConfig";
import { LOGIN } from "@/utils/urlConfig";
import { Link, useNavigate } from "react-router-dom";

interface IForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigate();

  const [login, setLogin] = useState<IForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>("");

  const {
    data,
    mutate,
    isSuccess,
    options: { isLoading, isError, error },
  } = REQUEST_SERVICE.POST({
    id: "login",
    url: LOGIN,
    queryToInvalidate: "login",
    body: login,
  });

  const handleChange = (name: string, value: string | number) => {
    setLogin({ ...login, [name]: value });
  };

  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem("auth", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user_id", data.id);
      if (data.role == 1) navigation("/hosting");
      else navigation("/plans")
    }
    if (isError && error) {
      setErrors(error?.response?.data.error);
    }
  }, [isError, error, isSuccess, data]);

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
            <p>Welcome back!</p>
          </div>
          <span className="subtitle">
            Enter your email address and password to access your company's
            platform,
          </span>

          <div className="container-input">
            {errors && <span className="error">{errors}</span>}
            <InputText
              label="Email"
              type="email"
              placeholder="Email"
              value={login.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            <InputText
              label="Password"
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          <div style={{ marginTop: 28 }}>
            <Button
              title="Sing in"
              onClick={() => mutate()}
              loading={isLoading}
              disabled={isLoading}
            />
          </div>

          <div className="footer">
            <p>
              Don&lsquo;t have an account?{" "}
              <Link to="/register" className="signup">
                Sign up
              </Link>
            </p>
            <span>© 2025 All Rights Reserved at HostPro.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
