import { Link } from "react-router-dom";
import Card from "../../components/common/Card";

function UserListPage() {
  // tạm mock dữ liệu
  const users = [
    {
      id: "0203568",
      name: "Ngô Thị Quế Anh",
      username: "queanhngo",
      role: "Quản lý",
      status: "Hoạt động",
    },
    {
      id: "0211268",
      name: "Đinh Xuân Nam",
      username: "dinhnam211",
      role: "Nhân viên kho",
      status: "Hoạt động",
    },
  ];

  return (
    <div className="page">
      <Card title="Quản lý người dùng">
        <div className="page-header-actions">
          <Link to="/users/new" className="primary-button">
            + Thêm người dùng
          </Link>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Họ và tên</th>
              <th>Tên đăng nhập</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td className="table-actions">
                  <Link to={`/users/${u.id}/edit`} className="text-link">
                    Sửa
                  </Link>
                  <button
                    className="danger-link"
                    onClick={() => alert("TODO: popup xác nhận xoá")}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default UserListPage;
