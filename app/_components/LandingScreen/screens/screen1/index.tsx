import { Element } from 'react-scroll';
import styles from './screen1.module.css';
import Image from 'next/image';
import { MyImage, MyImage2 } from '@/app/_assets';
import { TypeAnimation } from 'react-type-animation';

const Screen1 = () => {
    return <Element name="screen1" className={styles.container}>
    <div className={styles.left} >
      <Image src={MyImage2} alt='' className={styles.image} width={300} />
    </div>
    <div className={styles.right}>
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Full Stack Development',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Frontend Development',
        1000,
        'Backend Development',
        1000,
        'Machin Learning',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block', opacity: .5 }}
      repeat={Infinity}
    />
    </div>
  </Element>
}

export default Screen1