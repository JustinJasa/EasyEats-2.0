-- create a database called easy_eats
CREATE DATABASE IF NOT EXISTS easy_eats;
USE easy_eats;

CREATE TABLE users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
);

CREATE TABLE recipes(
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    description VARCHAR(512),
    time_hours INT,
    time_minutes INT,
    price_range VARCHAR(3), -- Can be $, $$, or $$$
    date DATE, -- Date posted

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

    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- //////////////
-- Inserting initial data
-- //////////////
INSERT INTO users (username, email, password)
VALUES
    ('Walter Hartwell White', 'mrwhite@student.ju.se', 'theOneWhoKnocks'),
    ('Saul Goodman', 'saul@student.ju.se', 'hooverMaxExtractPressureProModel60'),
    ('Jesse Pinkman', 'jesse@student.ju.se', 'yoyoyo1483369'),
    ('Chuck McGill', 'chicanery@student.ju.se', 'iAmNotCrazy');

INSERT INTO categories (name)
VALUES
    ('Asian'),
    ('Mexican'),
    ('Fast'),
    ('Healthy'),
    ('Easy'),
    ('Advanced'),
    ('Vegetarian'),
    ('Noodles'),
    ('Pasta'),
    ('Italian'),
    ('Cheap'),
    ('Chicken'),
    ('Beef'),
    ('Pork'),
    ('Vegan'),
    ('Quick'),
    ('Drinks'),
    ('Protein'),
    ('Dairy'),
    ('Dessert'),
    ('Fruit'),
    ('Seafood'),
    ('Cheese'),
    ('Egg'),
    ('Alcohol'),
    ('Lunch'),
    ('Breakfast');

INSERT INTO recipes (user_id, name, description, time_hours, time_minutes, price_range, date)
VALUES
    ((SELECT user_id FROM users WHERE user_id = 1), 'Pasta Carbonara', 'A delicious and authenti Italian pasta 🍝', 0, 45, '$'),
    ((SELECT user_id FROM users WHERE user_id = 2), 'French Toast', 'Make this and good things will happen 😉💦', 0, 20, '$'),
    ((SELECT user_id FROM users WHERE user_id = 3), 'Halal Style Chicken and Rice', 'Comfort food thats healthy and packed with protein', 1, 5, '$$');

INSERT INTO ingredients (recipe_id, description)
VALUES
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Bacon or Guancale'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Pasta of any kind (preferably spaghetti)'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Pecorino or parmesan cheese'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), '3 eggs (per person)'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Salt'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Pepper'),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'White bread'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Bananas'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Blueberries'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Maple Syrup'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Egg'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Cinnamon'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Flour'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Butter'),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Butter'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Paprika'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Rice'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Salad (optional)'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Mayo'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Chicken thighs'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Cumin'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Turmeric'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Chicken stock'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Salt'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Garlic powder');

INSERT INTO recipe_categories (recipe_id, category_id)
VALUES
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), (SELECT category_id FROM categories WHERE category_id = 5)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), (SELECT category_id FROM categories WHERE category_id = 9)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), (SELECT category_id FROM categories WHERE category_id = 10)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), (SELECT category_id FROM categories WHERE category_id = 23)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), (SELECT category_id FROM categories WHERE category_id = 5)),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), (SELECT category_id FROM categories WHERE category_id = 19)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), (SELECT category_id FROM categories WHERE category_id = 21)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), (SELECT category_id FROM categories WHERE category_id = 24)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), (SELECT category_id FROM categories WHERE category_id = 27)),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), (SELECT category_id FROM categories WHERE category_id = 1)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), (SELECT category_id FROM categories WHERE category_id = 4)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), (SELECT category_id FROM categories WHERE category_id = 12)),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), (SELECT category_id FROM categories WHERE category_id = 18));

INSERT INTO steps (recipe_id, description)
VALUES
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'To create the sauce, add 3 egg yolks to half a cup of shredded cheese'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Chop the bacon/Guanciale and add it to the pan'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Crisp up the meat leaving the fat in the pan'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Boil hot water with salt, once boiling add the pasta in'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'When the pasta is cooked add the noodles to the pan with the meat. Mix the noodle and meat together'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Add the egg and cheese sauce, along with some pasta water to combine the sauce'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Once the eggs are softly set, remove them from the heat'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 1), 'Top with cheese and pepper and enjoy!'),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Coat your bread in an egg and flour mixture and set aside'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Heat up a pan with butter, and add the bread to the pan'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Pan fry until its nice and golden brown'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Add to a plate and add chop bananas and blueberry with a nice serving of maple syrup'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 2), 'Devour or serving to someone you care for and enjoy!'),

    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Marinate the chicken in mayo and the spice like paprika, cumin, salt pepper and garlic powder'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'For the rice, toast some tumeric in the pan and until fragrant but not burnt (about 30 seconds)'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Stir in the rice and cook add chicken stock. Cook for about 20 minutes'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Pan fry the chicken until cook. You can cut the chicken and toss in the pan to collect the chicken juices'),
    ((SELECT recipe_id FROM recipes WHERE recipe_id = 3), 'Serve the chicken and rice and enjoy the meal!');