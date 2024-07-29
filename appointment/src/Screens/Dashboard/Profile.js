import React, { useEffect, useState } from "react";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../Components/Notifications/Error";
import { Imagepreview } from "../../Components/Imagepreview";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );

  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userDeleteProfile
  );
  // validate user

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  // on submit update profile
  const onSubmit = (data) => {
    //  update profile schema
  };

  // delete profile
  const deleteProfile = () => {
    // delete schema
  };

  // useEffect
  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      dispatch({ type: "USER_DELETE_PROFILE_RESET" });
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploder setImageUrl={setImageUrl} />
          </div>
          {/* image preview */}
          <div className="col-span-2">
            <Imagepreview
              image={imageUrl}
              name={userInfo ? userInfo.fullName : "Bookings"}
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            label="FullName"
            placeholder="FullName"
            type="text"
            name="fullName"
            register={register("fullName")}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>

        <div className="w-full">
          <Input
            label="Email"
            placeholder="jakintemi@gmail.com"
            type="email"
            name="email"
            register={register("email")}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>

        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-subMain font-medium transitions hover:bg-main hover:text-black border border-subMain text-white py-3 px-6  rounded w-full sm:w-auto"
          >
            Delete Account
          </button>

          <button className="bg-subMain font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6  rounded w-full sm:w-auto">
            Update Profile
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
