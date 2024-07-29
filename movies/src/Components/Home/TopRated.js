import React, { useState } from "react";
import Titles from "./../Titles";
import {
  BsBookmarkStarFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../Notifications/Loader";
import { Empty } from "../Notifications/Empty";
import { useSelector, useDispatch } from "react-redux";

const SwiperTop = ({ prevEl, nextEl, val }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      slidesPerView={4}
      autoplay={true}
      speed={1000}
      // loop={true}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPreView: 1,
          spaceBetween: 10,
        },

        768: {
          slidesPreView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPreView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPreView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {val?.map((book, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
            <img
              src={book.imgUrl ? book.imgUrl : "/images/user.png"}
              alt={book?.names}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
              <button
                className={`w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full
                 ? "bg-subMain" : "bg-white bg-opacity-30"}
                 text-white`}
              >
                <FaHeart />
              </button>
              <Link
                className="font-semibold text-xl trancuted line-clamp-2"
                to="/#"
              >
                {book?.names}
              </Link>              
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

function TopRated({ isLoading, info }) {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevtEl] = useState(null);
  const className =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";
  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : info?.length > 0 ? (
          <SwiperTop nextEl={nextEl} prevEl={prevEl} val={info} />
        ) : (
          <Empty message="It seem's like we dont have any bookings" />
        )}

        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={className} ref={(node) => setPrevtEl(node)}>
            <BsCaretLeftFill />
          </button>

          <button className={className} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
