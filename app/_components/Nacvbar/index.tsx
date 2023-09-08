import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <section className={styles.navContainer}>
     <nav className={styles.stroke}>
    <ul>
      <li><Link href="#">Home</Link></li>
      <li><Link href="#">About</Link></li>
      <li><Link href="#">Downloads</Link></li>
      <li><Link href="#">More</Link></li>
      <li><Link href="#">Nice staff</Link></li>
    </ul>
  </nav>
    </section>
  );
};

export default Navbar;
