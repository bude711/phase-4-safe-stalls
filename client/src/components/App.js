import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import '../styles/App.css';
import LocationList from "../pages/LocationList";
import NewBathroom from "../pages/NewBathroom";
import ReviewList from "../pages/ReviewList";


function App() {
  const [user, setUser] = useState(null);
  const [bathrooms, setBathrooms] = useState([]);
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    // auto-login
    fetch("api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("api/locations")
      .then((r) => r.json())
      .then(setBathrooms);
  }, []);

  useEffect(() => {
    fetch("api/reviews")
      .then((r) => r.json())
      .then(setReviews);
  }, []);


  if (!user) return <Login onLogin={setUser} />;


  function handleAddBathrooms(newBathrooms) {
    setBathrooms((bathrooms) => [...bathrooms, newBathrooms]);
  }

  function handleDeleteBathrooms(id) {
    setBathrooms((bathrooms) =>
      bathrooms.filter((bathroom) => bathroom.id !== id));
  }


  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/locations" element={<LocationList bathrooms={bathrooms} onDeleteBathrooms={handleDeleteBathrooms}/>}>
          </Route>

          <Route path="/new" element={<NewBathroom onAddBathrooms={handleAddBathrooms} user={user} />}>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;