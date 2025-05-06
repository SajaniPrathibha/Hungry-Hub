import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="div header-contents">
        <h2>Find your Favourite Food here</h2>
        <p>
          Designed to be the best among evey dishes with perfect tatest, We try
          to uphold the traditions of the Local Household while bringing out the
          avours of Sri Lanka with a bounty of fresh seasonal ingredients. We
          take extra care to deliver fresh farm produce to a local classy table
          cuisine with an emphasis on seasonal & locally sourced ingredients and
          with the freshest foods.
        </p>
        {/* <button>View Menu</button> */}
      </div>
    </div>
  );
};

export default Header;
