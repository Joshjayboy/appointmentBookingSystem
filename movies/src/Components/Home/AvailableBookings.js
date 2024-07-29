import React, { useState, useEffect } from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import Bookings from "../Bookings";

function AvailableBookings({ info }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="my-16">
      <Titles title="Available Appointments" Icon={BsCollectionFill} />

      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {info.map((values, index) => (
          <Bookings key={index} book={values} />
        ))}
      </div>
    </div>
  );
}

export default AvailableBookings;
