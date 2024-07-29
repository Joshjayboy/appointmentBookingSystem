// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// // public protection
// function ProtectedRouter() {
//   const { userInfo } = useSelector((state) => state.userLogin);

//   return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
// }

// // admin router protection
// function AdminProtectedRouter() {
//   const { userInfo } = useSelector((state) => state.userLogin);
//   return userInfo?.token ? (
//     userInfo?.isAdmin ? (
//       <Outlet />
//     ) : (
//       <Navigate to="/*" />
//     )
//   ) : (
//     <Navigate to="/login" />
//   );
// }

// export { ProtectedRouter, AdminProtectedRouter };

// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// // import { useAuthState } from "react-firebase-hooks/auth";
// import { getAuth } from "firebase/auth";
// import { auth } from "./firebase";

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const [user, loading, error] = getAuth(auth);
//   // const [user, loading, error] = useAuthState(auth);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const isAuthenticated =
//     user && user.email === "jakin@gmail.com" && user.password === "1234565";

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
// };

// export default ProtectedRoute;

// // ProtectedRoute.js
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// // import auth from "./firebase";
// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

// const ProtectedRoute = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         console.log(userCredential);
//         if (email === "booking@gmail.com" && password === "123456789") {
//           navigate("/dashboard");
//           toast("login successfull");
//         } else {
//           navigate("/profile");
//           toast("login successfull");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     return () => unsubscribe();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return isAuthorized ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/"></Navigate>;
};
