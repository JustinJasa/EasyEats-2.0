-- create a database called easy_eats
CREATE DATABASE IF NOT EXISTS easy_eats;
USE easy_eats;

CREATE TABLE users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE recipes(
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    description VARCHAR(512),
    time_hours INT,
    time_minutes INT,
    price_range VARCHAR(3), -- Can be $, $$, or $$$
    date DATE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE images(
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    name VARCHAR(255),
    path VARCHAR(255),

    FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE ingredients(
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    description VARCHAR(255),

    FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE steps(
    step_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    description VARCHAR(512),

    FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE categories(
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE recipe_categories(
    recipe_id INT,
    category_id INT,

    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (category_id) REFERENCES categories (category_id)
);

CREATE TABLE comments(
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    recipe_id INT,
    comment VARCHAR(1024),
    rating INT, -- between 1-5

    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- //////////////
-- Inserting initial data
-- //////////////
INSERT INTO users (username, email, password)
VALUES
    ('Michael Scott', 'michael@gmail.com', 'michael123'),
    ('John Smith', 'john@gmail.com', 'john456'),
    ('Jesse Pinkman', 'jesse@gmail.com', 'yoyoyo1483369'),
    ('Lucy Williams', 'lucy@gmail.com', 'lucy789');

INSERT INTO categories (name)
VALUES
    ('Asian'),
    ('Mexican'),
    ('Fast'),
    ('Healthy'),
    ('Easy'),
    ('Advanced'),
    ('Vegetarian');

INSERT INTO recipes (user_id, name, description, time_hours, time_minutes, price_range)
VALUES
    ((SELECT user_id FROM users WHERE user_id = 1), 'Bacon and eggs', 'Tasty dish that requires few ingredients and is not time consuming', 0, 15, '$'),
    ((SELECT user_id FROM users WHERE user_id = 1), 'Quesadillas', 'Basic dish from Mexico. Simple, tasty, and quick.', 0, 15, '$'),
    ((SELECT user_id FROM users WHERE user_id = 2), 'Spaghetti bolognese', 'Delicious food that anyone can make. The taste is very good and it can last for multiple servings', 0, 30, '$$');

INSERT INTO ingredients (recipe_id, description)
VALUES
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), '2 large eggs'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), '3 strips of bacon'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Oil'),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Corn of flour tortillas'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Shredded cheese of your choice'),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), '200 grams of spaghetti'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), '200 grams of ground beef'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), '1/2 onion, diced'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), '1 tomato, diced'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), '1 jar of Classic tomato pasta sauce'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Oil');

INSERT INTO recipe_categories (recipe_id, category_id)
VALUES
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), (SELECT category_id FROM categories WHERE category_id = 3)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), (SELECT category_id FROM categories WHERE category_id = 5)),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), (SELECT category_id FROM categories WHERE category_id = 2)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), (SELECT category_id FROM categories WHERE category_id = 3)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), (SELECT category_id FROM categories WHERE category_id = 5)),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), (SELECT category_id FROM categories WHERE category_id = 5));

INSERT INTO steps (recipe_id, description)
VALUES
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Crack eggs into a small bowl'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Whisk eggs for 30 seconds'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Pour a bit of oil onto 2 pans and set them to medium heat'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Once the pan is hot, place the strips of bacon for 2.5 minutes, then turn and wait the same time'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Pour the eggs onto the other pan and let them sit for 20 seconds'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Use a spatula mix the eggs and fold them over'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Once the eggs are softly set, remove them from the heat'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Remove the bacon from the heat, and also remove their excess grease with a napkin'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Place bacon and eggs on a plate and enjoy'),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Heat up a pan to medium heat'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Once pan is hot, place the tortilla and let it sit for 20 seconds'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Flip the tortilla over'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Place shredded cheese on the tortilla and fold it in half'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Let the folded tortilla sit for 30 seconds and then flip it'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Once the cheese is melted, remove from heat and serve'),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Pour 750 ml of water into a pot and put it to high heat'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Pour a bit of oil onto a pan and set to medium-high heat'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'When pan is hot, place onions and spread them evenly. Mix for 1 minute'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Place ground beef on pan and use a spoon or spatula to separate it into small pieces'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Mix beef and onions for 2 minutes, then place the diced tomato'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Place the spaghetti into the boiling water, stir from time to time for a total of 8-10 minutes'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Once the spaghetti is almost done, pour the tomato sauce into the pan with the beef, onions, and tomatos. Mix for 1 minute'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Drain the water from the spaghetti pot and place the contents of the pan in it. Mix to combine all ingredients'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Serve');

INSERT INTO comments (user_id, recipe_id, comment, rating)
VALUES
    ((SELECT user_id FROM users WHERE user_id = 2), (SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Thank you very much for sharing this recipe! Very tasty!', 5),
    ((SELECT user_id FROM users WHERE user_id = 3), (SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Delicious! I will cook this for my friends!', 5),
    ((SELECT user_id FROM users WHERE user_id = 4), (SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Good taste! :)', 4),
    ((SELECT user_id FROM users WHERE user_id = 4), (SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Very nice, delicious and easy to make!', 5);
