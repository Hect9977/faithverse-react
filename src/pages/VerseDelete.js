import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FaithverseService from "../services/faithverseService";

const VerseDelete = () => {
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

      const verseData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      setVerse(verseData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading verse:", error);
      setErrorMessage("Unable to load verse information.");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await FaithverseService.deleteVerse(verseId);

      alert("Verse deleted successfully!");
      navigate("/verses");
    } catch (error) {
      console.error("Error deleting verse:", error);
      setErrorMessage("Unable to delete verse. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/verses");
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h3>Loading verse information...</h3>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{errorMessage}</div>

        <button className="btn btn-secondary" onClick={handleCancel}>
          Back to Verse List
        </button>
      </div>
    );
  }

  if (!verse) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">Verse not found.</div>

        <button className="btn btn-secondary" onClick={handleCancel}>
          Back to Verse List
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-danger">
        <div className="card-header bg-danger text-white">
          <h3 className="mb-0">Delete Bible Verse</h3>
        </div>

        <div className="card-body">
          <div className="alert alert-warning">
            Are you sure you want to delete this Bible verse? This action cannot
            be undone.
          </div>

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

          <button className="btn btn-danger me-2" onClick={handleDelete}>
            Delete Verse
          </button>

          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerseDelete;
