import React, { useState } from "react";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { GoTag } from "react-icons/go";
import Messages from "./messages";


const mailType = [
  {
    icon: <MdInbox />,
    text: "Primary",
  },
  {
    icon: <GoTag />,
    text: "Promotions",
  },
  {
    icon: <FaUserFriends />,
    text: "Socials",
  },
];
const Inbox = () => {
  const [mailTypeSelected, setMailTypeSelected] = useState(0);
  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div className="flex items-center gap-1">
            <MdCropSquare size={"20px"} />
            <FaCaretDown size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdRefresh size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdMore size={"20px"} />
          </div>
        </div>
        <div className="flex items-center gap-2 ">
           <p className="text-gray-500 ">1-50 of 1000</p>
           <button className="hover:bg-gray-100 hover:rounded-full"><MdKeyboardArrowLeft size={"24px"}/></button>
           <button className="hover:bg-gray-100 hover:rounded-full"><MdKeyboardArrowRight size={"24px"} /></button>
        </div>
      </div>

      <div className="h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-1">
          {mailType.map((item, index) => {
            return (
              <button
                key={index}
                className={` ${
                  mailTypeSelected == index
                    ? " border-b-4 border-b-blue-600"
                    : "border-b-4 border-b-transparent"
                } w-52 hover:bg-gray-100  p-4 flex items-center gap-5`}
                onClick={() => setMailTypeSelected(index)}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            );
          })}
        </div>
        <Messages />
      </div>
    </div>
  );
};

export default Inbox;
