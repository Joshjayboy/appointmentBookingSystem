import React, { useEffect, useState } from "react";
import SideBar from "./../SideBar";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import Uploder from "./../../../Components/Uploder";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Components/Models/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { Imagepreview } from "./../../../Components/Imagepreview";
import { InlineError } from "../../../Components/Notifications/Error";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import { txtDB, imgDB } from "../../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

function AddMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [txt, setTxt] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [fullname, setFullname] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState([]);

  // use selector
  const { categories } = useSelector((state) => state.categoryGetAll);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovie
  );

  const { casts } = useSelector((state) => state.casts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgDB, `Imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        setImg(val);
      });
    });
  };

  const handleClick = async () => {
    const valRef = collection(txtDB, "txtData");
    await addDoc(valRef, {
      names: fullname,
      txtVal: txt,
      imgUrl: img,
      startTime: start,
      endTime: end,
    });
    alert("Data added successfully");
  };
  const getData = async () => {
    const valRef = collection(txtDB, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    console.log(allData);
  };

  useEffect(() => {
    getData();
  });
  useEffect(() => {
    if (modalOpen === false) {
      setCast();
    }
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: 0,
        Category: "",
        desc: "",
      });
      setImageTitle("");
      setImageWithoutTitle("");
      setVideoUrl("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      navigate("/addMovie");
    }
    if (isError) {
      toast.error("Something went wrong");
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);
  return (
    <SideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Create Time Available</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Full Name"
              placeholder="Joshua Akintemi"
              type="text"
              bg={true}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="w-full">
            <Input
              label="Hours"
              placeholder="2hr"
              type="number"
              bg={true}
              name="time"
              register={register("time")}
            />
            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Language Used"
              placeholder="English"
              type="text"
              bg={true}
              name="language"
              register={register("language")}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>

          <div className="w-full">
            <Input
              label="Date"
              placeholder="12/5/2024"
              type="date"
              bg={true}
              onChange={(e) => setTxt(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Start Time"
              placeholder="18:00 PM"
              type="time"
              bg={true}
              onChange={(e) => setStart(e.target.value)}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>

          <div className="w-full">
            <Input
              label="End Time"
              placeholder="20:00 PM"
              type="time"
              bg={true}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
        <Input type="file" onChange={(e) => handleUpload(e)} />

        <br />
        <br />

        <button
          disabled={isLoading}
          onClick={handleClick}
          className="bg-subMain w-full flex-rows gap-6 font-medium  text-white py-4 rounded"
        >
          {isLoading ? (
            "Please wait..."
          ) : (
            <>
              <ImUpload /> Publish Appointment Time
            </>
          )}
        </button>
      </div>
    </SideBar>
  );
}

export default AddMovie;
