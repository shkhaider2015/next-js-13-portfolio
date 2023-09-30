import React, { FC, useEffect, useState } from "react";
import Styles from "./TypeWriter.module.css";

const TypeWriter: FC<ITypeWriter> = (props) => {
    const { texts, delay=70, eraseDelay=70, infinite = false, endDelay = 1500 } = props;
  
    const [currentText, setCurrentText] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [erasing, setErasing] = useState<boolean>(false);
  
    useEffect(() => {
      let timeout: any;
      let endTimeout: any;
      let endWaitTimeout: any;
  
      if (currentIndex < texts.length) {
        const currentString = texts[currentIndex];
        if (erasing) {
          // Erase the current string.
          if (currentText.length > 0) {
            timeout = setTimeout(() => {
              setCurrentText((prevText) => prevText.slice(0, -1));
            }, eraseDelay);
          } else {
            // After erasing, set erasing to false and move to the next string.
            setErasing(false);
            setCurrentIndex((prevIndex) => prevIndex + 1);
          }
        } else {
          // Type the current string.
          if (currentText.length < currentString.length) {
            timeout = setTimeout(() => {
              setCurrentText((prevText) => prevText + currentString[currentText.length]);
            }, delay);
          } else {
            endWaitTimeout = setTimeout(() => {
                setErasing(true);
            }, endDelay);
            // If the current string is fully typed, set erasing to true.
            
          }
        }
      } else if (infinite) {
        // If all strings are typed and infinite mode is enabled, reset the index.
        setCurrentIndex(0);
        setCurrentText('');
      }
  
      return () => {
        clearTimeout(timeout);
        clearTimeout(endTimeout);
      };
    }, [currentIndex, delay, eraseDelay, erasing, currentText, infinite, texts]);
  
    return <div className={Styles.typeCon} >
      <span className={Styles.text} >{currentText} </span>
      <span className={Styles.blink_line} ></span>
    </div>;
  };


interface ITypeWriter {
  texts: string[];
  delay?: number;
  infinite?: boolean;
  endDelay?: number;
  eraseDelay?: number
}

export default TypeWriter;
