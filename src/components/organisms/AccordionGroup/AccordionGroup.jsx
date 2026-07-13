import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './AccordionGroup.scss';

export const AccordionItem = ({
  title,
  isOpen,
  onClick,
  children
}) => {
  return (
    <div className={`accordion-item-wrapper ${isOpen ? 'is-expanded' : ''}`}>
      <button
        type="button"
        className="accordion-trigger-button"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="accordion-item-title">{title}</span>
        <ChevronDown size={18} className="accordion-caret-icon" />
      </button>
      <div className="accordion-content-panel">
        <div className="accordion-content-inner">{children}</div>
      </div>
    </div>
  );
};

export const AccordionGroup = ({
  items = [], // [{ id, title, content }]
  allowMultiple = false,
  className = '',
  ...props
}) => {
  const [openIds, setOpenIds] = useState([]);

  const handleToggle = (id) => {
    if (allowMultiple) {
      setOpenIds(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`accordion-group ${className}`} {...props}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onClick={() => handleToggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
export default AccordionGroup;
