import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "./../components/FrontendContainer";
import ElementSlider from "./../components/widgets/slider/ElementSlider";
import {isMobile, isTablet} from 'react-device-detect';
import NewsLetter from "./../partials/NewsLetter";
import MainGallery from "./../components/widgets/slider/MainGallery";
import FrontendContentContainer from "./../components/FrontendContentContainer";
import {filter, first} from 'lodash';
import JoinusPage from "./../Pages/JoinusPage";
import JoinusHomeSection from "./../partials/JoinusHomeSection";
import CategoriesGroup from "./../components/widgets/category/CategoriesGroup";
import route from 'ziggy-js'
import InformationBtns from "./../partials/InformationBtns";
import HomeMainCategory from "./HomeMainCategory";
import GlobalContext from "../../context/GlobalContext";

export default function HomePage({
                                     slides,
                                     homeCategories,
                                     newOnHomeBooks,
                                     newOnHomeCourses,
                                     newOnHomeProducts,
                                     onHomeParticipantAuthors,
                                     mgt,
                                     clearCart = false,
                                     settings
                                 }) {
    const [slideNumber, setSlideNumber] = useState(isMobile ? 1 : (isTablet ? 2 : 5))
    const {categories} = useContext(GlobalContext);
    const {trans} = useContext(AppContext)

    useEffect(() => {
        function handleResize() {
            window.innerWidth < 1200 ? setSlideNumber(2) : setSlideNumber(5);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return (
        <FrontendContainer showBreadCrumbs={false}>
            {/*{mainSlides && <MainSwiper elements={mainSlides}/>}*/}
            <FrontendContentContainer showBreadCrumbs={false}>
                {slides && <MainGallery elements={slides}/>}
                <div className="bg-white space-y-10 py-14 w-full px-4 sm:py-14 sm:px-6 lg:px-8">

                    {
                        settings.enable_joinus ? <JoinusHomeSection/> : null
                    }
                    {
                        settings.enable_books && <>

                            <ElementSlider
                                elements={filter(categories, c => c.is_book && c.on_home)}
                                slidesPerView={slideNumber}
                                title={trans('book_home_featured_categories')}
                                type={'category'}
                                moduleType={'book'}
                                params={{is_book: true}}
                            />
                            <ElementSlider
                                elements={newOnHomeBooks}
                                slidesPerView={slideNumber}
                                title={trans('new_chosen_books')}
                                type={'book'}
                            />
                            <ElementSlider
                                elements={onHomeParticipantAuthors}
                                slidesPerView={isTablet || isMobile ? 1 : 8}
                                title={trans('participant_authors')}
                                type={'user'}
                            />
                        </>
                    }
                    {
                        settings.enable_courses && <>
                            <ElementSlider
                                elements={filter(categories, c => c.is_course && c.on_home)}
                                slidesPerView={slideNumber}
                                title={trans('course_home_featured_categories')}
                                type={'category'}
                                moduleType={'course'}
                                params={{is_course: true}}
                            />
                            <ElementSlider
                                elements={newOnHomeCourses}
                                slidesPerView={slideNumber}
                                title={trans('featured_courses')}
                                type={'course'}
                            />
                        </>
                    }
                    {
                        settings.enable_products && <>

                            <ElementSlider
                                elements={filter(categories, c => c.is_product && c.on_home)}
                                slidesPerView={slideNumber}
                                title={trans('product_home_featured_categories')}
                                type={'category'}
                                moduleType={'product'}
                                params={{is_product: true}}
                            />
                            <ElementSlider
                                elements={newOnHomeProducts}
                                slidesPerView={slideNumber}
                                title={trans('featured_products')}
                                type={'product'}
                            />
                            <HomeMainCategory
                                element={first(filter(categories, c => c.is_product && c.image.length > 5))}
                            />
                            {/*<InformationBtns />*/}
                            <CategoriesGroup
                                params={{is_product: true}}
                                type={'product'}
                                title={trans('other_categories')}
                                categories={filter(categories, c => c.is_product)}/>
                        </>
                    }
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}

// {
//     settings.enable_newsletter && <NewsLetter/>
// }