import React, { useState } from "react";
import "../Components/Register/Check.css";

function Check() {
  const [inputList, setInputList] = useState([{ firstName: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "" }]);
  };

  return (
    <div className="checkmain">
      <div>
        <h3 className="clue">
          Clue Mediator
          {/* </a> */}
        </h3>
      </div>
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="firstName"
              placeholder="Enter First Name"
              className="inputCreateRecipe"
              value={x.firstName}
              onChange={(e) => handleInputChange(e, i)}
            />

            <div className="btn-box">
              {inputList.length !== 1 && (
                <button
                  className="mr10 chkbtn"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button className="chkbtn" onClick={handleAddClick}>
                  Add
                </button>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

export default Check;
