/*Exercise 1 : React Router Error Boundary
In a new Javascript file, create an ErrorBoundary Class Component:
  Create a state with a property named hasError, set by default to false.
  Use a componentDidCatch() method to set the value of the hasError property.
Install React Router Dom in your app and check out the NavLink documentation
In the App.js file, add this line:
  import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
You can also install React Bootstrap in your app. In the App.js file, add this line:
  import "bootstrap/dist/css/bootstrap.min.css";
In the App.js file, display a Bootstrap navbar, containing three React Router <NavLink></NavLink>:
  the first one redirects to /
  the second one redirects to /profile
  the third one redirects to /shop
In the App.js file, create three functional components : HomeScreen, ProfileScreen, and ShopScreen.
  HomeScreen and will display a header tag
  ProfileScreen will display a header tag
  ShopScreen will throw an error
7. Add a Route for each of the functional component. Each one has a different path.
8. Wrap each of the functional component with the ErrorBoundary component.*/

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeScreen = () => (
  <div className="container mt-4">
    <h1>Home</h1>
  </div>
);

const ProfileScreen = () => (
  <div className="container mt-4">
    <h1>Profile</h1>
  </div>
);

const ShopScreen = () => {
  throw new Error("An Error occurred!");
  return (
    <div className="container mt-4">
      <h1>Shop</h1>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"}>
              Home
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"}>
              Profile
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"}>
              Shop
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          } 
        />
        <Route path="/profile" element={
            <ErrorBoundary>
              <ProfileScreen />
            </ErrorBoundary>
          } 
        />
        <Route path="/shop" element={
            <ErrorBoundary>
              <ShopScreen />
            </ErrorBoundary>
          } 
        />
      </Routes>
    </BrowserRouter>
);

export default App;
