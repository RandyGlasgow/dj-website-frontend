import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import ReactDOM from "react-dom";

import styles from "@/styles/Modal.module.css";

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);

  function handleClose(e) {
    e.preventDefault;
    onClose();
  }

  useEffect(() => setIsBrowser(true));

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
