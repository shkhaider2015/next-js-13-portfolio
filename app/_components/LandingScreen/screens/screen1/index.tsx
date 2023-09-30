import { Element } from 'react-scroll';
import styles from './screen1.module.css';
import Image from 'next/image';
import { MyImage, MyImage2, MyImage3, MyImage4 } from '@/app/_assets';
import TypeWriter from '@/app/_components/TypeWriter';

const Screen1 = () => {
    return <Element name="screen1" className={styles.container}>
    <div className={styles.left} >
      <Image src={MyImage4} alt='' className={styles.image} width={300} />
    </div>
    <div className={styles.right}>
    <TypeWriter texts={['My Name ', 'My Owl One ', "My own"]} infinite={true} /> 
    </div>
  </Element>
}

export default Screen1