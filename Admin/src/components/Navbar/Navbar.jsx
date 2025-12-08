import "./Navbar.css";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />

      {/* Profile Image */}
      <img
        className="profile"
        src={assets.profile_image}
        alt="Profile"
        onClick={onLogout} // Directly call onLogout (which shows popup in App.jsx)
      />
    </div>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;