import React, { useState } from "react";
import "../styles/CircularMenu.css";
import styles from "../styles/LogoTitle.module.css";
import { HashLink as Link } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { navbarActions } from "../store/navbarSlice";
import { tranmenu } from "../utils/translateText";

import Logo from "../Logo.png";

const CircularMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { lang } = useSelector((state) => state.language);

  const dispatch = useDispatch();
  const selectedItem = (itemName) => {
    dispatch(navbarActions.setSelected(itemName));
  };

  const menuItems = [
    {
      name: tranmenu(lang)[0],
      link: "/portfolio/#contact",
      circleClass: "circle-one",
    },
    {
      name: tranmenu(lang)[1],
      link: "/portfolio/#portfolio",
      circleClass: "circle-four",
    },
    {
      name: tranmenu(lang)[2],
      link: "/portfolio/#skills",
      circleClass: "circle-two",
    },
    {
      name: tranmenu(lang)[3],
      link: "/portfolio/#about",
      circleClass: "circle-three",
    },
    {
      name: tranmenu(lang)[4],
      link: "/portfolio/#home",
      circleClass: "circle-five",
    },
  ];

  return (
    <>
      <div className="absolute top-4 left-4 z-50 select-none">
        <div className="font-Orbitron w-9 flex items-center text-3xl font-bold gap-1">
          <img src={Logo} className="border-2 rounded-full" alt="Logo" />
          <div className={`${styles.environment}`}></div>
          <h2
            className={`${styles.hero} ${styles.glitch} ${styles.layers} bg-opacity-0 bg-white bg-blur-lg backdrop-blur-md rounded-md`}
            data-text="MG"
          >
            <span>MG</span>
          </h2>
        </div>
      </div>

      <div>
        <div
          className={`bars ${menuOpen ? "active" : ""}`}
          id="nav-action"
          onClick={toggleMenu}
        >
          <span className="bar barspan"></span>
        </div>
      </div>

      <nav id="nav" className={menuOpen ? "visible" : ""}>
        <ul className="font-Orbitron text-md" onClick={toggleMenu}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`shape-circle ${item.circleClass}`}
              onClick={() => selectedItem(item.name)}
            >
              <Link smooth to={item.link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default CircularMenu;
