import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { screenshot } from '../../../../model/types';
import { v4 as uuidv4 } from 'uuid';
import style from './Slider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface ISlider {
    images: screenshot[]
}

export default function Slider({ images }: ISlider) {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className={style.slider}
    >
        <>
        {images.map(el => {
            return <SwiperSlide key={uuidv4()}><img src={el.image} alt="" className={style.slide} /></SwiperSlide>
        })}   
        </>           
    </Swiper>
  )
}