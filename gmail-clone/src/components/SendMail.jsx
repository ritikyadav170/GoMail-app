import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";
import {addDoc,collection,serverTimestamp} from 'firebase/firestore';
import {db} from '../firebase'

const SendMail = () => {
  const open = useSelector((state) => state.appSlice.open);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "emails"), {
      to:formData.to,
      subject: formData.subject,
      message: formData.message,
      createdAt: serverTimestamp(),
    })
    dispatch(setOpen(false));
    setFormData({
      to: "",
      subject: "",
      message: "",
    })
  };

  return (
    <div
      className={` ${
        open ? "block" : "hidden"
      } bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}
    >
      <div className="flex px-3 py-2 bg-[#F2F6Fc] justify-between rounded-t-md">
        <h1>New Message</h1>
        <div
          className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => dispatch(setOpen(false))}
        >
          <RxCross2 size={"16px"} />
        </div>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col p-3 gap-2">
        <input
          type="email"
          name="to"
          placeholder="To"
          className="outline-none py-1 border-b"
          value={formData.to}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="outline-none py-1 border-b"
          value={formData.subject}
          onChange={changeHandler}
        />
        <textarea
          name="message"
          cols="30"
          rows="10"
          className="outline-none py-1 border"
          placeholder="Write your message..."
          value={formData.message}
          onChange={changeHandler}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-800 rounded-full w-fit px-4 py-2 text-white font-medium mt-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMail;
