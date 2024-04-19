import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef, useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export const Carousel = ({photos}) => {
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper block">

                {photos.map((photo, index) => {
                    return (
                        <SwiperSlide>
                            <div className={"image is-4by3"}>
                                <img src={photo} alt="" style={{ objectFit: 'contain' }} />
                            </div>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </>
    );
}