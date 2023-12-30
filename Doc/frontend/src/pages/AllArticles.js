import React, { useEffect, useState } from "react";
import "../css/AllArticles.css";
import IndividualPost from "../components/IndividualPost";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const url = `http://localhost:8000/articles/all`;

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

  return (
    <section className="doctors-post-section">
      {loading ? (
        <p className="center">Loading...</p>
      ) : articles.length === 0 ? (
        <p>No Articles to show</p>
      ) : (
        <div className="individual-post">
          {articles.map((article) => (
            <IndividualPost
              key={article._id}
              id={article._id}
              title={article.title}
              author={article?.doctor?.firstName}
              description={article.description}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllArticles;
