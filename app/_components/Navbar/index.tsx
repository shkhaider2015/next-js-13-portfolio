// import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);

  return (
    <section className={styles.navContainer}>
      <div
        onClick={() => setIsHamburger((pS) => !pS)}
        className={`${styles.hamburger} ${
          isHamburger ? styles?.isActive : ""
        } `}
        id="hamburger-6"
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>
      <nav className={styles.fill}>
        <ul>
          <li>
            <Link
              activeClass="active"
              to="screen1"
              spy={true}
              smooth={true}
              offset={0}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="screen2"
              spy={true}
              smooth={true}
              offset={0}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="screen3"
              spy={true}
              smooth={true}
              offset={0}
            >
              Downloads
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="screen4"
              spy={true}
              smooth={true}
              offset={0}
            >
              More
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="screen5"
              spy={true}
              smooth={true}
              offset={0}
            >
              Nice staff
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
