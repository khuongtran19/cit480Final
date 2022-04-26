import React from "react";
import { useState } from "react";
import home1Pic from "./../../images/home1Pic.png";
import home2Pic from "./../../images/home2Pic.png";
import "../FrontPage/FrontPage.css";
import { Link } from "react-router-dom";
const Home = () => {
  const [changeBack, setChangeBack] = useState(1);
  const [changeData, setChangeData] = useState(1);

  const ChangeBackgroun = () => {
    setChangeBack(1);
  };
  const ChangeBackgroun1 = () => {
    setChangeBack(2);
  };

  const handleChange = () => {
    console.log("change");
    setChangeData(1);
  };
  const handleChange1 = () => {
    console.log("change");
    setChangeData(2);
  };

  const data1 = [
    {
      img: home2Pic,
      mainTxt: "13 Apple Muffin Recipes To Start Your Day Right",
      detailTxt:
        "Studded with tender pieces of fruit, plenty of spices, and often mix-ins like chopped nuts, these apple muffins are the ultimate autumn breakfast.",
    },

    {
      img: home1Pic,
      mainTxt: "15 Wow-Worthy White Chili Recipes",
      detailTxt:
        "Skip the tomatoes and make a batch of white chili for your next tailgate or bonfire.",
    },
    {
      img: home2Pic,
      mainTxt: "13 Apple Muffin Recipes To Start Your Day Right",
      detailTxt:
        "Studded with tender pieces of fruit, plenty of spices, and often mix-ins like chopped nuts, these apple muffins are the ultimate autumn breakfast.",
    },
    {
      img: home2Pic,
      mainTxt: "13 Apple Muffin Recipes To Start Your Day Right",
      detailTxt:
        "Studded with tender pieces of fruit, plenty of spices, and often mix-ins like chopped nuts, these apple muffins are the ultimate autumn breakfast.",
    },
  ];

  return (
    <>
      <div className="mainContainerRecipop">
        <div className="topListDiv">
          <h1 className="headerHomeTxt">List of Recipies</h1>
        </div>

        <div className="divTab">
          <div className="topInnerTab">
            <div className="topRadio">
            </div>
          </div>
        </div>
        <div className={changeData === 1 ? "topMapHomeone" : "topMapHomeHide"}>
          {data1.map((user, index) => (
            <Link to="/RecipeDetail" state={{ user }} key={index}>
              <div className="mainContainerHomeRecipCard">
                <img src={user.img} alt="" className="recipeImg" />
                <p className="recipeTxtMain">{user.mainTxt}</p>

                <p className="recipeTxtDetail">{user.detailTxt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={changeData === 1 ? "topMapHomeone" : "topMapHomeHide"}>
          {data1.map((user, index) => (
            <Link to="/RecipeDetail" state={{ user }} key={index}>
              <div className="mainContainerHomeRecipCard">
                <img src={user.img} alt="" className="recipeImg" />
                <p className="recipeTxtMain">{user.mainTxt}</p>

                <p className="recipeTxtDetail">{user.detailTxt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
