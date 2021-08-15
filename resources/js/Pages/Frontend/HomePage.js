/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment, useContext} from 'react'
import {AppContext} from "../context/AppContext";
import MainSlider from "../Frontend/components/widgets/slider/MainSlider";
import FrontendContainer from "./components/FrontendContainer";
import Ziggy from 'ziggy-js';
import ElementSlider from "./components/widgets/slider/ElementSlider";

const navigation = [
    {name: 'Product', href: '#'},
    {name: 'Features', href: '#'},
    {name: 'Marketplace', href: '#'},
    {name: 'Company', href: '#'},
]

export default function HomePage({slides, homeCategories, newOnHomeBooks, onHomeParticipantAuthors }) {
    const {trans, parentModule, getLarge, getLocalized, locale, getThumb, isRTL} = useContext(AppContext);

    return (
        <FrontendContainer mainSlides={slides} showBreadCrumbs={false}>
            <div className="bg-white space-y-14 max-w-2xl px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
                <ElementSlider
                    showNavigation={false}
                    elements={homeCategories}
                    slidesPerView={4}
                    title={trans('categories')}
                    type={'category'}
                />
                <ElementSlider
                    elements={newOnHomeBooks}
                    showNavigation={false}
                    slidesPerView={4}
                    title={trans('new_chosen_books')}
                    type={'book'}
                />
                <ElementSlider
                    elements={onHomeParticipantAuthors}
                    showNavigation={false}
                    slidesPerView={5}
                    title={trans('participant_authors')}
                    type={'user'}
                />
            </div>
        </FrontendContainer>
    )
}
