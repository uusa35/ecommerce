import {Fragment, useContext, useMemo, useState} from 'react'
import { Disclosure, Transition, Menu} from '@headlessui/react'
import {
    MinusSmIcon,
    PlusSmIcon,
    ChevronDownIcon
} from '@heroicons/react/outline'
import {AppContext} from "../../../context/AppContext";
import FrontendContainer from "../../components/FrontendContainer";
import {map, isEmpty, capitalize,isNull} from 'lodash';
import ElementPrice from "../../components/widgets/ElementPrice";
import moment from "moment";
import ElementTags from "../../components/widgets/ElementTags";
import RelatedItems from "../../components/widgets/RelatedItems";
import './../../../../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery';
import ElementRating from "../../components/widgets/ElementRating";
import ElementFavoriteBtn from "../../components/widgets/ElementFavoriteBtn";
import {isMobile} from "react-device-detect";
import {toast} from "react-toastify";
import {useForm} from "@inertiajs/inertia-react";
import {useDispatch, useSelector} from "react-redux";
import {checkCartBeforeAdd} from "../../../redux/actions";
import AlertMessage from "../../partials/AlertMessage";
import FrontendContentContainer from "../../components/FrontendContentContainer";
import SubMetaElement from "../../../Backend/components/partials/SubMetaElement";
import SocialIconShare from "../../partials/SocialIconShare";


