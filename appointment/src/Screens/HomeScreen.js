import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import AvailableBookings from "./../Components/Home/AvailableBookings";
import TopRated from "./../Components/Home/TopRated";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { txtDB, imgDB } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Bookings from "../Components/Bookings";

function HomeScreen() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(txtDB, "txtData"));
        const appoint = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        setData(appoint);
        appoint.forEach((book) => console.log(book.id));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <AvailableBookings info={data} />
        <TopRated info={data} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
