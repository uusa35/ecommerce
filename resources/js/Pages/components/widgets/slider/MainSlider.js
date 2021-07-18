// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y , EffectFade} from 'swiper';
import { isEmpty } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const MainSlider = ({elements}) => {
  return (
    <div className="w-full">
      {!isEmpty(elements) && (
        <Swiper
            navigation
            pagination
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          className="mySwiper"
          spaceBetween={0}
            slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {elements.map((s) => (
            <SwiperSlide key={s.id}>
              <img
                  className="w-full h-auto object-cover"
                src={s.imageLarge || s.imageThumb}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MainSlider;
