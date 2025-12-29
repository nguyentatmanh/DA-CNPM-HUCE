import { Link } from "react-router-dom";
import Card from "../../components/common/Card";

function DashboardPage() {
  return (
    <div className="dashboard-grid">
      {/* Cột trái: Thông báo */}
      <div className="dashboard-left">
        <Card title="Thông báo">
          <ul className="list">
            <li className="list-item">
              <div className="list-item-meta">
                <span className="list-item-label">Từ Nhà cung cấp</span>
              </div>
              <p className="list-item-text">
                Điều chỉnh thời gian giao hàng (NCC Sữa tươi)...
              </p>
            </li>
            <li className="list-item">
              <div className="list-item-meta">
                <span className="list-item-label">Từ Quản lý</span>
              </div>
              <p className="list-item-text">
                Thay đổi hạn sử dụng với các loại hạt đã mở gói...
              </p>
            </li>
          </ul>
        </Card>

        {/* Hàng nhập / xuất hôm nay */}
        <Card title="Hàng nhập/xuất hôm nay" className="mt-24">
          <ul className="timeline">
            <li>
              <span className="timeline-time">08:30</span>
              <span className="timeline-badge in">Nhập</span>
              <span className="timeline-text">Hạt điều nguyên liệu - 300kg</span>
            </li>
            <li>
              <span className="timeline-time">09:15</span>
              <span className="timeline-badge out">Xuất</span>
              <span className="timeline-text">Sữa tươi Vinamilk - 10 hộp</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Cột giữa: Ngắn hạn sử dụng + Nguyên liệu mới */}
      <div className="dashboard-middle">
        <Card title="Hàng sắp hết hạn" className="accent-card">
          <ul className="list">
            <li className="list-item">
              <div>Hạt điều Bình Phước lô #A234</div>
              <div className="badge-warning">Còn 3 ngày</div>
            </li>
            <li className="list-item">
              <div>Hạt hạnh nhân Mỹ lô #B567</div>
              <div className="badge-warning">Còn 4 ngày</div>
            </li>
          </ul>
        </Card>

        <Card title="Nguyên liệu mới" className="mt-24">
          <ul className="list">
            <li className="list-item">V112 - Hộp nhựa vuông (ĐVT: Hộp)</li>
            <li className="list-item">D134 - Đường ăn kiêng (ĐVT: Kg)</li>
          </ul>
        </Card>
      </div>

      {/* Cột phải: Quick actions */}
      <div className="dashboard-right">
        <div className="quick-actions-grid">
          <Link to="/profile" className="quick-action-tile">
            <div className="quick-action-icon">👤</div>
            <div className="quick-action-label">Quản lý</div>
          </Link>

          <Link to="/materials" className="quick-action-tile">
            <div className="quick-action-icon">📦</div>
            <div className="quick-action-label">Nguyên liệu</div>
          </Link>

          <Link to="/suppliers" className="quick-action-tile">
            <div className="quick-action-icon">🏭</div>
            <div className="quick-action-label">Nhà cung cấp</div>
          </Link>

          <Link to="/export" className="quick-action-tile">
            <div className="quick-action-icon">⬆</div>
            <div className="quick-action-label">Xuất hàng</div>
          </Link>

          <Link to="/import" className="quick-action-tile">
            <div className="quick-action-icon">⬇</div>
            <div className="quick-action-label">Nhập hàng</div>
          </Link>

          <Link to="/inventory" className="quick-action-tile">
            <div className="quick-action-icon">📋</div>
            <div className="quick-action-label">Kiểm kê</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
