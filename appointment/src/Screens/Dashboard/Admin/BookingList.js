import React, { useEffect, useState } from "react";
import Table from "../../../Components/Table";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "../../../Components/Notifications/Empty";
import { txtDB, imgDB } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

function BookingList() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sameClass =
    "text-subMain p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";

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
        console.log("this is appointment", appoint);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  // end

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">My Available Appointment Time</h2>
        </div>

        {data?.length > 0 ? (
          <>
            <Table values={data} />

            <div className="w-full flex-rows gap-6 my-5"></div>
          </>
        ) : (
          <Empty message="You have no appointment list" />
        )}
      </div>
    </SideBar>
  );
}

export default BookingList;
