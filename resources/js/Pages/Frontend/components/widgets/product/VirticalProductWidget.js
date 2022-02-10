import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import React, {useContext} from "react";
import {AppContext} from "../../../../context/AppContext";
import ElementPrice from "../ElementPrice";
import ElementTags from "../ElementTags";
import {truncate} from "lodash";
import {motion} from "framer-motion"
import {useSelector} from "react-redux";

export default function({element}) {
    const {getLocalized, getThumb, mainBgColor, mainColor, trans, classNames } = useContext(AppContext);
    const { locale } = useSelector(state => state);

    return (
        <motion.div
            initial={false}
            whileHover={{scale: 0.95}}
        >
            <div className={`flex border border-${mainColor}-100 dark:border-${mainColor}-100 rounded-md`}>

                <div className="w-1/2 rounded-t-sm overflow-hidden  sm:h-auto">
                    <ElementTags onSale={element.isOnSale} onNew={element.on_new} exclusive={element.exclusive}
                                 rounded={true}/>
                    <img
                        src={getThumb(element.image)}
                        alt={element[getLocalized()]}
                        className={classNames(locale.isRTL ? `rounded-r-md` : `rounded-l-md`, `w-full object-cover object-bottom`)}
                        width={480}
                        height={360}
                        loading='lazy'
                    />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-start items-start">
                    <ElementPrice price={element.price}
                                  salePrice={element.sale_price}
                                  isOnSale={element.isOnSale}/>
                    <div className="flex justify-between">
                        <h3 className={`text-2xl text-base font-bold text-${mainColor}-800 dark:text-${mainColor}-50  truncate`}>
                            <Link
                                className="font-medium text-gray-700 hover:text-gray-800"
                                href={route('frontend.product.show', element.id)}>
                                <span className=""/>
                                {truncate(element[getLocalized()], {length: 20})}
                            </Link>
                        </h3>
                    </div>
                    <div className={`flex flex-1`}>
                        {element[getLocalized('description')] && element[getLocalized('description')].length > 10 &&
                        <p className={`break-all pt-3 text-sm text-ellipsis overflow-hidden capitalize font-bold text-${mainColor}-800 dark:text-${mainColor}-50`}>
                            {truncate(element[getLocalized('description')], {length: 150})}
                        </p>
                        }
                    </div>
                    <Link
                        href={route('frontend.product.show', element.id)}
                        className={`flex bg-${mainColor}-800 dark:bg-${mainColor}-400 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-${mainBgColor}-200 dark:text-${mainBgColor}-100 hover:bg-${mainColor}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`}
                    >
                        <span className={`flex flex-row flex-1 justify-evenly items-center`}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill={`none`}
                                     viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                                </svg>
                            </div>
                            <div className={`text-sm`}>
                                {trans('view_details')}
                            </div>
                        </span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
