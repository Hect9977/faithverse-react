import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import VerseList from "./pages/VerseList";
import VerseCreate from "./pages/VerseCreate";
import VerseDetails from "./pages/VerseDetails";
import VerseEdit from "./pages/VerseEdit";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to="/verses" />} />

        <Route path="/verses" element={<VerseList />} />

        <Route path="/verses/create" element={<VerseCreate />} />

        <Route path="/verses/details/:verseId" element={<VerseDetails />} />

        <Route path="/verses/edit/:verseId" element={<VerseEdit />} />

        <Route
          path="/verses/delete/:verseId"
          element={
            <div className="container mt-4">
              <h2>Delete Verse Page Coming Next</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
