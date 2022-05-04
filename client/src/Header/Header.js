import React, {Component} from 'react';
import './Header.css';
import { FaUsers } from 'react-icons/fa';
    
    class Header extends Component {
        
        render() {
            const {userName, logOutUser} = this.props;
            return (
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper header nav-wrapper header-div">
                            
                            <a href="/" className="brand-logo center white-text text-darken-5 header-text">Recipes Repo</a>
                            
                            
                            <div className="navbar-nav ml-auto">
                            
                            <div className="left hide-on-med-and-down white-text text-darken-5 userGreet">
                                {userName && (<div>Welcome, {userName}</div>)}    
                            </div>
                                <ul className="right hide-on-med-and-down">
                                    <li><a className="white-text text-darken-5" href="/">Home</a></li>
                                    {userName && (
                                        <li><a className="white-text text-darken-5" href="/Create">
                                            <FaUsers/> Create</a></li>
                                    )}           
                                    {!userName && (
                                        <li><a className="white-text text-darken-5" href="/Register">Register</a></li>
                                    )}
                                    {!userName && (
                                        <li><a className="white-text text-darken-5" href="/Login">Login</a></li>
                                    )}
                                    {userName &&(
                                        <li><a className="white-text text-darken-5" href="/"
                                        onClick={e => logOutUser(e)} >Logout</a></li>
                                    )}

                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>       
            )
        }
    }



export default Header;