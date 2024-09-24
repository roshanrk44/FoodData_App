# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# FoodData_App
In this project, I developed a React application that interfaces with the Open Food Facts API to display and manage food product data. Here's a breakdown of the components and their functionalities:

##App Component:
This serves as the main entry point of the application, where I set up the Router to handle navigation between different components. I defined routes for the home page (Body), product details page (Info), and the search/input page (Input).

##NavBar Component:
The NavBar includes a link back to the home page. It uses react-router-dom for seamless navigation within the app, displaying a simple logo and a title.

##Body Component:
This component is responsible for fetching categories from the Open Food Facts API and displaying a list of food products. It allows users to select a category, sort the products, and paginate through them.
It also handles state management for the list of items, current page, selected category, and sorting options.

##Input Component:
The Input component is designed for searching products by name or barcode. It utilizes the Open Food Facts API to fetch product data based on the user's input.
It manages state for the search query, sort type, and results. The component also supports pagination to navigate through search results.

##Block Component:
The Block component displays individual product details, including the product image, name, category, and nutrition grade. It also provides a link to view more details about the product.

##Info Component:
This component displays detailed information about a specific product when a user clicks on a product from the Block. It fetches data from the Open Food Facts API using the product ID and presents various details like ingredients, nutrition values, and labels (vegan, vegetarian).

##Key Features Implemented:-
Dynamic Routing: Utilized react-router-dom to manage navigation and parameters in URLs.
API Integration: Implemented fetching data from the Open Food Facts API and handling responses and potential errors.
Sorting and Pagination: Incorporated sorting options for the product list and pagination to navigate through large sets of results.
State Management: Managed various states throughout the components using React's useState and useEffect hooks.
