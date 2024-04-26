import style from './Loader.module.scss';
import loader from './loader.gif';

export default function Loader() {
    return(
        <img src={loader} alt="Loading..." className={style.loader} />
    )
}