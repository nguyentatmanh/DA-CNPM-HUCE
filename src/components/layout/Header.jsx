import { Link } from "react-router-dom";
import LogoNutMilk from "../../assets/icons/NutMilk.png"; // logo NutMilk

function Header({ onMenuClick }) {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <button className="icon-button" onClick={onMenuClick}>
          ☰
        </button>

        <Link to="/" className="app-logo">
          {/* Logo NutMilk thay cho chữ NM */}
          <img
            src={LogoNutMilk}
            alt="NutMilk"
            className="app-logo-img"
          />

          <div className="app-logo-text">
            <span className="app-logo-title">NutMilk - Quản lý kho</span>
            <span className="app-logo-subtitle">Năm 2025</span>
          </div>
        </Link>
      </div>

      <div className="app-header-center">
        <div className="search-field">
          <span className="search-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </span>
          <input
            className="search-input"
            placeholder="Tìm kiếm..."
            type="text"
          />
        </div>
      </div>

      <div className="app-header-right">
        <button className="notification-button" aria-label="Thông báo">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notification-badge" aria-hidden="true" />
        </button>
        <Link to="/profile" className="user-chip">
          <div className="user-avatar" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20a8 8 0 0 1 16 0" />
            </svg>
          </div>
          <div className="user-info">
            <div className="user-name">0203568 - Ngô Thị Quế Anh</div>
            <div className="user-role">Quản lý</div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
