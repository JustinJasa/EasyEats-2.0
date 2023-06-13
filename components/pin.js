import React, { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { createSuccessToast } from "@/utils/toastNotification";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

function Pin({ pin, index, session, searchParameter, id }) {
  const [imageURL, setImageURL] = useState("https://picsum.photos/300");
  const [categories, setCategories] = useState([]);
  const [deleteModal, setDeleteModal] = useState();
  const [height, setHeight] = useState();
  const heights = [24, 48, 32, 80];


  const token = session.user.token;
  const userId = session.user.accountData[0].user_id;
  const router = useRouter()


  const urlParameter = searchParameter;

  const getRecipeImage = async (recipeId, imageId) => {
    try {
      if (imageId === null) {
        throw "Image is null";
      }

      const response = await fetch(
        `http://localhost:8000/recipes/${recipeId}/images/${imageId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      setImageURL(url);
    } catch (error) {
      switch (error) {
        case "Image is null": {
          console.log(error);
          break;
        }
        default: {
          console.log(error);
          break;
        }
      }
    }
  };


  const deleteRecipeRequest = async (recipeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/recipes/${recipeId}/delete`, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  

  const getRecipeCategories = async (recipeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/recipes/${recipeId}/categories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomHeight = (heights) => {
    // generate a random index between 0 and the length of the array minus 1
    const randomIndex = Math.floor(Math.random() * heights.length);
    // return the element at the random index
    return heights[randomIndex];
  }

  const fetchCategories = async () => {
    const response = await getRecipeCategories(index);
    setCategories(response);
  }

  const deleteRecipeHandler = async (id) => {
    const response = await deleteRecipeRequest(id)
    createSuccessToast("Recipe Successfully Deleted!")
    setDeleteModal(!deleteModal)
    return response.data
  }

  useEffect(() => {
    const length = getRandomHeight(heights);
    setHeight(length);
    getRecipeImage(index, pin.image_id);
    fetchCategories();
  }, []);

  return (
    <div
      key={index}
      className={`align-center content-center rounded-xl m-4 p-2 shadow-xl`}
    >
      <Link href={`/recipe/${encodeURIComponent(id)}`}>
        {imageURL && (
          <img
            className={`rounded-2xl h-${height} w-full object-cover`}
            src={imageURL}
            alt="Main pin image"
          ></img>
        )}
        <h2 className="italic text-sm text-gray-500 mt-2 mb-2">
          {pin.date ? pin.date.slice(0, 10) : "Sample date"}
        </h2>
        <div className="flex flex-wrap">
          {categories &&
            categories.map((category, index) => {
              return (
                <span
                  key={index}
                  className="border-2 rounded-2xl border-green-400 px-2 py-1 mr-1 text-xs"
                >
                  {category.name}
                </span>
              );
            })}
        </div>
        <h2 className="font-bold font-serif text-xl mt-2">{pin.name}</h2>
        <h3 className="font-bold mr-2">{pin.username}</h3>
      </Link>

      {urlParameter.includes("users") && (
        <div className="flex items-center justify-between mt-4">
          <button className="text-2xl mr-4 p-1 cursor-pointer" onClick={() => router.push(`/edit/${pin.recipe_id}`)}>
            ✏️
          </button>
          <button className="text-2xl p-1 cursor-pointer" onClick={() => setDeleteModal(!deleteModal)}>
            🗑️
          </button>
        </div>
      )}

      {deleteModal && (
            <div className="fixed z-100 top-0 left-0 w-full h-full bg-black bg-opacity-40">
              <div className="bg-white w-2/5 mx-auto mt-32 rounded-md border border-gray-300 p-8">
                <span
                  className="text-gray-500 text-right text-2xl block cursor-pointer p-4"
                  onClick={() => setDeleteModal(!deleteModal)}
                >
                  ×
                </span>
                <div>
                <div className="p-2 flex flex-col items-center justify-center">
                  <h4 className="font-bold">Are you sure you want to delete this Recipe?</h4>
                </div>
                <div className="p-2 flex items-center justify-center">
                  <button className="text-center bg-rose-600 mt-4 mr-2 text-white text-lg rounded p-2" onClick={() => deleteRecipeHandler(pin.recipe_id)}>Yes, I Do!</button>
                  <button className="text-center bg-green-500 mt-4 mr-2 text-white text-lg rounded p-2" onClick={() => setDeleteModal(!deleteModal)}>Nah just kidding 😆</button>
                </div>
                </div>
               
              </div>
            </div>
          )}
    </div>
  );
}

export default Pin;
