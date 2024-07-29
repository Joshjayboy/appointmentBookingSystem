import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useSelector } from "react-redux";

function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const hover = "hover:text-subMain transitions text-black";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/#`);
      setSearch(search);
    } else {
      navigate(`/profile`);
    }
  };

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* logo */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmuWU1lb0edmINrrb79kah4rN7Tw9nBHP6iw&s"
                alt="logoImage"
                className="w-full h-12 object-contain"
              />
            </Link>
          </div>

          {/* search Form */}

          <div className="col-span-3">
            <form
              onSubmit={handleSearch}
              className="w-full text-sm bg-dryGray rounded flex-btn gap-4"
            >
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              >
                <FaSearch />
              </button>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search appointments from here"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>

          {/* menus */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/#" className={Hover}>
              Bookings
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <NavLink to="/profile" className={Hover}>
              {userInfo ? (
                <img
                  src={userInfo?.image ? userInfo?.image : "/images/user.png"}
                  alt={userInfo?.fullName}
                  className="w-8 h-8 rounded-full border object-cover border-subMain"
                />
              ) : (
                <CgUser className="w-8 h-8" />
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
