import React, { useState, useEffect } from "react";
import ImageCarousel from "./imagecarousel";
import Comments from "./comments";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

function Recipe({recipeId, session}) {


  const id = recipeId
  const token = session.user.token;

  const [commentModal, setCommentModal] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [info, setInfo] = useState({
    recipe_id: 1,
    name: "Placeholder name",
    description: "Placeholder description",
    time_h: 0,
    time_m: 0,
    price: "$",
  });

  // GET - Recipe info by recipeId
  const getRecipeInfo = async (recipeId) => {
    try {
      const response = await axios.get(
        `${process.env.DOMAIN_NAME}/recipes/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // GET - Recipe categories by recipeId
  const getRecipeCategories = async (recipeId) => {
    try {
      const response = await axios.get(
        `${process.env.DOMAIN_NAME}/recipes/${recipeId}/categories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // GET - Recipe ingredients by recipeId
  const getRecipeIngredients = async (recipeId) => {
    try {
      const response = await axios.get(
        `${process.env.DOMAIN_NAME}/recipes/${recipeId}/ingredients`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // GET - Recipe steps by recipeId
  const getRecipeSteps = async (recipeId) => {
    try {
      const response = await axios.get(
        `${process.env.DOMAIN_NAME}/recipes/${recipeId}/steps`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // GET - Recipe images by recipeId
  const getRecipeImages = async (recipeId) => {
    try {
      const response = await axios.get(
        `${process.env.DOMAIN_NAME}/recipes/${recipeId}/images`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      return response.data
    } catch(error) {
      console.log(error)
    }
  }

  const toggleComments = () => {
    setCommentModal(!commentModal);
    setIsShowing(!isShowing);
  };

  async function fetchData() {
    // Recipe info
    const infoResponse = await getRecipeInfo(id);
    setInfo(infoResponse[0]);

    // Recipe images
    const imagesResponse = await getRecipeImages(id)
    setImages(imagesResponse)

    // Recipe categories
    const categoriesResponse = await getRecipeCategories(id);
    setCategories(categoriesResponse);

    // Recipe ingredients
    const ingredientsResponse = await getRecipeIngredients(id);
    setIngredients(ingredientsResponse);

    // Recipe steps
    const stepsResponse = await getRecipeSteps(id);
    setSteps(stepsResponse);
  }

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    async function fetchImageFiles() {
      const newData = await Promise.all(
        images.map(async (image) => {
          const response = await fetch(`${process.env.DOMAIN_NAME}/recipes/${recipeId}/images/${image.image_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          const blob = await response.blob()
          const url = URL.createObjectURL(blob)
          return { ...image, url }
        })
      )
      setImages(newData)
    }
    fetchImageFiles()
  }, [images])

  return (
    <div className="flex flex-col w-4/6 m-auto px-2">
      <div className="h-screen flex flex-col">
        <h4 className="text-center">{info.date ? info.date.slice(0, 10) : "Sample date"}</h4>
        <h2 className="text-6xl font-serif font-bold mb-4 mt-4 text-center">
          {info.name && `${info.name}.`}
        </h2>
        <p className="text-xl font-md text-center mb-2">
          <span className="text-md italic">{info.username}</span>
        </p>
        <div className="flex justify-between py-4 my-2 border-solid border-y-2 border-gray-600">
          <span className="text-m w-1/2 text-center align-middle border-r-2 border-gray-600">
              Prep time: { info.time_hours !== 0 ? `${info.time_hours} h` : `` } { info.time_minutes !== 0 ? `${info.time_minutes} min` : `` }
          </span>
          {/* <span className=" w-1/6 text-center">|</span> */}
          <span className="text-m w-1/2 text-center align-middle">
              Price: { info.price_range }
          </span>
        </div>
        <h3 className="text-md text-center p-6">
          {info.description}
        </h3>
        <div className="self-center md:max-w-screen-lg  mb-4">
          <ImageCarousel>
            {images.map((image) => (
              <img
                className="w-full h-full object-fill rounded-xl"
                src={image.url}
                alt="Recipe picture"
                key={image.image_id}
              />
            ))}
          </ImageCarousel>
        </div>
        <h2 className="text-5xl font-bold mb-4">Categories</h2>
        <div className="flex flex-row flex-wrap py-1 mb-3">
          {categories &&
            categories.map((category, index) => {
              return (
                <span
                  key={index}
                  className="border-2 rounded-2xl border-green-400 px-2 py-1 mr-1"
                >
                  {category.name}
                </span>
              );
            })}
        </div>

        <h2 className="text-5xl font-bold mb-4">Ingredients</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 list-none mb-3">
          {ingredients &&
            ingredients.map((ingredient, index) => {
              return (
                <li key={index} className="mb-2 mr-2">
                  {ingredient.description}
                </li>
              );
            })}
        </ul>

        <h2 className="text-5xl font-bold mb-4">Steps</h2>
        <ol className="list-decimal mx-4">
          {steps &&
            steps.map((step, index) => {
              return (
                <li key={index} className="mb-2">
                  {step.description}
                </li>
              );
            })}
        </ol>

        <div className="text-center">
          <button
            className="border-2 bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer"
            onClick={toggleComments}
          >
            Comments
          </button>
        </div>
        {commentModal && (
          <Comments
            toggleModal={toggleComments}
            isShowing={isShowing}
            setIsShowing={setIsShowing}
            token={token}
            session={session}
            id={id}
          />
        )}
      </div>
    </div>
  );
}

export default Recipe