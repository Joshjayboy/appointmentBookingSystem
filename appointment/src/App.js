import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import NotFound from "./Screens/NotFound";
import SingleBooking from "./Screens/SingleBooking";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Profile from "./Screens/Dashboard/Profile";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import AddBooking from "./Screens/Dashboard/Admin/BookingList";
import ScrollOnTop from "./ScrollOnTop";
import DrawerContext from "./Context/DrawerContext";
import ToastContainer from "./Components/Notifications/ToastContainer";
import { ProtectedRoute } from "./ProtectedRoute";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BookingList from "./Screens/Dashboard/Admin/BookingList";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
function App() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <ToastContainer />
      <DrawerContext>
        <ScrollOnTop>
          <Routes>
            {/* ***************PUBLIC ROUTES ****************** */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/booking" element={<SingleBooking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addBooking" element={<AddBooking />} />
            {/* ***************PRIVATE ROUTES ****************** */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard></Dashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookinglist"
              element={
                <ProtectedRoute user={user}>
                  <BookingList></BookingList>
                </ProtectedRoute>
              }
            />
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  );
}

export default App;
