import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router";
import { authValidator } from "../validators/authValidator";
import { loginUser } from "../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = (values, { setErrors, setStatus }) => {
    loginUser(values)
      .then((response) => {
        dispatch(
          login({
            token: response.data.token,
            username: response.data.username,
          }),
        );
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrors({
            password: t("login.authError"),
          });
        } else {
          setStatus(t("toast.connectionError"));
        }
      });
  };

  return (
    <div
      className="container-fluid h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#eece8" }}
    >
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div
            className="card-header text-center py-3 border-0"
            style={{ backgroundColor: "#344e41" }}
          >
            <h1 className="h4 m-0 fw-bold" style={{ color: "#EDEDE8" }}>
              {t("login.title")}
            </h1>
          </div>

          <div className="card-body p-4" style={{ backgroundColor: "#EDEDE8" }}>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={authValidator}
              onSubmit={handleSubmit}
            >
              {({ status, errors, touched }) => (
                <Form>
                  {status && (
                    <div className="alert alert-danger py-2 small mb-3 shadow-sm text-center">
                      {status}
                    </div>
                  )}

                  <div className="mb-3">
                    <label
                      htmlFor="username"
                      className="form-label fw-semibold"
                      style={{ color: "#344e41" }}
                    >
                      {t("login.username")}
                    </label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      className={`form-control rounded-3 border-0 shadow-sm ${touched.username && errors.username ? "is-invalid" : ""}`}
                    />
                    <ErrorMessage
                      name="username"
                      render={(msg) => (
                        <div className="text-danger small mt-1">{t(msg)}</div>
                      )}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                      style={{ color: "#344e41" }}
                    >
                      {t("login.password")}
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className={`form-control rounded-3 border-0 shadow-sm ${touched.password && errors.password ? "is-invalid" : ""}`}
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <div className="text-danger small mt-1">{t(msg)}</div>
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 py-2 fw-bold rounded-3 border-0 shadow-sm"
                    style={{ backgroundColor: "#344e41", color: "#EDEDE8" }}
                  >
                    {t("login.submit")}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div
            className="card-footer text-center py-3 border-0"
            style={{ backgroundColor: "#EDEDE8" }}
          >
            <span className="text-muted small me-1">
              {t("login.accountQuestion")}
            </span>
            <Link
              to="/signup"
              className="fw-bold text-decoration-none"
              style={{ color: "#344e41" }}
            >
              {t("login.signup")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
