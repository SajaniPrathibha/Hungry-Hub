// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { StoreContext } from "../../context/StoreContext";
//
// const AdvertisementItem = () => {
//   const { token, url } = useContext(StoreContext);
//   const [advertisements, setAdvertisements] = useState([]);
//
//   const fetchAdvertisements = async () => {
//     try {
//       const response = await axios.get(`${url}/api/adv/list-by-points`, {
//         headers: { token },
//       });
//       console.log("Fetched Advertisements:", response.data.data);
//       // Set the advertisements directly to the state
//       setAdvertisements(response.data.data);
//       console.log("Advertisements State Updated:", response.data.data);
//     } catch (error) {
//       console.error("Error fetching advertisements:", error.message);
//     }
//   };
//
//   useEffect(() => {
//     if (token) {
//       fetchAdvertisements();
//
//     }
//   }, [token]); // Only run this effect when the token changes
//
//   return (
//     <div>
//       <div className="adv-list">
//         {advertisements.map((adv) => (
//           <div key={adv._id} className="adv-item">
//             <img
//               src={`${url}/images/${adv.image}`} alt={adv.description}
//               style={{ width: "200px", height: "150px" }}
//             />
//             <h3>{adv.description}</h3>
//             <p>Category: {adv.category}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
//
// export default AdvertisementItem;
import React from "react";
import "./AdvertisementItem.css";

const AdvertisementItem = ({  description, image }) => {
  return (
      <div className="advertisement-item" id='offers'>
        <img src={`http://localhost:4000/images/${image}`} alt={description} onError={(e) => e.target.src = 'path-to-placeholder-image.png'} />
        <p>{description}</p>
      </div>
  );
};

export default AdvertisementItem;
