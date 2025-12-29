import { Link } from "react-router-dom";
import Card from "../../components/common/Card";

function ProfilePage() {
  return (
    <div className="page">
      <Card title="Thông tin cá nhân">
        <div className="profile-grid">
          <div className="profile-main">
            <div className="profile-avatar-large">NQ</div>
            <div className="profile-info">
              <h2>Ngô Thị Quế Anh</h2>
              <p>Vai trò: Quản lý</p>
            </div>
          </div>

          <div className="profile-fields">
            <div className="profile-row">
              <span className="profile-label">Mã người dùng</span>
              <span className="profile-value">0203568</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Tên đăng nhập</span>
              <span className="profile-value">queanhngo</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">queanhngo@nutmilk.com</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Số điện thoại</span>
              <span className="profile-value">0912345678</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Trạng thái</span>
              <span className="badge-success">Hoạt động</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/users/0203568/edit" className="primary-button">
            Chỉnh sửa thông tin
          </Link>
          <Link to="/change-password" className="secondary-button">
            Đổi mật khẩu
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;
