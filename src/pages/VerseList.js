import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FaithverseService from "../services/faithverseService";

const VerseList = () => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadVerses = async () => {
    try {
      const response = await FaithverseService.getVerses();
      setVerses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading verses:", error);
      setErrorMessage("Unable to load verses from the API.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVerses();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h3>Loading verses...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Saved Bible Verses</h2>

        <Link to="/verses/create" className="btn btn-primary">
          Add New Verse
        </Link>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Book</th>
                <th>Chapter</th>
                <th>Verse</th>
                <th>Translation</th>
                <th>Category</th>
                <th>Favorite</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {verses.map((verse) => (
                <tr key={verse.verseId}>
                  <td>{verse.book}</td>
                  <td>{verse.chapter}</td>
                  <td>{verse.verseNumber}</td>
                  <td>{verse.translation}</td>
                  <td>{verse.categoryName}</td>
                  <td>{verse.isFavorite ? "Yes" : "No"}</td>
                  <td>
                    <Link
                      to={`/verses/details/${verse.verseId}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      View
                    </Link>

                    <Link
                      to={`/verses/edit/${verse.verseId}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <Link
                      to={`/verses/delete/${verse.verseId}`}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {verses.length === 0 && (
            <p className="text-muted text-center">No verses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerseList;
