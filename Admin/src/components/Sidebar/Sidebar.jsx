import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isAdvertisingOpen, setIsAdvertisingOpen] = useState(false);

  return (
    <div className="w-[18%] max-[900px]:w-[15%] min-h-screen border-[1.5px] border-[#a9a9a9] border-t-0">
      <div className="!pt-[15px] !pl-8 max-[900px]:!pl-2 !mt-10 flex flex-col !gap-5">
        {/* Items Dropdown */}
        <div>
          <div
            onClick={() => setIsItemsOpen(!isItemsOpen)}
            className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-3 px-4 max-[900px]:px-2 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer hover:bg-gray-100"
          >
            <img src={assets.icons} alt="" className="w-6 max-[900px]:w-5 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
            <p className="text-lg max-[900px]:hidden flex-1">Items</p>
            <span className="text-lg max-[900px]:text-sm max-[900px]:ml-0 !mr-2">{isItemsOpen ? "▼" : "▶"}</span>
          </div>

          {/* Dropdown Items */}
          {isItemsOpen && (
            <div className="flex flex-col gap-2 !mt-3">
              <NavLink
                to="/add"
                className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-2 px-4 max-[900px]:px-2 !ml-8 max-[900px]:!ml-0 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer [&.active]:bg-[#b5c8f4] [&.active]:border-[#fff0ed]"
              >
                <img src={assets.add_icon} alt="" className="w-5 max-[900px]:w-4 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
                <p className="text-base max-[900px]:hidden">Add Items</p>
              </NavLink>

              <NavLink
                to="/list"
                className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-2 px-4 max-[900px]:px-2 !ml-8 max-[900px]:!ml-0 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer [&.active]:bg-[#b5c8f4] [&.active]:border-[#fff0ed]"
              >
                <img src={assets.list} alt="" className="w-5 max-[900px]:w-4 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
                <p className="text-base max-[900px]:hidden">List Items</p>
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/orders"
          className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-3 px-4 max-[900px]:px-2 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer [&.active]:bg-[#b5c8f4] [&.active]:border-[#fff0ed]"
        >
          <img src={assets.order} alt="" className="w-6 max-[900px]:w-5 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
          <p className="text-lg max-[900px]:hidden">Orders</p>
        </NavLink>

        {/* Staff Dropdown */}
        <div>
          <div
            onClick={() => setIsStaffOpen(!isStaffOpen)}
            className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-3 px-4 max-[900px]:px-2 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer hover:bg-gray-100"
          >
            <img src={assets.staff} alt="" className="w-6 max-[900px]:w-5 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
            <p className="text-lg max-[900px]:hidden flex-1">Staff</p>
            <span className="text-lg max-[900px]:text-sm max-[900px]:ml-0 !mr-2">{isStaffOpen ? "▼" : "▶"}</span>
          </div>

          {/* Dropdown Staff Items */}
          {isStaffOpen && (
            <div className="flex flex-col gap-2 !mt-3">
              <NavLink
                to="/staff"
                className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-2 px-4 max-[900px]:px-2 !ml-8 max-[900px]:!ml-0 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer [&.active]:bg-[#b5c8f4] [&.active]:border-[#fff0ed]"
              >
                <img src={assets.add_icon} alt="" className="w-5 max-[900px]:w-4 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
                <p className="text-base max-[900px]:hidden">Add Staff</p>
              </NavLink>

              <NavLink
                to="/StaffList"
                className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-2 px-4 max-[900px]:px-2 !ml-8 max-[900px]:!ml-0 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer [&.active]:bg-[#b5c8f4] [&.active]:border-[#fff0ed]"
              >
                <img src={assets.list} alt="" className="w-5 max-[900px]:w-4 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
                <p className="text-base max-[900px]:hidden">Staff List</p>
              </NavLink>
            </div>
          )}
        </div>

        {/* <NavLink
          to="/prediction"
          className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-3 px-4 max-[900px]:px-2 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer [&.active]:bg-[#b5c8f4] [&.active]:border-[#fff0ed]"
        >
          <img src={assets.pred} alt="" className="w-6 max-[900px]:w-5 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
          <p className="text-lg max-[900px]:hidden">Item prediction</p>
        </NavLink> */}

        <NavLink
          to="/customers"
          className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-3 px-4 max-[900px]:px-2 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer [&.active]:bg-[#b5c8f4] [&.active]:border-[#fff0ed]"
        >
          <img src={assets.cus} alt="" className="w-6 max-[900px]:w-5 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
          <p className="text-lg max-[900px]:hidden">Customers list</p>
        </NavLink>

        {/* Advertising Dropdown */}
        <div>
          <div
            onClick={() => setIsAdvertisingOpen(!isAdvertisingOpen)}
            className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-3 px-4 max-[900px]:px-2 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer hover:bg-gray-100"
          >
            <img src={assets.adv} alt="" className="w-6 max-[900px]:w-5 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
            <p className="text-lg max-[900px]:hidden flex-1">Advertising</p>
            <span className="text-lg max-[900px]:text-sm max-[900px]:ml-0 !mr-2">{isAdvertisingOpen ? "▼" : "▶"}</span>
          </div>

          {/* Dropdown Advertising Items */}
          {isAdvertisingOpen && (
            <div className="flex flex-col gap-2 !mt-3">
              <NavLink
                to="/homeAdv"
                className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-2 px-4 max-[900px]:px-2 !ml-8 max-[900px]:!ml-0 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer [&.active]:bg-[#b5c8f4] [&.active]:border-[#fff0ed]"
              >
                <img src={assets.add_icon} alt="" className="w-5 max-[900px]:w-4 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
                <p className="text-base max-[900px]:hidden">Add advertising</p>
              </NavLink>

              <NavLink
                to="/advList"
                className="flex items-center gap-4 max-[900px]:gap-0 max-[900px]:justify-center border border-[#a9a9a9] border-r-0 py-2 px-4 max-[900px]:px-2 !ml-8 max-[900px]:!ml-0 rounded-tl-[3px] rounded-bl-[3px] cursor-pointer [&.active]:bg-[#b5c8f4] [&.active]:border-[#fff0ed]"
              >
                <img src={assets.list} alt="" className="w-5 max-[900px]:w-4 !mt-2 max-[900px]:!mt-0 !ml-2 max-[900px]:!ml-0 !mb-2 max-[900px]:!mb-0" />
                <p className="text-base max-[900px]:hidden">Advertising list</p>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;