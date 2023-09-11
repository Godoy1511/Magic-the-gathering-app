import React, { useState } from 'react';

function Category() {
  const [categoryName, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() !== '') {
      setCategoryList([...categoryList, categoryName]);
      setCategory('');
    }
  };

  return (
    <div>
      <h1>Category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type to add category"
          value={categoryName}
          onChange={handleCategoryChange}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {categoryList.map((cat, index) => (
          <li key={index}>{cat}</li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
