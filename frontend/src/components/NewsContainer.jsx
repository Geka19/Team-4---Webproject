import React from "react";
import "../styles/NewsContainer.css";
import earthday from "../assets/svg/earthday.svg";

const NewsContainer = () => {
  return (
    <div className="news-container">
      <div className="img-news">
        <img src={earthday} alt="One big image" />
      </div>
      <div className="text-news">
        <div className="one-text-news">
          <h2>
            <a href="https://sdgs.un.org/goals" target="blank">
              What's new in Sustainability goals!
            </a>
          </h2>{" "}
        </div>
        <div className="one-text-news">
          <h2>
            <a href="https://sdgs.un.org/" target="blank">
              What's even more new in sustainability goals!?
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
};
export default NewsContainer;
