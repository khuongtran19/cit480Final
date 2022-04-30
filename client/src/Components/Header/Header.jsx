import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Navbar, Container } from "react-bootstrap";

const Header = () => {
  const [switchButton, setSwitchButton] = useState(true);
  const navigate = useNavigate();
  function changme() {
    setSwitchButton(false);
  }
  function changethis() {
    setSwitchButton(true);
  }
  return (
    <div className="headernavbar">
      <Navbar className="headernavbar" expand="lg">
        <Container fluid className="dorap">
          <Link to="/">
            <h4 className="recipe">Recipe</h4>
          </Link>

          <div className="mainform">
            
            {switchButton === true ? (
              <Link to="/Login">
                <Button variant="outline-light " onClick={changme}>
                  Login
                </Button>
              </Link>
            ) : (
              <div>
                <Link to="/Recipe">
                  <Button className="btnone" variant="outline-light ">
                    Create Recipies
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline-light " onClick={changethis}>
                    Logout
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
