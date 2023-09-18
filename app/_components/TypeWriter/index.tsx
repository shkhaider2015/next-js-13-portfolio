import React, { FC, useEffect, useState } from 'react';
import Styles from './TypeWriter.module.css';


const TypeWriter:FC<ITypeWriter> = (props) => {
    const { text, delay, infinite=false, endDelay=1000 } = props;
    const [currentText, setCurrentText] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        let timeout:any;
        let endTimeout:any;
        if(currentIndex <= text.length)
        {
            timeout = setTimeout(() => {
                if(currentIndex === text?.length -1)
                {
                    endTimeout = setTimeout(() => {
                        setCurrentIndex(prevIndex => prevIndex + 1)
                    }, endDelay);
                    setCurrentText(prevText => prevText + text[currentIndex]);
                    
                }
                else
                {
                    setCurrentText(prevText => prevText + text[currentIndex]);
                    setCurrentIndex(prevIndex => prevIndex + 1)
                }
                
            }, delay)
        }
        else if(infinite) {
            setCurrentIndex(0);
            setCurrentText('')
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, delay, endDelay, text, infinite])

    return <span>{currentText}</span>
}

interface ITypeWriter{
    text: string;
    delay: number;
    endDelay?: number;
    infinite?: boolean
}

export default TypeWriter;