import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filters from "./../Components/Filters";
import Bookings from "../Components/Bookings";
import { CgSpinner } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "./../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../Data/FilterData";
import { useParams } from "react-router-dom";

function MoviesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "All Catagories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";

  const datas = {
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {/* {Movies ? movies?.length : 0} */}
          </span>{" "}
          items Found
          {search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : data?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {data.map((value, index) => (
                <Bookings key={index} image={value} text={value.names} />
              ))}
            </div>
            {/* Loading More */}

            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button>
                <TbPlayerTrackPrev className="text-xl" />
              </button>

              <button>
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              it seem's like we dont have any available bookings
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
