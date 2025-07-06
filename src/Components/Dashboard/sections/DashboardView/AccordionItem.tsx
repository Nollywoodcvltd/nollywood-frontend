import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";
import "./Accordion.scss";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItem: React.FC<AccordionProps> = ({ title, children, className="" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item border mb-2">
      {/* Header */}
      <div
        className="accordion-header bg-warning text-dark p-3 d-flex justify-content-between align-items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <FiMinus /> : <GoPlus />}
      </div>

      {/* Collapsible Content */}
      <div className={`accordion-content ${isOpen ? "open" : ""} ${className}`}>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
