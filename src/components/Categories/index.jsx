import React from "react";
import './style.css';
// import './index.html';



const Categories = () => {
  const categories = ["All", "Action", "Comedy", "Arabic", "Series", "Adventure", "Others"];
  const current = 0;

  return (
    <div className="category">  
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <a href="#">{category}</a>
          </li>
        ))}
      </ul>
      {/* <button class="forward">
        <i class="fas fa-arrow-right"></i>
      </button> */}
    </div>
  );
};

export default Categories;

