import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useFormik } from "formik";
import { ValidateUserForm } from "@/lib/validateForms";
import { createSuccessToast } from "@/utils/toastNotification";
import { createErrorToast } from "@/utils/toastNotification";
import { useRouter } from "next/router";
import axios from "axios";

function User({ session }) {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const accountName = session.user.account[0].username;
  const accountEmail = session.user.account[0].email;
  const accountId = session.user.account[0].user_id;
  const token = session.user.token;

  const router = useRouter();

  // PUT Request for editing account details
  const editUser = async (editedUsername, editedEmail) => {
    try {
      const response = await axios.put(
        `http://backend_container:8000/users/${accountId}/edit`,
        {
          username: editedUsername,
          email: editedEmail,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://backend_container:8000/users/${accountId}/delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getEditedUserDetails = (values) => {
    let editedUsername = values.username;
    let editedEmail = values.email;
    changeUserDetails(editedUsername, editedEmail);
  };

  const changeUserDetails = async (username, email) => {
    try {
      await editUser(username, email);
      handleSignOut()
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserAccount = async () => {
    try {
      await deleteUser(accountId);
      handleSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "http://localhost:3000" });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validate: ValidateUserForm,
    onSubmit: getEditedUserDetails,
  });

  console.log(session);
  console.log("Formik values", formik.values);

  return (
    <div className="flex flex-col items-center justify-center">
      {session && (
        <div>
          <p className="text-8xl bg-gray-300 text-center p-12 rounded-full mb-4">
            {session.user.account[0].username.charAt(0).toUpperCase()}
          </p>
          <p className="text-center text-4xl font-md">{`Hey ${accountName}!`}</p>
          <p className="text-center text-md text-gray-400 mt-2 mb-2">
            @{session.user.account[0].username}
          </p>
        </div>
      )}
      <div className="flex">
        <button
          className="text-center bg-rose-600 mt-4 mr-2 text-white text-lg rounded-full p-3"
          onClick={handleSignOut}
        >
          Sign Out ✌️
        </button>
        <button
          className="text-center border border-solid border-green-400 mt-4 text-black text-lg rounded-full p-3"
          onClick={() => setEditProfileModal(!editProfileModal)}
        >
          Edit Profile 📝
        </button>
      </div>
      {editProfileModal && (
        <form onSubmit={formik.handleSubmit} className="z-1000">
          <div className="fixed z-1000 top-0 left-0 w-full h-full bg-black bg-opacity-40">
            <div className="bg-white w-2/5 z-1000 mx-auto mt-16 rounded-md border border-gray-300 p-8">
              <span
                className="text-gray-500 text-right text-2xl block cursor-pointer"
                onClick={() => setEditProfileModal(!editProfileModal)}
              >
                ×
              </span>
              <div>
                <div className="p-2 flex flex-col items-center justify-center">
                  <h2 className="font-bold text-2xl mb-4">Account Details</h2>
                </div>
                <div>
                  <h3 className="mb-2">
                    Your current username is:{" "}
                    <span className="font-bold">{accountName}</span>
                  </h3>
                  <input
                    className="w-full mb-4 shadow-black rounded-full shadow-sm p-4"
                    type="text"
                    placeholder="Change your username here!"
                    {...formik.getFieldProps("username")}
                    name="username"
                  />
                  {formik.errors.username && formik.touched.username ? (
                    <span className="text-rose-600">
                      {formik.errors.username}
                    </span>
                  ) : (
                    <></>
                  )}
                  <h3 className="mb-2">
                    Your current email is:{" "}
                    <span className="font-bold">{accountEmail}</span>
                  </h3>
                  <input
                    className="w-full mb-4 shadow-black rounded-full shadow-sm p-4"
                    type="text"
                    placeholder="Change your email here!"
                    {...formik.getFieldProps("email")}
                    name="email"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <span className="text-rose-600">{formik.errors.email}</span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="text-center bg-green-500 mt-4 mr-2 text-white text-lg rounded p-2"
                  type="submit"
                >
                  Change User Details
                </button>
                <button
                  className="text-center bg-rose-600 mt-4 mr-2 text-white text-lg rounded p-2"
                  onClick={() => setDeleteModal(!deleteModal)}
                >
                  Delete Account
                </button>
              </div>
              <h2 className="font-bold text-center mt-4">Note: you will be logged out when you update your details, please login to view new details.</h2>
            </div>
          </div>
        </form>
      )}
      {deleteModal && (
        <div className="fixed z-1000 top-0 left-0 w-full h-full bg-black bg-opacity-40">
          <div className="bg-white w-2/5 z-1000 mx-auto mt-16 rounded-md border border-gray-300 p-8">
            <span
              className="text-gray-500 text-right text-2xl block cursor-pointer"
              onClick={() => setDeleteModal(!deleteModal)}
            >
              ×
            </span>
            <div className="p-2 flex flex-col items-center justify-center">
              <h2 className="font-bold text-2xl mb-4">
                Are you sure want to delete
              </h2>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="text-center bg-green-500 mt-4 mr-2 text-white text-lg rounded p-2"
                onClick={deleteUserAccount}
              >
                Yes!
              </button>
              <button className="text-center bg-rose-600 mt-4 mr-2 text-white text-lg rounded p-2">
                No.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
