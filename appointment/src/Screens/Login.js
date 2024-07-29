import React, { useEffect, useState } from "react";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LoginValidation } from "../Components/Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "./../Components/Notifications/Error";
import { loginAction } from "../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (email === "booking@gmail.com" && password === "123456789") {
          navigate("/dashboard");
          toast("login successfull");
        } else {
          navigate("/profile");
          toast("login successfull");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Welcome Back ${userInfo?.fullName}`);
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);

  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={signIn}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border"
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-full h-12 object-contain"
          />

          <div className="w-full">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {errors.email && <InlineError text={errors.email.message} />} */}
          </div>

          <div className="w-full">
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* {errors.password && <InlineError text={errors.password.message} />} */}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transitions hover:bg-main hover:bg-black flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {
              // if loading show loading
              isLoading ? (
                "Loading..."
              ) : (
                <>
                  <FiLogIn /> Sign In
                </>
              )
            }
          </button>
          <p className="text-center text-border">
            Don't have an account?
            <Link to="/register" className="text-dryGray font-semibold ml-2">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
