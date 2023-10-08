import { Element } from 'react-scroll';
import styles from './screen1.module.css';
import Image from 'next/image';
import {MyImage4, bg_pattern } from '@/app/_assets';
import TypeWriter from '@/app/_components/TypeWriter';
import Lottie from 'react-lottie';

const Screen1 = () => {
    return <Element name="screen1" className={styles.container}>
      <Image src={bg_pattern} alt='bg-image' className={styles.bgImage} />
    <div className={styles.left} >
      <Image src={MyImage4} alt='' className={styles.image} width={300} />
    </div>
    <div className={styles.right}>
    <TypeWriter texts={['My Name ', 'My Owl One ', "My own"]} infinite={true} /> 
    </div>
  </Element>
}

export default Screen1