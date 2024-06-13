import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import About from "./pages/About";
import useIntersectionObserver from "./utils/useIntersectionObserver";
import { useDispatch } from "react-redux";
import { navbarActions } from "./store/navbarSlice";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
  }, []);

  const dispatch = useDispatch();
  const timeoutRef = useRef(null);

  const handleIntersection = (id) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(
        navbarActions.setSelected(id.charAt(0).toUpperCase() + id.slice(1))
      );
    }, 300);
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7,
  };

  const homeRef = useIntersectionObserver(handleIntersection, options);
  const aboutRef = useIntersectionObserver(handleIntersection, options);
  const skillsRef = useIntersectionObserver(handleIntersection, options);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <div id="home" ref={homeRef}>
          <Home />
        </div>
        <div id="about" ref={aboutRef}>
          <About />
        </div>
        <div id="skills" ref={skillsRef}>
          <Skills />
        </div>
      </div>
    </Router>
  );
}

export default App;
