import React, { useMemo, useState } from "react";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";

const CURRENT_MANAGER = "Ngô Thị Quế Anh";
const CURRENT_STAFF = "Đinh Xuân Nam";

// ================== MOCK DATA ==================

const initialRequests = [
  {
    id: "YCN001",
    createdDate: "28/11/2025",
    creator: "Nguyễn Tất Mạnh",
    supplier: "Công ty Hạt điều BP",
    totalValue: 25000000,
    status: "approved", // approved | pending | rejected
    approver: CURRENT_MANAGER,
    note: "Không có",
    items: [
      {
        materialCode: "D112",
        materialName: "Hạt điều Bình Phước",
        unit: "Kg",
        quantity: 500,
        unitPrice: 50000,
      },
    ],
  },
  {
    id: "YCN002",
    createdDate: "11/12/2025",
    creator: "Đinh Xuân Nam",
    supplier: "Công ty Đường Biên Hòa",
    totalValue: 2000000,
    status: "pending",
    approver: null,
    note: "Cần gấp cho đơn hàng tháng 12",
    items: [
      {
        materialCode: "D134",
        materialName: "Đường ăn kiêng",
        unit: "Kg",
        quantity: 50,
        unitPrice: 40000,
      },
    ],
  },
];

const initialReceipts = [
  {
    id: "PN001",
    date: "30/11/2025",
    creator: "Nguyễn Tất Mạnh",
    confirmer: CURRENT_MANAGER,
    supplier: "Công ty Hạt điều BP",
    requestId: "YCN001",
    totalValue: 25000000,
    status: "completed", // completed | processing | cancelled
    note: "Đã nhập kho đầy đủ",
    items: [
      {
        materialCode: "D112",
        materialName: "Hạt điều Bình Phước",
        lotNumber: "LO20252811",
        unit: "Kg",
        quantity: 500,
        unitPrice: 50000,
      },
    ],
  },
  {
    id: "PN002",
    date: "14/12/2025",
    creator: CURRENT_STAFF,
    confirmer: "",
    supplier: "Công ty Đường Biên Hòa",
    requestId: "YCN002",
    totalValue: 2000000,
    status: "processing",
    note: "Chờ xác nhận",
    items: [
      {
        materialCode: "D134",
        materialName: "Đường ăn kiêng",
        lotNumber: "LO20251214",
        unit: "Kg",
        quantity: 50,
        unitPrice: 40000,
      },
    ],
  },
];

// ================== HELPERS & SMALL COMPONENTS ==================

const formatCurrency = (value) =>
  (value || 0).toLocaleString("vi-VN") + " đ";

function StatusPill({ status }) {
  const map = {
    pending: { label: "Chờ duyệt", className: "status-pill-pending" },
    approved: { label: "Đã duyệt", className: "status-pill-approved" },
    rejected: { label: "Đã từ chối", className: "status-pill-rejected" },
  };
  const cfg = map[status] || { label: status, className: "" };
  return <span className={`status-pill ${cfg.className}`}>{cfg.label}</span>;
}

function ReceiptStatusPill({ status }) {
  const map = {
    completed: { label: "Đã nhập kho", className: "status-pill-completed" },
    processing: { label: "Đang xử lý", className: "status-pill-processing" },
    cancelled: { label: "Đã hủy", className: "status-pill-cancelled" },
  };
  const cfg = map[status] || { label: status, className: "" };
  return <span className={`status-pill ${cfg.className}`}>{cfg.label}</span>;
}

// ================== MODAL: XEM CHI TIẾT YÊU CẦU ==================

