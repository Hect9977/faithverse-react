import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FaithverseService from "../services/faithverseService";

const VerseDetails = () => {
  const { verseId } = useParams();
  const navigate = useNavigate();

  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadVerse();
  }, []);

  const loadVerse = async () => {
    try {
      const response = await FaithverseService.getVerseById(verseId);

      // Some APIs return one object, others return an array with one object.
      const verseData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      setVerse(verseData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading verse details:", error);
      setErrorMessage("Unable to load verse details.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h3>Loading verse details...</h3>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{errorMessage}</div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/verses")}
        >
          Back to Verse List
        </button>
      </div>
    );
  }

  if (!verse) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">Verse not found.</div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/verses")}
        >
          Back to Verse List
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">Verse Details</h3>
        </div>

        <div className="card-body">
          <h4>
            {verse.book} {verse.chapter}:{verse.verseNumber}
          </h4>

          <p className="text-muted">Translation: {verse.translation}</p>

          <blockquote className="blockquote border-start border-4 ps-3">
            <p>{verse.verseText}</p>
          </blockquote>

          <ul className="list-group mb-4">
            <li className="list-group-item">
              <strong>Category:</strong> {verse.categoryName}
            </li>

            <li className="list-group-item">
              <strong>Favorite:</strong> {verse.isFavorite ? "Yes" : "No"}
            </li>

            <li className="list-group-item">
              <strong>Verse ID:</strong> {verse.verseId}
            </li>
          </ul>

          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("/verses")}
          >
            Back
          </button>

          <button
            className="btn btn-warning"
            onClick={() => navigate(`/verses/edit/${verse.verseId}`)}
          >
            Edit Verse
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerseDetails;
