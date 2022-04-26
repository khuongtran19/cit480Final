import React from "react";
import "./RecipeDetail.css";
import { useLocation } from "react-router-dom";
import home1Pic from "./../../images/home1Pic.png";
import { TiTick } from "react-icons/ti";

const RecipeDetail = () => {
  const location = useLocation();
  console.log("ali raza ", location.state.user);

  console.log("para", location.state.user.mainTxt);
  return (
    <>
      <div className="mainConatinerRecipeDetail">
        <div className="mainInnerContainerReciDet">
          <p className="recipeTxtMainDet">{location.state.user.mainTxt}</p>
          <p className="recipeTxtDetailDet">{location.state.user.detailTxt}</p>
          {/* <p>Recipe by Cooking Light December 2005</p> */}

          <img src={location.state.user.Image} alt="" className="recipeImg" />
          <p className="creditTxt"> {location.state.user.recipeName}</p>
          <div>
            <p className="creditTxt"> {location.state.user.recipeName}</p>
          </div>

          <div className="ingredientsParaDiv">
            <p className="ingredientsTxt">{location.state.user.Ingredients}</p>
            <p>{location.state.user.Ingredients}</p>
            <p>{location.state.user.Ingredients}</p>

            <p>{location.state.user.Ingredients}</p>
            <p>{location.state.user.Ingredients}</p>
          </div>
          <div>
            <p className="dirTxt">Directions</p>

            <div className="topDivStp">
              <div className="backGroundTick">
                <TiTick className="tickIcon" />
              </div>

              <p className="stpTxt"> {location.state.user.steps}</p>
            </div>

            <p className="stepsParaDet">{location.state.user.Details} </p>

            <div className="topDivStp">
              <div className="backGroundTick">
                <TiTick className="tickIcon" />
              </div>
              <p className="stpTxt">Step 2</p>
            </div>

            <p className="stepsParaDet">{location.state.user.Details}</p>

            <div className="topDivStp">
              <div className="backGroundTick">
                <TiTick className="tickIcon" />
              </div>

              <p className="stpTxt">{location.state.user.steps}</p>
            </div>

            <p className="stepsParaDet">{location.state.user.Details}</p>
            <div className="topDivStp">
              <div className="backGroundTick">
                <TiTick className="tickIcon" />
              </div>

              <p className="stpTxt">{location.state.user.steps}</p>
            </div>
            <p className="stepsParaDet">{location.state.user.Details}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
