import React, { useEffect, useState } from "react";
import Message from "./Message";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const { emails, searchText } = useSelector((state) => state.appSlice);
  const [tempEmails, setTempEmails] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(allEmails);
      dispatch(setEmails(allEmails));
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const filteredEmail = emails?.filter((email) => {
      return (
        email?.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
        email?.to?.toLowerCase().includes(searchText.toLowerCase()) ||
        email?.message?.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setTempEmails(filteredEmail || []);
  }, [searchText, emails]);

  return (
    <div>
      {tempEmails.map((email) => (
        <Message key={email.id} email={email} />
      ))}
    </div>
  );
};

export default Messages;
