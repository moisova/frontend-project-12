import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useTranslation } from "react-i18next";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <nav
      className="navbar navbar-expand border-bottom shadow-sm px-4 d-flex justify-content-between align-items-center"
      style={{ backgroundColor: "#a3b18a" }}
    >
      <Link
        to="/"
        className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-1 text-decoration-none"
        style={{ color: "#eeece8" }}
      >
        Hexlet Chat
      </Link>
      {isAuthenticated && (
        <button
          type="button"
          className="btn btn-outline-dark btn-sm rounded-pill px-3 shadow-sm fw-semibold"
          style={{ borderColor: "#344e41", color: "#344e41" }}
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          {t("chat.logout")}
        </button>
      )}
    </nav>
  );
};

export default Header;
