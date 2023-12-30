import React, { useState, useEffect } from "react";
import "../../../css/Articles.css";
import { useParams } from "react-router-dom";
import IndividualPost from "../../IndividualPost";

function Articles() {
  const [title, setTitle] = useState("");
  const [articleText, setArticleText] = useState("");
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("submission");
  const [editArticleId, setEditArticleId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleArticleTextChange = (e) => {
    setArticleText(e.target.value);
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const url = `http://localhost:8000/articles/all/${id}`;

      try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json();

        if (response.ok) {
          setArticles(data);
        } else {
          console.error("Error during fetch:", data);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const editArticle = (id) => {
    const clickedArticle = articles.find((article) => article._id === id);

    if (clickedArticle) {
      setTitle(clickedArticle.title);
      setArticleText(clickedArticle.description);
      setEditArticleId(id);
      switchToSubmissionTab();
    }
  };

  const deleteArticle = async (id) => {
    const fetchOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const url = `http://localhost:8000/articles/delete/${id}`;

    try {
      const response = await fetch(url, fetchOptions);
      const data = await response.json();

      if (response.ok) {
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== id)
        );
      }
    } catch (error) {
      console.error("Error during deleting:", error);
    }
  };

  const submitArticle = () => {
    if (title.trim() !== "" && articleText.trim() !== "") {
      const newArticle = {
        title: title,
        description: articleText,
        doctorId: id,
      };

      const url = editArticleId
        ? `http://localhost:8000/articles/update/${editArticleId}`
        : `http://localhost:8000/articles/create`;

      const fetchOptions = {
        method: editArticleId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      };

      const sendData = async () => {
        try {
          const response = await fetch(url, fetchOptions);
          const data = await response.json();

          if (response.ok) {
            setArticles((prevArticles) =>
              editArticleId
                ? prevArticles.map((article) =>
                    article._id === editArticleId ? data : article
                  )
                : [...prevArticles, data]
            );
            setTitle("");
            setArticleText("");
            setEditArticleId(null);
          } else {
            console.error("Error during fetch:", data);
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      };

      sendData();
    }
  };

  const switchToSubmissionTab = () => {
    setActiveTab("submission");
  };

  const switchToArticlesTab = () => {
    setActiveTab("articles");
  };

  return (
    <div>
      <div id="tabs">
        <div id="submission-tab" onClick={switchToSubmissionTab}>
          Submission
        </div>
        <div id="articles-tab" onClick={switchToArticlesTab}>
          Articles
        </div>
      </div>
      <div
        id="submission-content"
        style={{ display: activeTab === "submission" ? "block" : "none" }}
      >
        <h1>{editArticleId ? "Edit Article" : "Article Submission"}</h1>
        <input
          type="text"
          id="titleInput"
          placeholder="Title of the Article"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          id="articleInput"
          rows="10"
          cols="50"
          placeholder="Body of the Article"
          value={articleText}
          onChange={handleArticleTextChange}
        />
        <br />
        <button id="submit-button" onClick={submitArticle}>
          {editArticleId ? "Update Article" : "Submit Article"}
        </button>
      </div>
      <div
        id="articles-content"
        style={{ display: activeTab === "articles" ? "block" : "none" }}
      >
        <h1 className="center">Articles</h1>
        <div id="articleList" className="articleList">
          {loading ? (
            <p>Loading...</p>
          ) : articles.length === 0 ? (
            <p>No articles written by you</p>
          ) : (
            articles.map((article) => (
              <div key={article._id} className="article-box">
                <IndividualPost
                  id={article._id}
                  title={article.title}
                  author={article?.doctor?.firstName}
                  description={article.title}
                  type="super"
                />
                <div className="right">
                  <button
                    className="power-buttons"
                    onClick={() => {
                      deleteArticle(article._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="power-buttons"
                    onClick={() => {
                      editArticle(article._id);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Articles;
