import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';

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
                                <a href={photo} target={"_blank"} rel="noopener noreferrer"><img src={photo} alt=""
                                                                                                 style={{objectFit: 'contain'}}/></a>
                            </div>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </>
    );
}