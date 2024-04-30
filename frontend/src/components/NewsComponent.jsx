import React from "react";

const NewsComponent = () => {
  return (
    <div data-testid="news-component">
      <h2>Latest News about sustainability</h2>
      <p>
        Stay updated with the latest news on Sustainable Development Goals
        (SDGs).
      </p>
      <a
        href="https://sdgs.un.org/goals"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Learn More</button>
      </a>
    </div>
  );
};

export default NewsComponent;
