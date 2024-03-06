# CS555 Agile Methods for Software Development project

Team 3	Agile Avengers	Option 3

| Krovvidi, Anurag     |
| -------------------- |
| Cen, Mengze          |
| Kunam, Kireeti       |
| Tang, Yunfei         |
| Wusirika, Sai Kruthi |

1. install the dependencies

   ```
   npm install
   ```

2. Usage

   a) You can start the project by running

   ```
   npm start
   ```

   b) Once the project is running, you can view the home page by navigating to http://localhost:3000 in your web browser. or 

# Build the Docker image
docker build -t frontend .
<!-- 
   This command runs a Docker container with the name "frontend" and maps port 3000 of the host machine to port 3000 of the container.
-->
docker run -p 3000:3000 frontend