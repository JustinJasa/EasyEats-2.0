import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import MobileMenu from "./mobilemenu";
import { useMediaQuery } from "@/hooks/hooks";
import { useSession } from "next-auth/react";
import axios from "axios";

function CategorySelector({session}) {
  // const fetcher = (...args) => fetch(...args).then(res => res.json())
  // const { data, error, isLoading } = useSWR('/localhost:8000/categories', fetcher)
  const [categories, setCategories] = useState([]);

  const token = session.user.token

  const getAllCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    const apiCall = await getAllCategories()
    setCategories(apiCall)
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const isMobile = useMediaQuery(640);


  return <>{isMobile ? null : <Sidebar categories={categories} />}</>;
}

export default CategorySelector;
