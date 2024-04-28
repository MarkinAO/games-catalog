import { useRef } from "react";
import style from './ScrollUp.module.scss';

const autoScroll = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

export default function ScrollUp() {
    const ref = useRef<HTMLDivElement>(null);
    function scrollFunction() {
        if (window.scrollY > 380) {
            if(ref.current) ref.current.className = `${style.arrow}`
        } else {
            if(ref.current) ref.current.className = `${style.hidden}`
        }
    }
    window.onscroll = () => {
        scrollFunction();
    };

    return(
        <>
            <div 
                className="skroll-up_arrow hidden" 
                onClick={() => autoScroll()}
                ref={ref}
            ></div>
        </>
    )
}