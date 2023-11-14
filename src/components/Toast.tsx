
import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle
} from "react-icons/fa";

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      return <FaCheck size={10}/>;
    case "info":
      return <FaInfo size={10}/>;
    case "error":
      return <FaExclamationCircle size={10} />;
    case "warning":
      return <FaExclamationTriangle size={10}/>;
    default:
      return <FaBug size={10}/>;
  }
};

const ToastMessage = ({ type, message }) =>
  toast[type](
    <div style={{ display: "flex", width: "40px", height:"20px" }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
    </div>
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
