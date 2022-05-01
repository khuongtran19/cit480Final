import React from "react";
import "./Recipe.css";
import { useState } from "react";
import AddDetail from "../AddDetail";
import AddDetailS from "../AddDetailS";
// import Check from "../Check";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  // const [recipe, setRecipe] = useState("");
  // const [Ingredients, setGradients] = useState("");
  // const [image, setImage] = useState("");
  // const [steps, setSteps] = useState("");
  // const [text, setText] = useState("");
  const navigate = useNavigate();
  // API/////
  // const HandleRecipe = (e) => {
  //   e.preventDefault();
  // };

  //////////////////////////////////esytfrikjm/////////////////////////
  const UserIDLogin = localStorage.getItem("userID");
  // console.log("reposnse datfe zia UserIDLogin", UserIDLogin);

  const [formValues, setFormValues] = useState([{ Ingredients: "" }]);
  const [stepsValues, setStepsValues] = useState([{ steps: "" }]);
  const [recipename, setRecipeName] = useState("");
  const [imagename, setImageName] = useState("");
  const [textarea, setTextArea] = useState("");

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { Ingredients: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formvalues", { finalarray });
    var Ingredeints = formValues.map(function (item) {
      return item["Ingredients"];
    });
    var steps = stepsValues.map(function (item) {
      return item["steps"];
    });

    if (!recipename) {
      alert("Fill the Recipename");
    }
    if (!Ingredeints) {
      alert("Fill the Ingredients");
    } else {
      console.log("recipeName: ", recipename);
      console.log("Ingredeints", Ingredeints);
      console.log("steps: ", steps);
      console.log("Details: ", textarea);
      console.log("profile: ", imagename);
      ////////////////////////////////////////////////////////////////////////////////////
      var data = new FormData();
      data.append("RecipeName", recipename);
      data.append("Ingredients", Ingredeints);
      data.append("profile", imagename);
      data.append("steps", steps);
      data.append("id", UserIDLogin);
      data.append("Details", textarea);
      console.log("data", data);
      axios({
        method: "POST",
        url: "http://localhost:4000/recipe/create",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          //handle success
          navigate("/Home");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  let handleSteps = (i, e) => {
    let newStepsValues = [...stepsValues];
    newStepsValues[i][e.target.name] = e.target.value;
    setStepsValues(newStepsValues);
  };

  let addSteps = () => {
    setStepsValues([...stepsValues, { steps: "" }]);
  };

  let removeSteps = (i) => {
    let newStepsValues = [...stepsValues];
    newStepsValues.splice(i, 1);
    setStepsValues(newStepsValues);
  };
  // /////////////////////////API
  const HandleRecipe = async (e) => {
    e.preventDefault();
    // alert("handle Recipe");
  };

  return (
    <>
      <form className="mainContainerCreateRecipe" onSubmit={handleSubmit}>
        <div className="formCreateRecipe">
          <p className="txtCreateRecipe">Create Your Recipe</p>
          <p className="labelCreateRecipe">Enter the Name of the Recipe</p>
          <input
            className="inputCreateRecipe"
            placeholder="Enter Recipe Name"
            type="text"
            name="RecipeName"
            value={recipename}
            onChange={(e) => setRecipeName(e.target.value)}
          />

          {formValues.map((element, index) => (
            <div
              className="form-inline"
              style={{ display: "flex", flexDirection: "column" }}
              key={index}
            >
              <p className="labelCreateRecipe">Enter Ingredients</p>
              <input
                placeholder="Enter Ingredients"
                className="inputCreateRecipe"
                type="text"
                name="Ingredients"
                value={element.Ingredients || ""}
                onChange={(e) => handleChange(index, e)}
              />
              <div>
                <button
                  className="btnofall"
                  type="button"
                  onClick={() => addFormFields()}
                >
                  Add Ingredient
                </button>
              </div>
              <div>
                {index ? (
                  <button
                    type="button"
                    className="btnofall"
                    onClick={() => removeFormFields(index)}
                  >
                    Remove Ingredient
                  </button>
                ) : null}
              </div>
            </div>
          ))}

          <p className="labelCreateRecipe">Upload Image</p>
          <div className="topUploadImg">
            <input
              type="file"
              name="name"
              id="img"
              className="inputCreateRecipe"
              onChange={(e) => {
                setImageName(e.target.files[0]);
              }}
            />
          </div>
          {stepsValues.map((element, index) => (
            <div
              className="form-inline"
              style={{ display: "flex", flexDirection: "column" }}
              key={index}
            >
              <p className="labelCreateRecipe">Enter Steps</p>
              <input
                type="text"
                className="inputCreateRecipe"
                placeholder={"Enter Steps"}
                name="steps"
                value={element.steps || ""}
                onChange={(e) => handleSteps(index, e)}
              />

              <div>
                <button
                  className="btnofall"
                  type="button"
                  onClick={() => addSteps()}
                >
                  Add Step
                </button>
              </div>
              <div>
                {index ? (
                  <button
                    type="button"
                    className="btnofall"
                    onClick={() => removeSteps(index)}
                  >
                    Remove Step
                  </button>
                ) : null}
              </div>
            </div>
          ))}

          <p className="labelCreateRecipe">Enter more Details about Recipe</p>
          <input
            className="inputCreateRecipe"
            type="text"
            name="TextArea"
            placeholder="Enter More Detail"
            value={textarea}
            onChange={(e) => setTextArea(e.target.value)}
          />
          <div className="button-section">
            <button className="btnofall" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Recipe;
