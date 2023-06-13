import React, { useState, useEffect, useRef } from "react";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Spinner from "./spinner";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { images } from "@/next.config";

function CreateRecipe({ session }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesFile, setSelectedImagesFile] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [description, setDescription] = useState("");
  const [timeHours, setTimeHours] = useState();
  const [timeMinutes, setTimeMinutes] = useState();
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [user, setUser] = useState(false);
  const [ingredientModal, setIngredientModal] = useState(false);
  const [instructionModal, setInstructionModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState([]);
  const [newInstructions, setNewInstructions] = useState([]);


  const [parent, enableAnimations] = useAutoAnimate();
  const token = session.user.token;
  const userId = session.user.account[0].user_id;
  const router = useRouter()

  //GET - fetches all categories
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
    const apiCallForCategories = await getAllCategories();
    setCategories(apiCallForCategories);
  };

  // POST - Recipe info
  const postRecipeInfo = async (
    userId,
    name,
    description,
    time_h,
    time_m,
    price
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/recipes/new`,
        {
          userId: userId,
          name: name,
          description: description,
          time_h: time_h,
          time_m: time_m,
          price: price,
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

  // POST - Recipe categories
  const postRecipeCategories = async (recipeId, categories) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/recipes/${recipeId}/categories/new`,
        {
          categories: categories,
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

  // POST - Recipe Images
  const postRecipeImages = async (recipeId, images) => {
    const imageData = new FormData();
    for (let i = 0; i < images.length; i++) {
      // console.log(images[i])
      imageData.append("images", images[i]);
    }

    // for(const val of formData.values()) {
    //   console.log(val)
    // }

    try {
      const response = await axios.post(
        `http://localhost:8000/recipes/${recipeId}/images/new`,
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // POST - Recipe ingredients
  const postRecipeIngredients = async (recipeId, ingredients) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/recipes/${recipeId}/ingredients/new`,
        {
          ingredients: ingredients,
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

  // POST - Recipe steps
  const postRecipeSteps = async (recipeId, steps) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/recipes/${recipeId}/steps/new`,
        {
          steps: steps,
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

  const createRecipe = async () => {
    let recipe = {
      name,
      description,
      timeHours,
      timeMinutes,
      price,
      categories,
      ingredients,
      instructions,
    };
    localStorage.setItem("recipe", JSON.stringify(recipe));

    const formIsReady = () => {
      return !!recipe.name && !!recipe.description && !!recipe.price && !!recipe.timeHours && !!recipe.timeMinutes && 
             !!category && !!ingredients.length && !!instructions.length && !!selectedImages
    }

    if(formIsReady()) {
      try {
        recipe = await postRecipeInfo(
          userId,
          recipe.name,
          recipe.description,
          recipe.timeHours,
          recipe.timeMinutes,
          recipe.price
        );
        const recipeId = recipe[0].recipe_id;
  
        // Call the other three functions with the recipeId
        await postRecipeCategories(recipeId, category);
        await postRecipeIngredients(recipeId, ingredients);
        await postRecipeSteps(recipeId, instructions);
        await postRecipeImages(recipeId, selectedImagesFile);
  
        localStorage.clear()
        toast.success('🖊️ Recipe Created!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        router.push("/main")
        
      } catch (error) {
        console.log(error);
  
      }
    } else {
      toast.error('🖊️ Error! Make sure to fill out all fields to save your recipe!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    //fetches categories to select
    fetchCategories();

    // saves data on to webs local storage
    const savedRecipe = localStorage.getItem("recipe");
    if (savedRecipe) {
      const parsedRecipe = JSON.parse(savedRecipe);
      setSelectedImages(parsedRecipe.selectedImages);
      setName(parsedRecipe.name);
      setCategory(parsedRecipe.category);
      setIngredients(parsedRecipe.ingredients);
      setInstructions(parsedRecipe.instructions);
    }
  }, []);

  const uploadImage = async (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImagesFile(selectedFilesArray);
    setSelectedImages(imagesArray);

    e.target.value = "";
  };

  const submitIngredient = (e) => {
    e.preventDefault();
    if (!newIngredient) return;
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient("");
  };

  const submitInstruction = (e) => {
    e.preventDefault();
    if (!newInstructions) return;
    setInstructions([...instructions, newInstructions]);
    setNewInstructions("");
  };

  const categoryChange = (e) => {
    const { value } = e.target;
    setCategory((prevSelectedOptions) => {
      // check if category is an array, and initialize it to an empty array if not
      const categoryArray = Array.isArray(prevSelectedOptions)
        ? prevSelectedOptions
        : [];
      
      if(!categoryArray.includes(value)) {
        return [...categoryArray, value];  
      } else {
        return categoryArray;
      }
    });
  };

  const deleteCategory = (value) => {
    setCategory(category.filter((category) => category !== value));
  };

  const deleteInstruction = (value) => {
    setInstructions(
      instructions.filter((instructions) => instructions !== value)
    );
  };

  const deleteIngredient = (value) => {
    setIngredients(
      ingredients.filter((ingredients) => ingredients !== value)
    );
  };

  const deleteImage = (image) => {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  };

  return (
    <div className="flex flex-col justify-center items-center lg:ml-20">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please add all fields.
        </p>
      )}
      <div className=" flex flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-3/5 w-full mt-12">
        <h2 className="text-5xl font-bold mb-4 font-serif">Create a Recipe 🥘 </h2>
        <h4 className="text-lg italic mb-4">
          Share your wonderful recipe to world!
        </h4>
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {wrongImageType && (
              <p className="text-red-700">It&apos;s wrong file type.</p>
            )}
            <label className="cursor-pointer">
              <div className="flex flex-col items-center justify-center h-full ">
                <div className="flex flex-col justify-center items-center">
                  <ArrowUpOnSquareIcon className="text-black h-8 w-8" />
                  <p className="text-lg">Click to upload images.</p>
                </div>

                <p className="mt-32 text-gray-400">
                  Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF, AVIF or
                  TIFF less than 20MB
                </p>
                <input
                  type="file"
                  name="upload-image"
                  className="w-0 h-0"
                  multiple
                  accept="image/png , image/jpeg, image/webp, image/gif, image/tiff, image/jpg, image/avif"
                  onChange={uploadImage}
                />
              </div>
            </label>

            <h2>Your Images</h2>
            {selectedImages &&
              selectedImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={"user images"}
                    onClick={() => deleteImage(image)}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <h4 className="text-xl font-bold">Title of Recipe.</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-md border-b-2 border-gray-200 p-2"
          />
          <h4 className="text-xl font-bold">Description of Dish.</h4>
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            placeholder="A really yummy dish!"
            className="outline-none text-lg sm:text-md font-md border-b-2 border-gray-200 p-2"
          />
          <div>
            <h4 className="text-xl font-bold">Time to Create.</h4>
            <input
              type="value"
              value={timeHours}
              onChange={(e) => {
                setTimeHours(e.target.value);
              }}
              placeholder="In hours, 1 = 1hr"
              className="outline-none text-lg sm:text-md font-md border-b-2 border-gray-200 p-2"
            />{" "}
            <input
              type="value"
              value={timeMinutes}
              onChange={(e) => {
                setTimeMinutes(e.target.value);
              }}
              placeholder="In minutes, 30 = 30mins"
              className="outline-none text-lg sm:text-md font-md border-b-2 border-gray-200 p-2"
            />
          </div>
          <h4 className="text-xl font-bold">Price.</h4>
          <select
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="" disabled selected>Select price range</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>{" "}
          <div>
            <h4 className="mb-2 font-bold text:lg sm:text-xl">
              Choose Recipe Categories.
            </h4>
            <div className="flex justify-between">
              <select
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                onChange={categoryChange}
              >
                <option value="" selected disabled>Select Categories</option>
                {categories &&
                  categories.map((item, index) => (
                    <>
                    <option
                      className="text-base border-0 outline-none text-black cursor-pointer"
                      value={item.name}
                      key={index}
                    >
                      {item.name}
                    </option>
                    </>
                  ))}
              </select>
            </div>
            <ul ref={parent}>
              {category &&
                category.map((item, index) => (
                  <li key={index} onClick={() => deleteCategory(item)}>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <div className="flex justify-between pr-4 items-center">
              <h2 className="font-bold text-2xl">Ingredients.</h2>
              <PlusIcon
                className="h-8 w-8 lg:h-6 lg:w-6 mr-2 bg-black text-white rounded-lg"
                onClick={() => setIngredientModal(!ingredientModal)}
              />
            </div>
            {ingredientModal && (
              <div className="fixed z-5 top-0 left-0 w-full h-full bg-black bg-opacity-40">
                <div className="bg-white w-2/5 mx-auto mt-32 rounded-md border border-gray-300">
                  <span
                    className="text-gray-500 text-right text-2xl block cursor-pointer p-4"
                    onClick={() => setIngredientModal(!ingredientModal)}
                  >
                    ×
                  </span>
                  <div className="p-2 flex flex-col items-center justify-center">
                    <form onSubmit={(e) => submitIngredient(e)}>
                      <input
                        className="w-full mb-4 p-2"
                        type="text"
                        placeholder="Type ingredient and quantity here!"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                      />
                      <button
                        className="bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
            <div ref={parent}>
              {ingredients &&
                ingredients.map((item,index) => (
                  <div>
                    <li
                      className="cursor-pointer m-4"
                      key={index}
                      onClick={() => deleteIngredient(item)}
                    >
                      {item}
                    </li>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-between pr-4 items-center">
            <h2 className="font-bold text-2xl mb-2">Steps.</h2>
            <PlusIcon
              className="h-8 w-8 lg:h-6 lg:w-6 mr-2 bg-black text-white rounded-lg"
              onClick={() => setInstructionModal(!instructionModal)}
            />
          </div>
          {instructionModal && (
            <div className="fixed z-5 top-0 left-0 w-full h-full bg-black bg-opacity-40">
              <div className="bg-white w-4/5 mx-auto mt-32 rounded-md border border-gray-300">
                <span
                  className="text-gray-500 text-right text-2xl block cursor-pointer p-4"
                  onClick={() => setInstructionModal(!instructionModal)}
                >
                  ×
                </span>
                <div className="p-2 flex flex-col items-center justify-center">
                  <form onSubmit={(e) => submitInstruction(e)}>
                    <textarea
                      className="w-full mb-4 p-2"
                      type="text"
                      placeholder="List instructions here! List one instruction at a time!!"
                      value={newInstructions}
                      onChange={(e) => setNewInstructions(e.target.value)}
                    />
                    <button
                      className="bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div ref={parent}>
            {instructions &&
              instructions.map((item, index) => (
                <ol
                  className="cursor-pointer"
                  key={index}
                  onClick={() => deleteInstruction(item)}
                >
                  <li className="m-4">{item}</li>
                </ol>
              ))}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={createRecipe}
                className="bg-green-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;
