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
        <input
          className="search-input"
          placeholder="Tìm kiếm..."
          type="text"
        />
      </div>

      <div className="app-header-right">
        <Link to="/profile" className="user-chip">
          <div className="user-avatar">NQ</div>
          <div className="user-info">
            <div className="user-id">0203568</div>
            <div className="user-name">Ngô Thị Quế Anh</div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
