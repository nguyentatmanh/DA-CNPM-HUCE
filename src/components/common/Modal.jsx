function Modal({ open, title, onClose, children, footer, width = "720px" }) {
  if (!open) return null;

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onMouseDown={handleOverlayClick}>
      <div
        className="modal"
        style={{ maxWidth: width }}
        onMouseDown={handleContentClick}
      >
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          {onClose && (
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          )}
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
