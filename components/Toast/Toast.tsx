import React, { useState, useEffect, useCallback } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Props {
  id: string;
  message: string;
  type: ToastType;
  onClose?: () => void;
}

const Toast: React.FC<Props> = ({ id, message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(handleClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isHovered, handleClose]);

  return (
    <div
      id={id}
      className={`fixed bottom-4 right-4 max-w-sm p-4 text-gray-500 bg-white w-96 z-50 shadow ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      role="alert"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div
          className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${
            type === "success"
              ? "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200"
              : type === "error"
                ? "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200"
                : "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200"
          }`}
        >
          {type === "success" && (
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          )}
          {type === "error" && (
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.707 12.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
          )}
          {type === "warning" && (
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
          )}
          <span className="sr-only">
            {type === "success"
              ? "Success"
              : type === "error"
                ? "Error"
                : "Warning"}{" "}
            icon
          </span>
        </div>
        <div className="ms-3 text-sm font-normal grow">{message}</div>
        <button
          type="button"
          onClick={handleClose}
          className="self-end -mx-1.5 bg-white text-gray-400 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
