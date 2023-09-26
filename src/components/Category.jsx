import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() !== '') {
      setCategoryList([...categoryList, categoryName]);
      setCategoryName('');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCategories = [...categoryList];
    const [reorderedItem] = reorderedCategories.splice(result.source.index, 1);
    reorderedCategories.splice(result.destination.index, 0, reorderedItem);

    setCategoryList(reorderedCategories);
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
      <DragDropContext 
        onDragEnd={handleDragEnd}
        style={{border:"1px solid red"}}
        >
        <Droppable droppableId="categoria" style={{border:"1px solid red"}}>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {categoryList.map((cat, index) => (
                <Draggable key={index} draggableId={`category-${index}`} index={index} style={{border:"1px solid red"}}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {cat}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Category;
