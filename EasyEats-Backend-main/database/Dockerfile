# Use an official MySQL 8.0 runtime as a parent image
FROM mysql:8.0 as build1

# Copy the SQL script to initialize the database to the container
COPY ./database.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD=12345
# ENV MYSQL_USER=your_user
# ENV MYSQL_PASSWORD=your_password

# Optionally, set the database name if you want to create a new database
ENV MYSQL_DATABASE=easy_eats

# Expose port 3306 for MySQL connections
EXPOSE 3306
