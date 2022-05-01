import React, { useEffect } from "react";
import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [changeBack, setChangeBack] = useState("");
  const [changeData, setChangeData] = useState(false);
  const [recipe1, setRecipe] = useState([]);
  const [recipe2, setRecipe2] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("userID");
    axios.get("http://localhost:4000/oxy/getall").then((response) => {
      console.log("recipe1", response.data.data);
      setRecipe(response.data.data);
    });
    console.log("faateh ", id);
    axios.get(`http://localhost:4000/oxy/getall/${id}`).then((response) => {
      console.log("Recipe2: ", response.data.data);
      setRecipe2(response.data.data);
    });
  }, []);

  return (
    <>
      <div className="mainContainerRecipe">
        <div className="topListDiv">
          <h1 className="headerHomeTxt">List of Recipies</h1>
        </div>

        <div className="divTab">
          <div className="topInnerTab">
            <div className="topRadio">
              <input
                type="radio"
                name="tab"
                value={changeData}
                onChange={(e) => setChangeData(true)}
                className="radioInput"
              />
              <p className="recipeTbTxt"> Recipe listed by you.</p>
            </div>
            <div className="topRadio">
              <input
                type="radio"
                name="tab"
                value={changeData}
                onChange={(e) => setChangeData(false)}
                className="radioInput"
              />
              <p className="recipeTbTxt">Recipe listed by other users.</p>
            </div>
          </div>
        </div>

        {changeData ? (
          <div className="topMapHome">
            {console.log("recipe2222", recipe2)}
            {recipe2?.map((user, index) => (
              <Link to="/RecipeDetail" state={{ user }} key={index}>
                <div className="mainContainerHomeRecipCard">
                  <img src={user.Image} alt="" className="recipeImg" />
                  {user.Ingredients.map((item) => (
                    <p className="recipeTxtMain">
                      Ingredeints:
                      {item}
                    </p>
                  ))}
                  {user.steps.map((item) => (
                    <p className="recipeTxtMain">
                      Steps:
                      {item}
                    </p>
                  ))}
                  <p className="recipeTxtDetail">Details: {user.Details}</p>
                  <p className="recipeTxtDetail">Recipe: {user.RecipeName}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="topMapHome">
            {console.log("recipe1111", recipe1)}
            {recipe1?.map((user, index) => (
              <Link to="/RecipeDetail" state={{ user }} key={index}>
                <div className="mainContainerHomeRecipCard">
                  <img src={user.Image} alt="" className="recipeImg" />
                  {user.Ingredients.map((item) => (
                    <p className="recipeTxtMain">
                      Ingredeints:
                      {item}
                    </p>
                  ))}
                  {user.steps.map((item) => (
                    <p className="recipeTxtMain">
                      Steps:
                      {item}
                    </p>
                  ))}
                  <p className="recipeTxtDetail">Details: {user.Details}</p>
                  <p className="recipeTxtDetail">Recipe: {user.RecipeName}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
