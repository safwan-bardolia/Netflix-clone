import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, setShow] = useState(false);

  /* adding scroll listener   
     attach listener to windows, so when we scroll do something */

  // why in useEffect (because when our app first render register this eventListener in memory)
  useEffect(() => {
    // registering scroll listener
    window.addEventListener("scroll", () => {
      // if we scroll 100px down to y axis then do something
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    /* We know that componentWillUnmount executes when component is removed from actual DOM. Similarly 
       if we use useEffect with an empty second argument and adding a return function call it will work as componentWillUnmount’ */

    /* everytime this useEffect run for whatever reason, just remove 'eventListener' before it fire up again
     This return function does the cleanup work.*/
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    // always add class 'nav', but if we scroll 100px down to y axis(i.e show=true) then add 'nav_black' class also
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
        alt="Netflix Logo"
      />

      <img
        className="nav_avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Nav;
