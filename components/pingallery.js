import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pin from "./pin";
import Masonry from "react-masonry-css";
import { Fade } from "react-awesome-reveal";
import {
  getRecipeInfo,
  getRecipeCategories,
  getRecipeIngredients,
  getRecipeSteps,
} from "@/utils/apiRoutes";
import axios from "axios";
import { useRouter } from "next/router";


const breakpointColumnsObj = {
  default: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

function PinGallery({ session }) {
  const [pins, setPins] = useState([]);

  const token = session.user.token;
  const router = useRouter();

  const searchParameter = router.asPath;
  const searchQuery = router.query;


  const getAllRecipes = async () => {
    try {
      const response = await axios.get(`${process.env.DOMAIN_NAME}/recipes/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchedRecipesByName = async () => {
    // If search query is empty, fetch all recipes route
    const route = searchQuery.search === "" ? `${process.env.DOMAIN_NAME}/recipes/all` : `${process.env.DOMAIN_NAME}/recipes/name/${searchQuery.search}`
    try {
      const response = await axios.get(
        route,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipesById = async () => {
    // If search query is empty, fetch all recipes route
    const route = `${process.env.DOMAIN_NAME}/recipes/user/${searchQuery.userName}`
    try {
      const response = await axios.get(
        route,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchedRecipesByCategory = async () => {
    try {
      const route = searchQuery.category === "" ? `${process.env.DOMAIN_NAME}/recipes/all` : `${process.env.DOMAIN_NAME}/recipes/category/${searchQuery.category}`
      const response = await axios.get(
        route,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPins = () => {
    if (searchParameter.includes("category")) {
      getSearchedRecipesByCategory();
    } else if (searchParameter.includes("search")) {
      getSearchedRecipesByName();
    } else if (searchParameter.includes("users")){
      getRecipesById()
    } else {
      getAllRecipes();
    }
  };

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <>
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={breakpointColumnsObj}
      >
        {pins.map((pin) => (
          <div key={pin.recipe_id}>
            <Fade cascade damping={0.1}>
                <Pin
                  pin={pin}
                  index={pin.recipe_id}
                  session={session}
                  className="w-max"
                  searchParameter={searchParameter}
                  id={pin.recipe_id}
                />
            </Fade>
          </div>
        ))}
      </Masonry>
    </>
  );
}

export default PinGallery;
