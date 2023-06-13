import React from "react";
import { FaRegEnvelope, FaKey, FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import { ValidateSignUp } from "@/lib/validateForms";
import { useRouter } from "next/router";
import axios from "axios";
import { createSuccessToast, createErrorToast } from "@/utils/toastNotification";


const register = async (username, email, password) => {
  try {
      const response = await axios.post(`http://localhost:8000/auth/signup`, {
          username: username,
          email: email,
          password: password
      })
      return response.data
  } catch(error) {
      console.log(error)
  }
}

export default function SignUpCard() {

  const router = useRouter()

  const signUp = async (values) => {
    const {username, email, password, confirmPassword} = values
    const res = await register(username, email, password)

    if(!res){
      createErrorToast("Sorry something when wrong 😭 Try Again!")
      throw new Error("Could not register account. Try Again!")
    }

    router.push("http://localhost:3000/login")
    createSuccessToast("Account Created 😌 Please login!")

  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: ValidateSignUp,
    onSubmit: signUp,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="max-w-[400px] w-full mx-auto bg-white p-8 px-8 rounded-lg text-center shadow-lg shadow-gray-400">
        <h2 className="text-3xl font-bold mb-2">Create Account</h2>

        {formik.errors.username && formik.touched.username ? (
          <span className="text-rose-600">{formik.errors.username}</span>
        ) : (
          <></>
        )}
       
        <div className="flex justify-center mb-2">
          <div className="bg-gray-100 flex items-center w-64 p-2">
            <FaUser className="mr-2" />
            <input
              type="text"
              name="user"
              placeholder="Username"
              className="bg-gray-100 outline-none flex-1"
              {...formik.getFieldProps("username")}
            />
          </div>
        </div>

        {formik.errors.email && formik.touched.email ? (
          <span className="text-rose-600">{formik.errors.email}</span>
        ) : (
          <></>
        )}

        <div className="flex justify-center mb-2">
          <div className="bg-gray-100 flex items-center w-64 p-2">
            <FaRegEnvelope className="mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-100 outline-none flex-1"
              {...formik.getFieldProps("email")}
            />
          </div>
        </div>

        {formik.errors.password && formik.touched.password ? (
          <span className="text-rose-600">{formik.errors.password}</span>
        ) : (
          <></>
        )}



        <div className="flex justify-center mb-2">
          <div className="bg-gray-100 flex items-center w-64 p-2">
            <FaKey className="mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-gray-100 outline-none flex-1"
              {...formik.getFieldProps("password")}
            />
          </div>
        </div>

        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <span className="text-rose-600">{formik.errors.confirmPassword}</span>
        ) : (
          <></>
        )}


        <div className="flex justify-center">
          <div className="bg-gray-100 flex items-center w-64 p-2">
            <FaKey className="mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className="bg-gray-100 outline-none flex-1"
              {...formik.getFieldProps("confirmPassword")}
            />
          </div>
        </div>

        <button
          type="submit"
          className="border-2 bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}
