import Navbar from "../Navbar";
import styles from "./LandingScreen.module.css";
import { Screen1, Screen2, Screen3, Screen4, Screen5 } from "./screens";

const LandingScreen = () => {
    return <div className={styles.container} >
        <Navbar />
        <Screen1 />
        <Screen2 />
        <Screen3 />
        <Screen4 />
        <Screen5 />
    </div>
}

export default LandingScreen