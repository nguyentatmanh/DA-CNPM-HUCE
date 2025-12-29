// src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

// logo/menu icons
import IconHome from "../../assets/icons/logotrangchu.png";
import IconProfile from "../../assets/icons/quanly.png";
import IconUserMgmt from "../../assets/icons/quanlynguoidung.png";
import IconNguyenLieu from "../../assets/icons/nguyenlieu.png";
import IconNhaCungCap from "../../assets/icons/nhacungcap.png";
import IconNhapHang from "../../assets/icons/nhaphang.png";
import IconXuatHang from "../../assets/icons/xuathang.png";
import IconKiemKe from "../../assets/icons/kiemke.png";

const NAV_ITEMS = [
  { label: "Trang chủ", path: "/", icon: IconHome },
  { label: "Thông tin cá nhân", path: "/profile", icon: IconProfile },
  { label: "Quản lý người dùng", path: "/users", icon: IconUserMgmt },
  { label: "Xuất kho", path: "/export", icon: IconXuatHang },
  { label: "Nhập kho", path: "/import", icon: IconNhapHang },
  { label: "Nguyên vật liệu", path: "/materials", icon: IconNguyenLieu },
  { label: "Nhà cung cấp", path: "/suppliers", icon: IconNhaCungCap },
  { label: "Kiểm kê", path: "/inventory", icon: IconKiemKe },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* overlay cho mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                "sidebar-item" + (isActive ? " sidebar-item-active" : "")
              }
              onClick={onClose}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.label}
                  className={
                    "sidebar-item-icon" +
                    (item.path === "/inventory" ? " sidebar-item-icon-lg" : "")
                  }
                />
              )}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
