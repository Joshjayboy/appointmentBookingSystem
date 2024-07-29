import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import { FaPlay, FaShareAlt } from "react-icons/fa";
import DateTimeModal from "./DateTimeModal";
import { useLocation } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { txtDB, imgDB } from "../firebase";
function SingleBooking() {
  const location = useLocation();
  const { book } = location.state;
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSave = async (date, time) => {
    console.log(`Scheduled for: ${date} at ${time}`);
    console.log(book.id);
    const single = book.id;
    setShowModal(false);
    try {
      const docRef = doc(txtDB, "txtData", single);
      await updateDoc(docRef, {
        newDate: date,
        newTime: time,
      });
      alert("Data updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return (
    <Layout>
      <div className="w-full xl:h-screen relative text-deep">
        <img
          src={book.imgUrl}
          alt="mmmmm"
          className="w-full hidden xl:inline-block h-full object-cover"
        />
        <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
          <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
            <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
              <img
                src={book.imgUrl ? book.imgUrl : "/images/user.png"}
                alt={book.txtVal}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
              <div className="col-span-3 flex flex-col gap-10">
                <h3 className="xl:text-xl capitalize font-sans text-2xl font-bold">
                  name: {book.names}
                </h3>
                <h1 className="xl:text-xl capitalize font-sans text-2xl font-bold">
                  Date: {book.txtVal}
                </h1>
                <h1 className="xl:text-xl capitalize font-sans text-2xl font-bold">
                  Start Time: {book.startTime}
                </h1>
                <h1 className="xl:text-xl capitalize font-sans text-2xl font-bold">
                  End Time: {book.endTime}
                </h1>

                <div className="flex items-center gap-4 font-medium text-dryGray">
                  <div className="flex-colo bg-subMain text-xs px-2 py-1">
                    Available
                  </div>
                </div>
                <p className="text-deep text-sm leading-7">description</p>
                <p className="text-deep text-sm leading-7">
                  I am available at the time I scheduled Thank You!
                </p>
                <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                  <div className="col-span-1 flex-colo border-r border-border">
                    <button className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20">
                      <FaShareAlt />
                    </button>
                  </div>

                  <div className="col-span-2 flex-colo font-medium text-sm">
                    <p>
                      Language : <span className="ml-2 truncate">English</span>
                    </p>
                  </div>
                  <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                    <button
                      onClick={handleModalOpen}
                      className="bg-star py-4 hover:bg-subMain transitons border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3"
                    >
                      <FaPlay className="w-3 h-3" /> RE Schedule
                    </button>
                    <DateTimeModal
                      show={showModal}
                      handleClose={handleModalClose}
                      handleSave={handleSave}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SingleBooking;