function RequestDetailModal({ request, onClose, onApprove, onReject }) {
  if (!request) return null;

  const total = request.items?.reduce(
    (sum, it) => sum + (it.quantity || 0) * (it.unitPrice || 0),
    0
  );

  const canApprove = request.status === "pending";

  const footer = canApprove ? (
    <>
      <button className="secondary-button" onClick={onReject}>
        Từ chối
      </button>
      <button className="primary-button" onClick={onApprove}>
        Duyệt
      </button>
    </>
  ) : (
    <button className="secondary-button" onClick={onClose}>
      Đóng
    </button>
  );

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={`Chi tiết phiếu yêu cầu - ${request.id}`}
      footer={footer}
      width="900px"
    >
      <div className="request-detail-grid">
        <div>
          <div className="request-detail-label">Mã phiếu</div>
          <div className="request-detail-value">{request.id}</div>
        </div>
        <div>
          <div className="request-detail-label">Ngày lập</div>
          <div className="request-detail-value">{request.createdDate}</div>
        </div>
        <div>
          <div className="request-detail-label">Người lập</div>
          <div className="request-detail-value">{request.creator}</div>
        </div>
        <div>
          <div className="request-detail-label">Người duyệt</div>
          <div className="request-detail-value">
            {request.approver || "Chưa duyệt"}
          </div>
        </div>
        <div>
          <div className="request-detail-label">Nhà cung cấp</div>
          <div className="request-detail-value">{request.supplier}</div>
        </div>
        <div>
          <div className="request-detail-label">Trạng thái</div>
          <div className="request-detail-value">
            <StatusPill status={request.status} />
          </div>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <div className="request-detail-label">Ghi chú</div>
          <div className="request-detail-value">
            {request.note || "Không có"}
          </div>
        </div>
      </div>

      <div className="mt-24" />

      <div className="request-detail-label" style={{ marginBottom: 8 }}>
        Danh sách nguyên liệu
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Mã NVL</th>
            <th>Tên nguyên liệu</th>
            <th>Đơn vị</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {request.items?.map((it) => {
            const lineTotal = (it.quantity || 0) * (it.unitPrice || 0);
            return (
              <tr key={it.materialCode}>
                <td>{it.materialCode}</td>
                <td>{it.materialName}</td>
                <td>{it.unit}</td>
                <td>{it.quantity}</td>
                <td>{formatCurrency(it.unitPrice)}</td>
                <td>{formatCurrency(lineTotal)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} style={{ textAlign: "right", fontWeight: 600 }}>
              Tổng cộng: {formatCurrency(total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Modal>
  );
}

// ================== MODAL: SỬA YÊU CẦU ==================

function RequestEditModal({ request, onClose, onSave }) {
  if (!request) return null;

  const [form, setForm] = useState(() => ({
    id: request.id,
    createdDate: request.createdDate,
    creator: request.creator,
    supplier: request.supplier,
    note: request.note || "",
    items: request.items.map((i) => ({ ...i })),
  }));

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = prev.items.map((it, i) =>
        i === index
          ? {
              ...it,
              [field]:
                field === "quantity" || field === "unitPrice"
                  ? Number(value) || 0
                  : value,
            }
          : it
      );
      return { ...prev, items };
    });
  };

  const handleAddItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          materialCode: "",
          materialName: "",
          unit: "",
          quantity: 0,
          unitPrice: 0,
        },
      ],
    }));
  };

  const handleRemoveItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const total = form.items.reduce(
    (sum, it) => sum + (it.quantity || 0) * (it.unitPrice || 0),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...request,
      ...form,
      totalValue: total,
    });
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={`Sửa phiếu yêu cầu nhập kho - ${form.id}`}
      width="900px"
      footer={
        <>
          <button type="button" className="secondary-button" onClick={onClose}>
            Hủy
          </button>
          <button
            type="submit"
            className="primary-button"
            form="request-edit-form"
          >
            Cập nhật
          </button>
        </>
      }
    >
      <form id="request-edit-form" onSubmit={handleSubmit}>
        <div className="receipt-form-grid">
          <label className="form-field">
            <span className="form-label">Ngày lập *</span>
            <input
              className="form-input"
              value={form.createdDate}
              onChange={(e) =>
                handleFieldChange("createdDate", e.target.value)
              }
            />
          </label>
          <label className="form-field">
            <span className="form-label">Người lập *</span>
            <input className="form-input" readOnly value={form.creator} />
          </label>
          <div />
          <label className="form-field">
            <span className="form-label">Nhà cung cấp *</span>
            <input
              className="form-input"
              value={form.supplier}
              onChange={(e) =>
                handleFieldChange("supplier", e.target.value)
              }
            />
          </label>
          <label className="form-field">
            <span className="form-label">Tổng giá trị dự kiến</span>
            <input
              className="form-input"
              readOnly
              value={formatCurrency(total)}
            />
          </label>
          <div />
          <label className="form-field" style={{ gridColumn: "1 / -1" }}>
            <span className="form-label">Ghi chú</span>
            <textarea
              className="form-input form-textarea"
              value={form.note}
              onChange={(e) => handleFieldChange("note", e.target.value)}
            />
          </label>
        </div>

        <div className="mt-24" />
        <div className="request-detail-label" style={{ marginBottom: 8 }}>
          Danh sách nguyên liệu
        </div>

        <div className="receipt-items-container">
          {form.items.map((it, index) => {
            const lineTotal =
              (it.quantity || 0) * (it.unitPrice || 0);

            return (
              <div className="receipt-item-row" key={index}>
                <label className="form-field">
                  <span className="form-label">Nguyên liệu</span>
                  <input
                    className="form-input"
                    value={it.materialName}
                    onChange={(e) =>
                      handleItemChange(index, "materialName", e.target.value)
                    }
                  />
                </label>
                <label className="form-field">
                  <span className="form-label">Đơn vị</span>
                  <input
                    className="form-input"
                    value={it.unit}
                    onChange={(e) =>
                      handleItemChange(index, "unit", e.target.value)
                    }
                  />
                </label>
                <label className="form-field">
                  <span className="form-label">Số lượng</span>
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    value={it.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                </label>
                <label className="form-field">
                  <span className="form-label">Đơn giá</span>
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    value={it.unitPrice}
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", e.target.value)
                    }
                  />
                </label>
                <label className="form-field">
                  <span className="form-label">Thành tiền</span>
                  <input
                    className="form-input"
                    readOnly
                    value={formatCurrency(lineTotal)}
                  />
                </label>
                <button
                  type="button"
                  className="receipt-item-remove"
                  onClick={() => handleRemoveItem(index)}
                >
                  🗑
                </button>
              </div>
            );
          })}

          <button
            type="button"
            className="secondary-button"
            onClick={handleAddItem}
          >
            + Thêm nguyên liệu
          </button>
        </div>

        <div className="receipt-summary-bar">
          <span>Tổng số mặt hàng: {form.items.length}</span>
          <span>Tổng giá trị dự kiến: {formatCurrency(total)}</span>
        </div>
      </form>
    </Modal>
  );
}

