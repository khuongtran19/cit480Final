import React from 'react'
import { useState } from 'react';

const AddDetail = (props) => {
    const [inputList, setInputList] = useState([{ enterIngredients: "", }]);
 
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
   
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { enterIngredients: "" }]);
    };
  return (
    <>
    
    {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
            className='inputCreateRecipe'
              name="enterIngredients"
              placeholder={props.placeholder}
              value={x.enterIngredients}
              onChange={e => handleInputChange(e, i)}
            />
         
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className='btnCreateRecipeRem'
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button className='btnCreateRecipeAdd' onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
    </>
  )
}

export default AddDetail