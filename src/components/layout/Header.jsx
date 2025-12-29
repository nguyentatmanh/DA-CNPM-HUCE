import { Link } from "react-router-dom";
import LogoNutMilk from "../../assets/icons/NutMilk.png";

function Header({ onMenuClick }) {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <button
          className="icon-button menu-button"
          type="button"
          onClick={onMenuClick}
          aria-label="Mở/đóng menu"
        >
          ☰
        </button>

        <Link to="/" className="app-logo" aria-label="Trang chủ">
          <img src={LogoNutMilk} alt="NutMilk" className="app-logo-img" />

          <div className="app-logo-text">
            <span className="app-logo-title">NutMilk - Quản lý kho</span>
            <span className="app-logo-subtitle">Năm 2025</span>
          </div>
        </Link>
      </div>

      <div className="app-header-center">
        <div className="search-wrapper">
          <span className="search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <path
                d="M11 4a7 7 0 015.6 11.2l3.1 3.1-1.4 1.4-3.1-3.1A7 7 0 1111 4zm0 2a5 5 0 100 10 5 5 0 000-10z"
                fill="currentColor"
              />
            </svg>
          </span>

          <input className="search-input" placeholder="Tìm kiếm..." type="text" />
        </div>
      </div>

      <div className="app-header-right">
        <button className="notification-button" type="button" aria-label="Thông báo">
          <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
            <path
              d="M12 3a6 6 0 00-6 6v3.2l-1.6 2.7a1 1 0 00.9 1.5h13.4a1 1 0 00.9-1.5L18 12.2V9a6 6 0 00-6-6zm0 18a2.5 2.5 0 002.3-1.5H9.7A2.5 2.5 0 0012 21z"
              fill="currentColor"
            />
          </svg>
          <span className="notification-badge">0</span>
        </button>

        <Link to="/profile" className="user-chip">
          <div className="user-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <path
                d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="user-info">
            <div className="user-id">0203568 - Ngô Thị Quế Anh</div>
            <div className="user-name">Quản lý</div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
