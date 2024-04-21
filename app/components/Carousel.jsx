import {Swiper, SwiperSlide} from 'swiper/react';
import React from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import {Navigation, Mousewheel, Zoom} from 'swiper/modules';

export const Carousel = ({photos}) => {
    return (
        <>
            <Swiper className="mySwiper block"
                    navigation={true}
                    modules={[Navigation, Mousewheel, Zoom]}
                    mousewheel={true}
                    zoom={true}
                    grabCursor={true}>
                {photos.map((photo, index) => {
                    return (
                        <SwiperSlide>
                            <div className={"image is-4by3 swiper-zoom-container"}>
                                <img src={photo} alt="" style={{objectFit: 'contain'}}/>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}