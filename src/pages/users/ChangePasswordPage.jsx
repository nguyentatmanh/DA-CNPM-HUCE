import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";

function ChangePasswordPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API đổi mật khẩu
    navigate("/profile");
  };

  return (
    <div className="page narrow">
      <Card title="Đổi mật khẩu">
        <form className="form-vertical" onSubmit={handleSubmit}>
          <label className="form-field">
            <span className="form-label">Nhập mật khẩu cũ *</span>
            <input className="form-input" type="password" />
          </label>
          <label className="form-field">
            <span className="form-label">Nhập mật khẩu mới *</span>
            <input className="form-input" type="password" />
          </label>
          <label className="form-field">
            <span className="form-label">Xác nhận mật khẩu mới *</span>
            <input className="form-input" type="password" />
          </label>

          <p className="form-hint">
            Mật khẩu phải bao gồm tối thiểu 8 kí tự gồm Chữ hoa, Chữ thường và
            Kí tự đặc biệt.
          </p>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate(-1)}
            >
              Hủy
            </button>
            <button type="submit" className="primary-button">
              Cập nhật
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ChangePasswordPage;
