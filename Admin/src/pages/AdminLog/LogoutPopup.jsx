import React from "react";
import "./LogoutPopup.css";

const LogoutPopup = ({ onConfirm, onCancel }) => (
   <div className="overlays">
    <div className="logout-popup show"> {/* Add 'show' here */}
        <div className="logout-popup-content">
            <h3>Are you sure you want to log out?</h3>
            <button className="yes" onClick={onConfirm}>Yes</button>
            <button className="no" onClick={onCancel}>No</button>
        </div>
    </div>
    </div>
);

export default LogoutPopup;
