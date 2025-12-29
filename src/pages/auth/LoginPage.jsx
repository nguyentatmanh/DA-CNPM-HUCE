import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API login, lưu token...
    navigate("/", { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Chào mừng trở lại!</h1>
        <p className="auth-subtitle">Vui lòng đăng nhập để tiếp tục</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span className="form-label">Mã nhân viên</span>
            <input className="form-input" type="text" />
          </label>

          <label className="form-field">
            <span className="form-label">Mật khẩu</span>
            <input className="form-input" type="password" />
          </label>

          <button type="submit" className="primary-button full-width">
            Đăng nhập
          </button>

          <button
            type="button"
            className="text-button"
            onClick={() => alert("TODO: Quên mật khẩu")}
          >
            Quên mật khẩu?
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
