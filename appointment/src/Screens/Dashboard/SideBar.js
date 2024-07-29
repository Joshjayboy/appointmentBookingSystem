import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import {
  RiLockPasswordLine,
  RiLogoutCircleLine,
  RiMovie2Fill,
} from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../Redux/Actions/userActions";
import { toast } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function SideBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  // logout function
  const logOutHandler = () => {
    dispatch(logoutAction());
    toast.success("Logged out successfully");
    navigate("/login");
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const SideLinks = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: BsFillGridFill,
    },
    {
      name: "Appointement List",
      link: "/bookinglist",
      icon: FaListAlt,
    },
    {
      name: "Add Time",
      link: "/#",
      icon: RiMovie2Fill,
    },
    {
      name: "Update Profile",
      link: "/profile",
      icon: FiSettings,
    },
    {
      name: "Change Password",
      link: "/#",
      icon: RiLockPasswordLine,
    },
  ];

  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-black hover:bg-main ";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {
              // sidebar Links
              SideLinks.map((link, index) => (
                <NavLink to={link.link} key={index} className={Hover}>
                  <link.icon /> <p>{link.name}</p>
                </NavLink>
              ))
            }

            <button
              onClick={logOutHandler}
              className={`${inActive} ${hover} w-full`}
            >
              <RiLogoutCircleLine /> Log Out
            </button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="200"
            className="col-span-6 rounded-md bg-dry border border-gray-800 p-6"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SideBar;
