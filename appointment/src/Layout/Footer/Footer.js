import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const Links = [
    {
      title: "Bookings",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About Us",
          link: "/about-us",
        },
        {
          name: "Contact Us",
          link: "/contact-us",
        },
        {
          name: "Appointments",
          link: "/#",
        },
      ],
    },

    {
      title: "Top Bookings",
      links: [
        {
          name: "Booking1",
          link: "#",
        },
        {
          name: "Booking2",
          link: "#",
        },
        {
          name: "Booking3",
          link: "#",
        },
        {
          name: "Booking4",
          link: "#",
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          name: "Dashboard",
          link: "/#",
        },
        {
          name: "My Favorites",
          link: "/#",
        },
        {
          name: "Profile",
          link: "/#",
        },
        {
          name: "Change Password",
          link: "/#",
        },
      ],
    },
  ];
  return (
    <div className="bg-border py-4 border-t-2 border-black">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                {link.title}
              </h3>

              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={text.link}
                      className="text-deep inline-block w-full hover:text-subMain"
                    >
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmuWU1lb0edmINrrb79kah4rN7Tw9nBHP6iw&s"
                alt="logoImage"
                className="w-2/4 object-contain h-12"
              />
            </Link>

            <p className="leading-7 text-sm text-deep mt-3">
              <span>
                This is how it works at <br /> Appointment Booking System
              </span>
              <br />
              <span>Tell: +234 816 064 1688</span>
              <br />
              <span> Email: bookings@gmail.com </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
