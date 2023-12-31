import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import MobileMenu from "./mobilemenu";
import { useMediaQuery } from "@/hooks/hooks";


function CategorySelector({session}) {
  // const fetcher = (...args) => fetch(...args).then(res => res.json())
  // const { data, error, isLoading } = useSWR('/localhost:8000/categories', fetcher)
  const [categories, setCategories] = useState([]);

  const token = session.user.token

  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${process.env.DOMAIN_NAME}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log('Categories cannot be fetched');
    }
  };

  const fetchCategories = async () => {
    const fetchedCategories = await getAllCategories()
    setCategories(fetchedCategories)
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const isMobile = useMediaQuery(640);


  return <>{isMobile ? null : <Sidebar categories={categories} />}</>;
}

export default CategorySelector;
