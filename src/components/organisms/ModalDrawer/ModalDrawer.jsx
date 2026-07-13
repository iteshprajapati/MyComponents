import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './ModalDrawer.scss';

export const ModalDrawer = ({
  isOpen,
  onClose,
  title,
  type = 'modal', // 'modal' | 'drawer'
  position = 'right', // 'right' | 'left' (only for drawer)
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  children,
  footer = null,
  closeOnOverlayClick = true,
  className = '',
  ...props
}) => {
  // Listen for Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose && onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target.classList.contains('modal-drawer-overlay')) {
      onClose && onClose();
    }
  };

  return (
    <div
      className={`modal-drawer-overlay ${isOpen ? 'is-open' : ''} ${className}`}
      onClick={handleOverlayClick}
      {...props}
    >
      <div
        className={`modal-drawer-container container-${type} container-${size} ${
          type === 'drawer' ? `drawer-${position}` : ''
        }`}
      >
        <div className="modal-drawer-header">
          {title && <h4 className="modal-drawer-title">{title}</h4>}
          <button type="button" className="modal-drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-drawer-body">{children}</div>
        {footer && <div className="modal-drawer-footer">{footer}</div>}
      </div>
    </div>
  );
};
export default ModalDrawer;
