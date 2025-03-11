import React from "react";
import { IoIosStarOutline } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { MdInbox } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { MdOutlineDrafts } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/appSlice"

const sideBarItems = [
  { icon: <MdInbox size={"24px"} />, text: "Inbox" },
  { icon: <IoIosStarOutline size={"24px"} />, text: "Starred" },
  { icon: <FaRegClock size={"24px"} />, text: "Snoozed" },
  { icon: <TbSend2 size={"24px"} />, text: "Sent" },
  { icon: <MdOutlineDrafts size={"24px"} />, text: "Drafts" },
  { icon: <MdOutlineKeyboardArrowDown size={"24px"} />, text: "More" },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-[15%]">
      <div className="p-3">
        <button
          onClick={() => dispatch(setOpen(true))} 
          className="flex items-center gap-2 p-4 rounded-2xl hover:shadow-md bg-[#C2E7FF] w-[90%]"
        >
          <LuPencil size={"24px"} />
          <h1 className="font-medium">Compose</h1>
        </button>
      </div>
      <div className="text-gray-800 font-medium">
        {sideBarItems.map((item, index) => (
          <div
            key={index} 
            className="flex items-center gap-4 pl-6 py-1 rounded-full hover:cursor-pointer hover:bg-gray-200 my-2"
          >
            {item.icon}
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
