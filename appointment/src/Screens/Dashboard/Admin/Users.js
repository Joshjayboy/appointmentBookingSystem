import React, { useEffect } from "react";
import Table2 from "../../../Components/Table2";
import SideBar from "./../SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAction,
  deleteUserAction,
} from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";

function Users() {
  const dispatch = useDispatch();

  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );

  // delete
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );

  // delete user handler

  // useEffect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Users</h2>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={deleteMoviesHandler}
          />
        ) : (
          <Empty message="You don't have any user" />
        )}
      </div>
    </SideBar>
  );
}

export default Users;
