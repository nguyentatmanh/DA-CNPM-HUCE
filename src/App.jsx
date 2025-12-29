import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UserListPage from "./pages/users/UserListPage";
import UserFormPage from "./pages/users/UserFormPage";
import ChangePasswordPage from "./pages/users/ChangePasswordPage";
import ExportPage from "./pages/warehouse/ExportPage";
import ImportPage from "./pages/warehouse/ImportPage";
import InventoryPage from "./pages/warehouse/InventoryPage";
import MaterialsPage from "./pages/materials/MaterialsPage";
import SuppliersPage from "./pages/suppliers/SuppliersPage";

function App() {
  // Sau này có thể check token, nếu chưa login thì redirect về /login
  const isAuthenticated = true; // tạm thời hard-code

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Các route bên trong layout chính */}
      <Route
        path="/"
        element={
          isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="users" element={<UserListPage />} />
        <Route path="users/new" element={<UserFormPage mode="create" />} />
        <Route path="users/:id/edit" element={<UserFormPage mode="edit" />} />
        <Route path="change-password" element={<ChangePasswordPage />} />

        {/* Module kho */}
        <Route path="export" element={<ExportPage />} />
        <Route path="import" element={<ImportPage />} />
        <Route path="inventory" element={<InventoryPage />} />

        {/* Nguyên liệu & Nhà cung cấp */}
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
