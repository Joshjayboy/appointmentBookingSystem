import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Bookings({ book }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const navigate = useNavigate();

  return (
    <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
      <NavLink to="/booking" state={{ book }}>
        <img
          src={book.imgUrl ? book.imgUrl : "/images/user.png"}
          alt={book?.names}
          className="w-full h-64 object-cover"
        />
      </NavLink>
      <div className="text-deep">
        <div>{book?.names}</div>
        <div>{book?.txtVal}</div>
      </div>
    </div>
  );
}

export default Bookings;
