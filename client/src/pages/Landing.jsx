import React from 'react';
import main from '../assets/images/main.svg'
import Wrapper from "../assets/wrappers/LandingPage";
import Logo from "../components/Logo";
import {Link} from "react-router-dom";



const Landing = () => {
    return (
        <Wrapper>
           <nav>
               <Logo/>
           </nav>
            <div className={'container page'}>
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>I'm baby readymade poutine raw denim iceland small batch taxidermy kombucha. Squid retro taxidermy selfies fashion axe DSA photo booth before they sold out chambray ascot woke cornhole tilde.
                    </p>
                    <Link to={'/register'} className={'btn btn-hero'}>Login/Register</Link>
                </div>
                <img className={'img main-img'} src={main} alt="job"/>
            </div>
        </Wrapper>
    );
};



export default Landing;