export default function FrontendServiceShow({element, relatedElements, auth}) {
    const {getThumb, getLarge, getLocalized, trans, classNames} = useContext(AppContext)
    const [selectedTiming, setSelectedTiming] = useState();
    const [currentImages, setCurrentImages] = useState([]);
    const {cart, parentModule, breadCrumbs} = useSelector(state => state);

    const dispatch = useDispatch();
    const {data, setData, post, progress} = useForm({
        'type': 'service',
        'cart_id': null,
        'element_id': element.id,
        'timing_id': null,
        'qty': 1,
        'price': element.isOnSale ? element.sale_price : element.price,
        'direct_purchase': element.direct_purchase,

    });

    useMemo(() => {
        const images = [{thumbnail: getThumb(element.image), original: getLarge(element.image)}]
        map(element.images, img => {
            images.push({thumbnail: getThumb(img.image), original: getLarge(img.image)})
        })
        setCurrentImages(images);
    }, [element])

    useMemo(() => {
        !isEmpty(selectedTiming) ? setData('timing_id', selectedTiming.id) : null;
    }, [selectedTiming])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNull(data.timing_id)) {
            toast.error(capitalize(trans('please_choose_timing')))
        } else {
            dispatch(checkCartBeforeAdd({
                cart_id: element.id,
                type: 'service',
                element_id: element.id,
                timing_id: selectedTiming.id,
                qty: 1,
                price: element.isOnSale ? element.sale_price : element.price,
                direct_purchase: element.direct_purchase,
                shipmentFees: 0,
                image: element.image,
                name_ar: element.name_ar,
                name_en: element.name_en,
                description_ar: element.description_ar,
                description_en: element.description_en,
                timing: selectedTiming,
                merchant_name_ar : element.user.name_ar,
                merchant_name_en : element.user.name_en
            }))
        }
    }

    return (
        <FrontendContainer>
            <SubMetaElement title={element[getLocalized()]}
                            description={element[getLocalized('description')]}
                            image={element.image}
            />
            <FrontendContentContainer childName={element[getLocalized()]}>
            <div className="max-w-2xl mx-auto lg:max-w-none mt-10 h-full">
                {/* Product */}
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-4 lg:px-4 lg:items-start">
                    {/* Image gallery */}
                    <div className="relative">
                        <ElementTags exclusive={element.exclusive} onSale={element.isOnSale} onNew={element.on_new}/>
                        <ImageGallery
                            showBullets={true}
                            showNav={false}
                            originalAlt={element[getLocalized()]}
                            originalTitle={element[getLocalized()]}
                            thumbnailLabel={element[getLocalized()]}
                            thumbnailTitle={element[getLocalized()]}
                            showThumbnails={true}
                            thumbnailPosition={isMobile ? 'bottom' : 'right'}
                            items={currentImages}/>
                    </div>
                    {/* Product info */}
                    <div className="mx-5 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{element[getLocalized()]}</h1>
                        <div className="mt-3">
                            <h2 className="sr-only">{trans('information')}</h2>
                            <ElementPrice price={element.price} salePrice={element.sale_price}
                                          showLocal={true}
                                          isOnSale={element.isOnSale} large={true}/>
                        </div>
                        {/* Reviews */}
                        {element.ratings && <ElementRating ratings={element.ratings} id={element.id} type={'service'}/>}
                        <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                            <div className="flex flex-1">
                                {
                                    element[getLocalized('caption')] && <div className="mt-6">
                                        <h3 className="sr-only">{trans('caption')}</h3>
                                        <div
                                            className="text-base text-gray-700 space-y-6"
                                        >{element[getLocalized('caption')]}</div>
                                    </div>
                                }
                            </div>
                            <div className="flex">
                                {
                                    element.sku && <div className="mt-6">
                                        <h3 className="sr-only">{trans('sku')}</h3>
                                        <div
                                            className="text-base text-gray-700 space-y-6"
                                        >
                                            {trans('reference_id')} :
                                            {element.sku}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mt-6">
                            {/* service timings */}
                            {element.timings && element.is_available &&
                            <Menu as="div" className="relative inline-block text-left mb-5 w-full">
                                <div>
                                    <Menu.Button
                                        className="flex flex-1 justify-between items-center w-full capitalize rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                        <div>
                                            {!isEmpty(selectedTiming) ? moment(`${selectedTiming.date} ${selectedTiming.start}`).format('dddd : L - HH:mm A') : trans('available_timings')}
                                        </div>
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true"/>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="z-30 origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {
                                                map(element.timings, t =>
                                                    <Menu.Item key={t.id}>
                                                        <div
                                                            onClick={() => setSelectedTiming(t)}
                                                            className={classNames(
                                                                t.id === selectedTiming?.id ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm hover:bg-gray-100'
                                                            )}
                                                        >
                                                            <div
                                                                className="flex flex-1 flex-col xl:flex-row justify-start items-center text-sm sm:text-lg">
                                                                <div
                                                                    className="flex flex-1 flex-col justify-start xl:flex-row xl:w-1/3 items-center">
                                                                    <span
                                                                        className="flex">{`${moment(t.date).format('dddd')} ${trans('equivalent')}`}</span>
                                                                    <span
                                                                        className="flex flex-1 justify-start sm:px-2 flex-row">{`${moment(t.date).format('L')}`}</span>
                                                                </div>
                                                                <div
                                                                    className="flex flex-col xl:flex-row justify-between items-center">
                                                                    <div className="flex capitalize">
                                                                        {`${trans('from')} ${moment(`${t.date} ${t.start}`).format('HH:mm A')}`}
                                                                    </div>
                                                                    <div className="flex ltr:ml-2 rtl:mr-2 capitalize">
                                                                        {`${trans('to')} ${moment(`${t.date} ${t.end}`).format('HH:mm A')}`}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Menu.Item>
                                                )
                                            }
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            }
                            {!element.is_available && <AlertMessage
                                title={trans('element_is_not_available')}
                                message={trans('element_is_not_available_currently_for_order')}
                            />}
                            <div className="flex flex-row justify-between items-center gap-x-5">
                                <form onSubmit={handleSubmit} className="w-full">
                                    <button
                                        disabled={!element.is_available}
                                        type="submit"
                                        className={classNames(!element.is_available ? `opacity-30` : `bg-gray-600`, `flex flex-1 bg-gray-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 sm:w-full`)}
                                    >
                                        {trans('add_to_cart')}
                                    </button>
                                </form>
                                <ElementFavoriteBtn id={element.id} type={'service'}
                                                    favoritesList={auth?.favoritesList}/>
                            </div>
                        </div>
                        {element.is_available && <AlertMessage
                            title={trans('service_booking')}
                            message={trans('service_booking_message')}
                        />}
                        <section aria-labelledby="details-heading" className="my-12">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>
                            <div className="border-t divide-y divide-gray-200 ">
                                {/* description */}
                                <Disclosure as="div" defaultOpen={true}>
                                    {({open}) => (
                                        <>
                                            <Disclosure.Button
                                                className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? 'text-gray-600' : 'text-gray-900',
                                                                  'capitalize font-extrabold'
                                                              )}
                                                          >
                                                            {trans('description')}
                                                          </span>
                                                <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <PlusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                      </span>
                                            </Disclosure.Button>
                                            <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                                                <p className="capitalize">
                                                    {element[getLocalized('description')]}
                                                </p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>


                                {/* notes */}
                                <Disclosure as="div" defaultOpen={false}>
                                    {({open}) => (
                                        <>
                                            <Disclosure.Button
                                                className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? 'text-gray-600' : 'text-gray-900',
                                                                  'capitalize'
                                                              )}
                                                          >
                                                            {trans('notes')}
                                                          </span>
                                                <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <PlusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                      </span>
                                            </Disclosure.Button>
                                            <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                                                <p className='capitalize'>
                                                    {element[getLocalized('notes')]}
                                                </p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                                {/* company  */}
                                <Disclosure as="div" defaultOpen={false}>
                                    {({open}) => (
                                        <>
                                            <Disclosure.Button
                                                className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? 'text-gray-600' : 'text-gray-900',
                                                                  'capitalize'
                                                              )}
                                                          >
                                                            {trans('owner')}
                                                          </span>
                                                <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <PlusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                      </span>
                                            </Disclosure.Button>
                                            <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                                                <div className="flex flex-1 justify-start items-start">
                                                    <div>
                                                        <img
                                                            className="w-40 h-auto rounded-sm shadow-md"
                                                            src={getThumb(element.user.image)}
                                                            alt={element.user[getLocalized()]}/>
                                                    </div>
                                                    <div className="rtl:mr-5 ltr:ml-5">
                                                        <h4>{element.user[getLocalized()]}</h4>
                                                        <h6>{element.user[getLocalized('caption')]}</h6>
                                                        <p>{element.user[getLocalized('description')]}</p>
                                                    </div>
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </section>

                        {/* Notes (direct purchase) */}
                        <section aria-labelledby="policies-heading" className="mt-10">
                            <h2 id="policies-heading" className="sr-only">
                                {trans('notes')}
                            </h2>

                            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 capitalize truncate">
                                {
                                    element.direct_purchase ? <div
                                        className="flex flex-1 flex-col justify-start items-center bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        <span
                                            className="mt-4 text-sm font-medium text-gray-900">{trans('direct_purchase')}</span>
                                        <dd className="mt-1 text-sm text-gray-500">{trans('direct_purchase')}</dd>
                                    </div> : null
                                }
                                {
                                    element.timings && <div
                                        className="flex flex-1 flex-col overflow-clip truncate capitalize justify-start items-center bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        <span
                                            className="mt-4 text-sm font-medium text-gray-900">{trans('timings')}</span>
                                        <p className="mt-1 text-xs text-gray-500">{trans('kwt_timing_zone')}</p>
                                    </div>
                                }
                                {
                                    element.sku &&
                                    <div
                                        className="flex flex-1 flex-col justify-start items-center bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                                            </svg>
                                        </div>
                                        <span
                                            className="mt-4 text-sm font-medium text-gray-900">{trans('reference_id')}</span>
                                        <dd className="mt-1 text-sm text-gray-500">{element.sku}</dd>
                                    </div>
                                }
                            </dl>
                        </section>
                    </div>
                </div>
                <SocialIconShare  />
                {/* related items */}
                {
                    relatedElements && relatedElements.meta.total > 0 &&
                    <RelatedItems elements={relatedElements.data} type={'service'}/>
                }
            </div>
        </FrontendContentContainer>
        </FrontendContainer>
    )
}