import style from "./Home.module.scss";
import Card from "./components/Card/Card";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getGames } from "../../redux/gamesSlice";
import Loader from "../../ui/loader/Loader";
import Search from "./components/Search/Search";
import ScrollUp from "../../ui/scrollUp/ScrollUp";
import Filter from "./components/Filter/Filter";

export default function Cards() {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector((state: RootState) => state.games.games);
  const loading = useSelector((state: RootState) => state.games.load);
  const error = useSelector((state: RootState) => state.games.error);
  
  const getGamesList = () => {
    dispatch(getGames(0))
  }

  useEffect(() => {
    if(games.length === 0) getGamesList()
  }, [games.length])

  useEffect(() => {

  },[games])

  return (
    <div className={style.wrap}>
      <Search />
      <Filter />
      <ScrollUp />
      {loading && <Loader />}
      {!loading &&
      <div className={style.container}>
        {games.map((card) => {
          return (
            <div className={style.item} key={card.id}>
              <Link to={`/${card.slug}`}>
                  <Card game={card} />
              </Link>            
            </div>
          );
        })}
      </div>}
        {error.length > 0 && !loading &&
          <div className={style.errorButton}>
            <b>{error}</b>
            <button 
              className='button'
              onClick={() => getGamesList()}
            >Обновить страницу</button>
          </div>          
        }
    </div>    
  );
}
