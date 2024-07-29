import React, { useEffect, useState } from "react";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import SideBar from "./../SideBar";
import CustomerTable from "./../../../Components/CustomerTable";
import { useDispatch } from "react-redux";
import { Empty } from "../../../Components/Notifications/Empty";
import { useSelector } from "react-redux";
import { txtDB, imgDB } from "../../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { updateDoc, doc, deleteField } from "firebase/firestore";

function Dashboard() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);

  // dashboard datas
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Appointments",
      total: "5",
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "cancelled Appointments",
      total: "3",
    },

    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading..." : "12" || 0,
    },
  ];
  useEffect(() => {
    console.log("i reach here 1");
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
        console.log("i reach here 2");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  const onDeleteHandler = async (id) => {
    console.log("i reach here 3");
    try {
      const docRef = doc(txtDB, "txtData", id);
      await updateDoc(docRef, {
        txtVal: deleteField(),
      });
      alert("Field deleted successfully");

      // Optionally, refetch the data or update the state to remove the deleted field
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, txtVal: undefined } : item
      );
      setData(updatedData);
      console.log("i reach here 4");
    } catch (error) {
      console.error("Error deleting field: ", error);
      alert("Failed to delete the field");
    }
  };

  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2 text-black"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className="mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-white">Recent Bookings</h3>

      {data?.length > 0 ? (
        <CustomerTable values={data} onDelete={onDeleteHandler} />
      ) : (
        <Empty message="Empty" />
      )}
    </SideBar>
  );
}

export default Dashboard;
