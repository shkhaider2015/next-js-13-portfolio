import { Element } from 'react-scroll';
import styles from './screen2.module.css';
import TypeWriter from '@/app/_components/TypeWriter';

const Screen2 = () => {
    return <Element name="screen2" className={styles.container}>
    <TypeWriter text='My Text One' delay={100} infinite={true} /> 
    {/* <TypeWriter text='My Text Two' delay={100} infinite={true} /> 
    <TypeWriter text='My Text Three' delay={100} infinite={true} />  */}
  </Element>
}

export default Screen2