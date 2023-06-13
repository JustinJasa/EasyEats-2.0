import React from "react";
import { Fade } from "react-awesome-reveal";


function MobileMenu() {
  let categories = [
    "Recommended",
    "Top-Picks",
    "Asian",
    "Poultry",
    "Meat",
    "Middle-East",
    "Quick",
    "Cheap",
    "Noodles",
    "Vegan",
    "Beef",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Dessert",
    "Savory",
    "Spicy",
    "Non-Spicy",
  ];

  return (
    <div className="flex overflow-x-scroll p-6 mb-4 ">
      {categories.map((category, index) => {
        return (
          <nav key={index} className="flex flex-row">
            <Fade cascade damping={0.2}>
            <li className="list-none font-bold mr-4 ml-4 whitespace-nowrap bg-gray-500 p-2 rounded-xl text-white :hover">{category}</li>
            </Fade>
          </nav>
        );
      })}
    </div>
  );
}

export default MobileMenu;
