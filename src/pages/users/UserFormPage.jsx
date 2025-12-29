import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";

function UserFormPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API create/update
    navigate("/users");
  };

  return (
    <div className="page narrow">
      <Card title={isEdit ? "Sửa thông tin người dùng" : "Thêm người dùng mới"}>
        <form className="form-two-columns" onSubmit={handleSubmit}>
          <label className="form-field">
            <span className="form-label">Mã người dùng *</span>
            <input className="form-input" defaultValue={isEdit ? id : ""} />
          </label>

          <label className="form-field">
            <span className="form-label">Họ và tên *</span>
            <input className="form-input" />
          </label>

          <label className="form-field">
            <span className="form-label">Tên đăng nhập *</span>
            <input className="form-input" />
          </label>

          <label className="form-field">
            <span className="form-label">Mật khẩu *</span>
            <input className="form-input" type="password" />
          </label>

          <label className="form-field">
            <span className="form-label">Vai trò *</span>
            <select className="form-input">
              <option>Nhân viên kho</option>
              <option>Quản lý</option>
            </select>
          </label>

          <label className="form-field">
            <span className="form-label">Email *</span>
            <input className="form-input" type="email" />
          </label>

          <label className="form-field">
            <span className="form-label">Số điện thoại *</span>
            <input className="form-input" />
          </label>

          <label className="form-field">
            <span className="form-label">Trạng thái *</span>
            <select className="form-input">
              <option>Hoạt động</option>
              <option>Ngừng hoạt động</option>
            </select>
          </label>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate(-1)}
            >
              Hủy
            </button>
            <button type="submit" className="primary-button">
              {isEdit ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default UserFormPage;
