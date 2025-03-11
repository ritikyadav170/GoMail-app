import React, { useEffect, useState } from "react";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { PiDotsNineLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../redux/appSlice";
import { Avatar } from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import { auth } from './../../firebase';
import { setUser } from "../../redux/appSlice";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";


const Navbar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const {user} = useSelector(store => store.appSlice);
  const [toggle, setToggle] = useState(false);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input, dispatch]);

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <RxHamburgerMenu size={"20px"} />
          </div>
          <img
            className="w-10 ml-2"
            src="https://static.vecteezy.com/system/resources/previews/022/484/516/original/google-mail-gmail-icon-logo-symbol-free-png.png   "
          />
          <h1 className="text-2xl text-gray-500 font-medium ">MailBox</h1>
        </div>
      </div>
      <div className="md:block hidden w-[50%] mr-auto ml-auto mt-2">
        <div className="flex items-center bg-gray-300 px-2 py-2 rounded-full">
          <IoSearch className="text-gray-700" size={"24px"} />
          <input
            type="text"
            placeholder="Search Mail"
            className="rounded-full w-full bg-transparent outline-none px-1"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="md:block hidden mr-5">
          <div className="flex items-center gap-2">
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <CiCircleQuestion size={"24px"} />
            </div>
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <IoMdSettings size={"24px"} />
            </div>
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <PiDotsNineLight size={"24px"} />
            </div>
            <div className="cursor-pointer p-2 rounded-full ">
              <Avatar
                onClick={() => setToggle(!toggle)}
                src= "https://docs.material-tailwind.com/img/face-2.jpg"
                className=" rounded-full h-10 "
              />
              <AnimatePresence>
                {toggle && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-2 z-20 shadow-lg bg-white rounded-md"
                  >
                    <p className="p-2 underline" onClick={signOutHandler}>
                      Logout
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