// ================== MODAL: CHI TIẾT PHIẾU NHẬP ==================

function ReceiptDetailModal({ receipt, onClose, onOpenLinkedRequest }) {
  if (!receipt) return null;

  const total = receipt.items?.reduce(
    (sum, it) => sum + (it.quantity || 0) * (it.unitPrice || 0),
    0
  );

  const footer = (
    <>
      <button type="button" className="secondary-button" onClick={onClose}>
        Đóng
      </button>
      <button
        type="button"
        className="primary-button"
        onClick={() => alert("Tính năng in phiếu sẽ được bổ sung sau.")}
      >
        In phiếu
      </button>
    </>
  );

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={`Chi tiết phiếu nhập kho - ${receipt.id}`}
      footer={footer}
      width="900px"
    >
      <div className="request-detail-grid">
        <div>
          <div className="request-detail-label">Mã phiếu</div>
          <div className="request-detail-value">{receipt.id}</div>
        </div>
        <div>
          <div className="request-detail-label">Ngày lập</div>
          <div className="request-detail-value">{receipt.date}</div>
        </div>
        <div>
          <div className="request-detail-label">Người lập</div>
          <div className="request-detail-value">{receipt.creator}</div>
        </div>
        <div>
          <div className="request-detail-label">Người xác nhận</div>
          <div className="request-detail-value">
            {receipt.confirmer || "Chưa xác nhận"}
          </div>
        </div>
        <div>
          <div className="request-detail-label">Nhà cung cấp</div>
          <div className="request-detail-value">{receipt.supplier}</div>
        </div>
        <div>
          <div className="request-detail-label">Trạng thái</div>
          <div className="request-detail-value">
            <ReceiptStatusPill status={receipt.status} />
          </div>
        </div>
        <div>
          <div className="request-detail-label">Liên kết phiếu yêu cầu</div>
          <div className="request-detail-value">
            {receipt.requestId ? (
              <button
                type="button"
                className="link-button"
                onClick={() => onOpenLinkedRequest(receipt.requestId)}
              >
                {receipt.requestId}
              </button>
            ) : (
              "Không liên kết"
            )}
          </div>
        </div>
        <div>
          <div className="request-detail-label">Tổng giá trị</div>
          <div className="request-detail-value">
            {formatCurrency(total)}
          </div>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <div className="request-detail-label">Ghi chú</div>
          <div className="request-detail-value">
            {receipt.note || "Không có"}
          </div>
        </div>
      </div>

      <div className="mt-24" />
      <div className="request-detail-label" style={{ marginBottom: 8 }}>
        Danh sách nguyên liệu
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Mã NVL</th>
            <th>Tên nguyên liệu</th>
            <th>Mã lô</th>
            <th>Đơn vị</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {receipt.items?.map((it) => {
            const lineTotal =
              (it.quantity || 0) * (it.unitPrice || 0);
            return (
              <tr key={`${it.materialCode}-${it.lotNumber}`}>
                <td>{it.materialCode}</td>
                <td>{it.materialName}</td>
                <td>{it.lotNumber}</td>
                <td>{it.unit}</td>
                <td>{it.quantity}</td>
                <td>{formatCurrency(it.unitPrice)}</td>
                <td>{formatCurrency(lineTotal)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} style={{ textAlign: "right", fontWeight: 600 }}>
              Tổng cộng: {formatCurrency(total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Modal>
  );
}

// ================== MODAL: TẠO PHIẾU NHẬP ==================

function ReceiptCreateModal({ onClose, onCreate, requests }) {
  const initForm = {
    date: "",
    creator: CURRENT_STAFF,
    confirmer: "",
    supplier: "",
    requestId: "",
    status: "processing",
    note: "",
    items: [],
  };

  const [form, setForm] = useState(initForm);

  const handleFieldChange = (field, value) => {
    if (field === "requestId") {
      const r = requests.find((x) => x.id === value);
      setForm((prev) => ({
        ...prev,
        requestId: value,
        supplier: r ? r.supplier : prev.supplier,
        items: r
          ? r.items.map((it) => ({
              materialCode: it.materialCode,
              materialName: it.materialName,
              lotNumber: "",
              unit: it.unit,
              quantity: it.quantity,
              unitPrice: it.unitPrice,
            }))
          : prev.items,
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = prev.items.map((it, i) =>
        i === index
          ? {
              ...it,
              [field]:
                field === "quantity" || field === "unitPrice"
                  ? Number(value) || 0
                  : value,
            }
          : it
      );
      return { ...prev, items };
    });
  };

  const handleAddItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          materialCode: "",
          materialName: "",
          lotNumber: "",
          unit: "",
          quantity: 0,
          unitPrice: 0,
        },
      ],
    }));
  };

  const handleRemoveItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const total = form.items.reduce(
    (sum, it) => sum + (it.quantity || 0) * (it.unitPrice || 0),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.supplier || form.items.length === 0) {
      alert(
        "Vui lòng nhập Ngày nhập, Nhà cung cấp và ít nhất 1 nguyên liệu."
      );
      return;
    }
    onCreate({
      ...form,
      totalValue: total,
    });
    setForm(initForm);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title="Tạo phiếu nhập kho"
      width="900px"
      footer={
        <>
          <button type="button" className="secondary-button" onClick={onClose}>
            Hủy
          </button>
          <button
            type="submit"
            className="primary-button"
            form="receipt-create-form"
          >
            Tạo phiếu
          </button>
        </>
      }
    >
      <form id="receipt-create-form" onSubmit={handleSubmit}>
        <div className="receipt-form-grid">
          <label className="form-field">
            <span className="form-label">Ngày nhập *</span>
            <input
              className="form-input"
              placeholder="dd/mm/yyyy"
              value={form.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
            />
          </label>
          <label className="form-field">
            <span className="form-label">Người lập</span>
            <input className="form-input" readOnly value={form.creator} />
          </label>
          <label className="form-field">
            <span className="form-label">Người xác nhận</span>
            <input
              className="form-input"
              placeholder="Nhập tên người xác nhận"
              value={form.confirmer}
              onChange={(e) =>
                handleFieldChange("confirmer", e.target.value)
              }
            />
          </label>
          <label className="form-field">
            <span className="form-label">Nhà cung cấp *</span>
            <input
              className="form-input"
              value={form.supplier}
              onChange={(e) =>
                handleFieldChange("supplier", e.target.value)
              }
            />
          </label>
          <label className="form-field">
            <span className="form-label">Tổng giá trị dự kiến</span>
            <input
              className="form-input"
              readOnly
              value={formatCurrency(total)}
            />
          </label>
          <label className="form-field">
            <span className="form-label">Liên kết phiếu yêu cầu</span>
            <select
              className="form-input"
              value={form.requestId}
              onChange={(e) =>
                handleFieldChange("requestId", e.target.value)
              }
            >
              <option value="">Không liên kết</option>
              {requests.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id} - {r.supplier}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span className="form-label">Trạng thái *</span>
            <select
              className="form-input"
              value={form.status}
              onChange={(e) => handleFieldChange("status", e.target.value)}
            >
              <option value="processing">Đang xử lý</option>
              <option value="completed">Đã nhập kho</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </label>
          <label className="form-field" style={{ gridColumn: "1 / -1" }}>
            <span className="form-label">Ghi chú</span>
            <textarea
              className="form-input form-textarea"
              value={form.note}
              onChange={(e) => handleFieldChange("note", e.target.value)}
            />
          </label>
        </div>

        <div className="mt-24" />
        <div className="request-detail-label" style={{ marginBottom: 8 }}>
          Danh sách nguyên liệu
        </div>

        <div className="receipt-items-container">
          {form.items.length === 0 && (
            <div className="receipt-items-empty">
              Chưa có nguyên liệu nào. Nhấn "Thêm nguyên liệu" để bắt đầu.
            </div>
          )}

          {form.items.map((it, index) => {
            const lineTotal =
              (it.quantity || 0) * (it.unitPrice || 0);

            return (
              <div className="receipt-item-row" key={index}>
                <label className="form-field">
                  <span className="form-label">Nguyên liệu</span>
                  <input
                    className="form-input"
                    value={it.materialName}
                    onChange={(e) =>
                      handleItemChange(index, "materialName", e.target.value)
                    }
                  />
                </label>
                <label className="form-field">
                  <span className="form-label">Mã lô</span>
                  <input
                    className="form-input"
                    value={it.lotNumber}
                    onChange={(e) =>
                      handleItemChange(index, "lotNumber", e.target.value)
                    }
                  />
                </label>
                <label className="form-field">
                  <span className="form-label">Đơn vị</span>
                  <input
                    className="form-input"
                    value={it.unit}
                    onChange={(e) =>
                      handleItemChange(index, "unit", e.target.value)
                    }
                  />
                </label>
                <label className="form-field">
                  <span className="form-label">Số lượng</span>
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    value={it.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                </label>
                <label className="form-field">
                  <span className="form-label">Đơn giá</span>
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    value={it.unitPrice}
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", e.target.value)
                    }
                  />
                </label>
                <label className="form-field">
                  <span className="form-label">Thành tiền</span>
                  <input
                    className="form-input"
                    readOnly
                    value={formatCurrency(lineTotal)}
                  />
                </label>
                <button
                  type="button"
                  className="receipt-item-remove"
                  onClick={() => handleRemoveItem(index)}
                >
                  🗑
                </button>
              </div>
            );
          })}

          <button
            type="button"
            className="secondary-button"
            onClick={handleAddItem}
          >
            + Thêm nguyên liệu
          </button>
        </div>

        <div className="receipt-summary-bar">
          <span>Tổng số mặt hàng: {form.items.length}</span>
          <span>Tổng giá trị: {formatCurrency(total)}</span>
        </div>
      </form>
    </Modal>
  );
}

// ================== TRANG NHẬP KHO CHÍNH ==================

function ImportPage() {
  const [activeTab, setActiveTab] = useState("requests"); // requests | receipts

  const [requests, setRequests] = useState(initialRequests);
  const [requestSearch, setRequestSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);

  const [receipts, setReceipts] = useState(initialReceipts);
  const [receiptSearch, setReceiptSearch] = useState("");
  const [receiptStatusFilter, setReceiptStatusFilter] = useState("all");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isCreateReceiptOpen, setIsCreateReceiptOpen] = useState(false);

  const filteredRequests = useMemo(() => {
    const term = requestSearch.trim().toLowerCase();
    if (!term) return requests;
    return requests.filter(
      (r) =>
        r.id.toLowerCase().includes(term) ||
        r.creator.toLowerCase().includes(term) ||
        r.supplier.toLowerCase().includes(term)
    );
  }, [requests, requestSearch]);

  const filteredReceipts = useMemo(() => {
    const term = receiptSearch.trim().toLowerCase();
    return receipts.filter((r) => {
      const matchTerm =
        !term ||
        r.id.toLowerCase().includes(term) ||
        (r.requestId || "").toLowerCase().includes(term) ||
        r.supplier.toLowerCase().includes(term);

      const matchStatus =
        receiptStatusFilter === "all" || r.status === receiptStatusFilter;

      return matchTerm && matchStatus;
    });
  }, [receipts, receiptSearch, receiptStatusFilter]);

  const receiptStats = useMemo(() => {
    const total = receipts.length;
    const completed = receipts.filter((r) => r.status === "completed").length;
    const processing = receipts.filter((r) => r.status === "processing").length;
    const totalValue = receipts.reduce(
      (sum, r) => sum + (r.totalValue || 0),
      0
    );
    return { total, completed, processing, totalValue };
  }, [receipts]);

  // --- actions request ---

  const handleApproveSelected = () => {
    if (!selectedRequest) return;
    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? { ...r, status: "approved", approver: CURRENT_MANAGER }
          : r
      )
    );
    setSelectedRequest(null);
  };

  const handleRejectSelected = () => {
    if (!selectedRequest) return;
    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? { ...r, status: "rejected", approver: CURRENT_MANAGER }
          : r
      )
    );
    setSelectedRequest(null);
  };

  const handleDeleteRequest = (id) => {
    const ok = window.confirm("Bạn có chắc muốn xóa yêu cầu này?");
    if (!ok) return;
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSaveEditedRequest = (updated) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
    setEditingRequest(null);
  };

  // --- actions receipt ---

  const handleCreateReceipt = (data) => {
    const nextIndex = receipts.length + 1;
    const newId = `PN${String(nextIndex).padStart(3, "0")}`;
    const total = data.items.reduce(
      (sum, it) => sum + (it.quantity || 0) * (it.unitPrice || 0),
      0
    );

    const newReceipt = {
      id: newId,
      date: data.date,
      creator: data.creator || CURRENT_STAFF,
      confirmer: data.confirmer || "",
      supplier: data.supplier,
      requestId: data.requestId || "",
      status: data.status,
      note: data.note || "",
      items: data.items,
      totalValue: total,
    };

    setReceipts((prev) => [...prev, newReceipt]);
  };

  const openRequestFromReceipt = (requestId) => {
    const r = requests.find((x) => x.id === requestId);
    if (!r) return;
    setSelectedRequest(r);
  };

  // ================== RENDER ==================

  return (
    <div className="page">
      <Card>
        {/* Tabs */}
        <div className="tabs">
          <button
            type="button"
            className={`tab ${activeTab === "requests" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Quản lý yêu cầu nhập kho
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "receipts" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("receipts")}
          >
            Quản lý nhập kho
          </button>
        </div>

        {/* TAB 1 */}
        {activeTab === "requests" && (
          <>
            <p style={{ fontSize: 14, marginTop: 8, marginBottom: 4 }}>
              Danh sách phiếu yêu cầu nhập kho
            </p>
            <div className="import-header-row">
              <div className="import-search">
                <input
                  className="search-input"
                  placeholder="Tìm kiếm..."
                  value={requestSearch}
                  onChange={(e) => setRequestSearch(e.target.value)}
                />
              </div>
              <div className="import-actions">
                <button
                  className="primary-button"
                  type="button"
                  onClick={() =>
                    alert("Chức năng tạo phiếu yêu cầu sẽ làm sau.")
                  }
                >
                  + Tạo phiếu yêu cầu
                </button>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Mã phiếu</th>
                  <th>Ngày lập</th>
                  <th>Người lập</th>
                  <th>Nhà cung cấp</th>
                  <th>Tổng giá trị</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={7} className="table-empty">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
                {filteredRequests.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.createdDate}</td>
                    <td>{r.creator}</td>
                    <td>{r.supplier}</td>
                    <td>{formatCurrency(r.totalValue)}</td>
                    <td>
                      <StatusPill status={r.status} />
                    </td>
                    <td className="table-actions">
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => setSelectedRequest(r)}
                      >
                        Xem
                      </button>
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => setEditingRequest(r)}
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="danger-link"
                        onClick={() => handleDeleteRequest(r.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* TAB 2 */}
        {activeTab === "receipts" && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-label">Tổng phiếu nhập</span>
                <span className="stat-value">{receiptStats.total}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Đã nhập kho</span>
                <span className="stat-value">{receiptStats.completed}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Đang xử lý</span>
                <span className="stat-value">{receiptStats.processing}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Tổng giá trị</span>
                <span className="stat-value">
                  {Math.round(receiptStats.totalValue / 1_000_000)} M đ
                </span>
              </div>
            </div>

            <div className="import-header-row">
              <div className="import-search">
                <input
                  className="search-input"
                  placeholder="Tìm kiếm..."
                  value={receiptSearch}
                  onChange={(e) => setReceiptSearch(e.target.value)}
                />
              </div>
              <div className="import-actions">
                <select
                  className="select-input"
                  value={receiptStatusFilter}
                  onChange={(e) =>
                    setReceiptStatusFilter(e.target.value)
                  }
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="completed">Đã nhập kho</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setIsCreateReceiptOpen(true)}
                >
                  + Tạo phiếu nhập
                </button>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Mã phiếu</th>
                  <th>Ngày nhập</th>
                  <th>Nhà cung cấp</th>
                  <th>Mã yêu cầu</th>
                  <th>Tổng giá trị</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredReceipts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="table-empty">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
                {filteredReceipts.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.date}</td>
                    <td>{r.supplier}</td>
                    <td>{r.requestId}</td>
                    <td>{formatCurrency(r.totalValue)}</td>
                    <td>
                      <ReceiptStatusPill status={r.status} />
                    </td>
                    <td className="table-actions">
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => setSelectedReceipt(r)}
                      >
                        Xem
                      </button>
                      <button
                        type="button"
                        className="text-link"
                        onClick={() =>
                          alert("In phiếu sẽ kết nối BE sau.")
                        }
                      >
                        In
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </Card>

      {/* Các modal */}

      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApproveSelected}
          onReject={handleRejectSelected}
        />
      )}

      {editingRequest && (
        <RequestEditModal
          key={editingRequest.id}
          request={editingRequest}
          onClose={() => setEditingRequest(null)}
          onSave={handleSaveEditedRequest}
        />
      )}

      {selectedReceipt && (
        <ReceiptDetailModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          onOpenLinkedRequest={openRequestFromReceipt}
        />
      )}

      {isCreateReceiptOpen && (
        <ReceiptCreateModal
          onClose={() => setIsCreateReceiptOpen(false)}
          onCreate={(data) => {
            handleCreateReceipt(data);
            setIsCreateReceiptOpen(false);
          }}
          requests={requests}
        />
      )}
    </div>
  );
}

export default ImportPage;
