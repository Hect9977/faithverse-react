import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FaithverseService from "../services/faithverseService";

const VerseCreate = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verseNumber, setVerseNumber] = useState("");
  const [translation, setTranslation] = useState("");
  const [verseText, setVerseText] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await FaithverseService.getCategories();
      setCategories(response.data);

      if (response.data.length > 0) {
        setCategoryId(response.data[0].categoryId);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      setErrorMessage("Unable to load categories.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVerse = {
      book: book,
      chapter: parseInt(chapter),
      verseNumber: parseInt(verseNumber),
      translation: translation,
      verseText: verseText,
      categoryId: parseInt(categoryId),
      isFavorite: isFavorite ? 1 : 0,
    };

    try {
      await FaithverseService.createVerse(newVerse);
      alert("Verse created successfully!");
      navigate("/verses");
    } catch (error) {
      console.error("Error creating verse:", error);
      setErrorMessage(
        "Unable to create verse. Please check the form and try again.",
      );
    }
  };

  const handleCancel = () => {
    navigate("/verses");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">Add New Bible Verse</h3>
        </div>

        <div className="card-body">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="book" className="form-label">
                  Book
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="book"
                  value={book}
                  onChange={(event) => setBook(event.target.value)}
                  placeholder="Example: John"
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="chapter" className="form-label">
                  Chapter
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="chapter"
                  value={chapter}
                  onChange={(event) => setChapter(event.target.value)}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="verseNumber" className="form-label">
                  Verse
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="verseNumber"
                  value={verseNumber}
                  onChange={(event) => setVerseNumber(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="translation" className="form-label">
                Translation
              </label>
              <input
                type="text"
                className="form-control"
                id="translation"
                value={translation}
                onChange={(event) => setTranslation(event.target.value)}
                placeholder="Example: NIV, KJV, ESV"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="verseText" className="form-label">
                Verse Text
              </label>
              <textarea
                className="form-control"
                id="verseText"
                rows="4"
                value={verseText}
                onChange={(event) => setVerseText(event.target.value)}
                placeholder="Enter the full verse text"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="categoryId"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                required
              >
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="isFavorite"
                checked={isFavorite}
                onChange={(event) => setIsFavorite(event.target.checked)}
              />

              <label className="form-check-label" htmlFor="isFavorite">
                Mark as Favorite
              </label>
            </div>

            <button type="submit" className="btn btn-primary me-2">
              Create Verse
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerseCreate;
