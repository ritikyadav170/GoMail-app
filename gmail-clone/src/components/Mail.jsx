import React from "react";
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailRead,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
} from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

const Mail = () => {
  const navigate = useNavigate();
  const { selectedEmail } = useSelector((store) => store.appSlice);
  const params = useParams();

  const deleteMailById = async (id) => {
    try {
      await deleteDoc(doc(db, "emails", id));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const mailIcon = [
    { icon: <IoMdArrowBack size="24px" onClick={() => navigate("/")} /> },
    { icon: <BiArchiveIn size="24px" /> },
    { icon: <MdOutlineReport size="24px" /> },
    {
      icon: (
        <MdDeleteOutline
          onClick={() => deleteMailById(params.id)}
          size="24px"
        />
      ),
    },
    { icon: <MdOutlineMarkEmailRead size="24px" /> },
    { icon: <MdOutlineWatchLater size="24px" /> },
    { icon: <MdOutlineAddTask size="24px" /> },
    { icon: <MdOutlineDriveFileMove size="24px" /> },
    { icon: <IoMdMore size="24px" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-white rounded-xl mx-5"
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          {mailIcon.map((item, index) => {
            return (
              <div
                key={index}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                {item.icon}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:bg-gray-100 hover:rounded-full">
            <MdKeyboardArrowLeft size={"24px"} />
          </button>
          <button className="hover:bg-gray-100 hover:rounded-full">
            <MdKeyboardArrowRight size={"24px"} />
          </button>
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto p-4">
        <div className="flex items-center justify-between bg-white gap-1">
          <div className="flex items-center gap-2">
            <h1>{selectedEmail?.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">inbox</span>
          </div>
          <div className="flex-none text-gray-400 my-5 text-sm">
            <p>
              {new Date(selectedEmail?.createdAt.seconds * 1000).toUTCString}
            </p>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          <h1>{selectedEmail?.to}</h1>
          <span>to me</span>
        </div>
        <div className="py-3">
          <p>{selectedEmail?.message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Mail;
