import {PlusSmIcon} from "@heroicons/react/solid";
import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {map, range} from "lodash";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {useSelector} from "react-redux";
import GlobalContext from "../../context/GlobalContext";

export default function SearchIndexSideBar({setMobileFiltersOpen, categories, mobileFiltersOpen, type, enablePrice = true}) {
    const {trans, getLocalized, classNames } = useContext(AppContext)
    const {locale} = useSelector(state => state);
    const { settings } = useContext(GlobalContext);
    const {params} = route();
    return (
        <aside>
            <h2 className="sr-only capitalize">{trans('advanced_search')}</h2>
            <div className="flex flex-1 justify-between items-center">
                <div className="flex">
                    <button
                        type="button"
                        className="inline-flex items-center lg:hidden bg-gray-900 p-3 rounded-md shadow-md capitalize"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <span className="text-white capitalize">{trans('advanced_search')}</span>
                        <PlusSmIcon className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </button>
                </div>
                <div className="flex">
                    <Link
                        href={type && route().has(`frontend.${type}.index`) ? route(`frontend.${type}.index`) : '#'}
                        className="inline-flex items-center lg:hidden text-white bg-gray-900 p-3 rounded-md shadow-md capitalize"
                    >
                        {trans('clear_search')}
                    </Link>
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="divide-y divide-gray-200 space-y-3">
                    <div className="flex flex-1 justify-between items-center">
                        <div className="flex">
                            <h3 className="capitalize">{trans('filters')}</h3>
                        </div>
                        <div className="flex">
                            <Link
                                href={type && route().has(`frontend.${type}.index`) ? route(`frontend.${type}.index`) : '#'}
                                className="px-3 py-1 text-gray-800 rounded-md shadow-sm ring-2 ring-gray-400 capitalize"
                            >
                                {trans('clear_search')}
                            </Link>

                        </div>
                    </div>
                    {/* price search */}
                    {
                        enablePrice && settings.enable_prices && <>
                            <div className="flex pt-3">
                                <h3 className="capitalize">{trans('prices')}</h3>
                            </div>
                            {
                                map(range(50, 300, 50), r =>
                                    <div key={r} className="pt-3">
                                        <fieldset className="space-y-3">
                                            <div className="pt-3 space-y-3">
                                                <Link
                                                    href={route().has(`frontend.${type}.index`) ? route(`frontend.${type}.index`, { ...params , max: r, min : parseInt(r -50)}) : '#'}
                                                    className={classNames(params.max == r ? `bg-gray-50 p-3 rounded-md shadow-md`: '' , "flex items-center")}>
                                                    {
                                                        locale.isRTL ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                                 viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd"
                                                                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                      clipRule="evenodd"/>
                                                            </svg>
                                                            : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                                   viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd"
                                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                      clipRule="evenodd"/>
                                                            </svg>
                                                    }
                                                    <label htmlFor={'name'}
                                                           className="rtl:mr-3 ltr:ml-3 text-sm text-gray-600 capitalize">
                                                        {`${trans("less_than")} ${r} ${trans('kd')}`}
                                                    </label>
                                                </Link>
                                            </div>
                                        </fieldset>
                                    </div>
                                )}

                        </>
                    }

                    <div className="flex pt-3">
                        <h3 className="capitalize">{trans('categories')}</h3>
                    </div>
                    {map(categories, c => (
                        <div key={c.id} className="pt-3">
                            <fieldset className="space-y-3">
                                <div className="pt-3 space-y-3">
                                    <Link
                                        href={route(`frontend.${type}.index`, { ...params , category_id: c.id})}
                                        className="flex items-center">
                                        {
                                            locale.isRTL ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                                viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                       viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                        }
                                        <label htmlFor={'name'}
                                               className="rtl:mr-3 ltr:ml-3 text-sm text-gray-600 capitalize">
                                            {c[getLocalized()]}
                                        </label>
                                    </Link>
                                </div>
                                {
                                    map(c.children, child => (
                                        <div className="pt-1 space-y-3 mx-5" key={child.id}>
                                            <Link
                                                href={route(`frontend.${type}.index`, { ...params , category_id: child.id})}
                                                className="flex items-center">
                                                <input
                                                    readOnly
                                                    type="checkbox"
                                                    checked={child.id == params.category_id}
                                                />
                                                {
                                                    locale.isRTL ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd"
                                                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                        : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                               viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd"
                                                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                }
                                                <label htmlFor={'name'}
                                                       className="rtl:mr-3 ltr:ml-3 text-sm text-gray-600 capitalize">
                                                    {child[getLocalized()]}
                                                </label>
                                            </Link>
                                            {
                                                map(child.children, sub => (
                                                    <div className="pt-1 space-y-3 mx-2" key={sub.id}>
                                                        <Link
                                                            href={route(`frontend.${type}.index`, { ...params, category_id: sub.id})}
                                                            className="flex items-center">
                                                            <input
                                                                readOnly
                                                                type="checkbox"
                                                                checked={sub.id == params.category_id}
                                                            />
                                                            {
                                                                locale.isRTL ? <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    className="h-5 w-5"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="currentColor">
                                                                        <path fillRule="evenodd"
                                                                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                              clipRule="evenodd"/>
                                                                    </svg>
                                                                    : <svg xmlns="http://www.w3.org/2000/svg"
                                                                           className="h-5 w-5" viewBox="0 0 20 20"
                                                                           fill="currentColor">
                                                                        <path fillRule="evenodd"
                                                                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                              clipRule="evenodd"/>
                                                                    </svg>
                                                            }
                                                            <label htmlFor={'name'}
                                                                   className="rtl:mr-3 ltr:ml-3 text-sm text-gray-600 capitalize">
                                                                {sub[getLocalized()]}
                                                            </label>
                                                        </Link>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </fieldset>

                        </div>
                    ))}
                </div>
            </div>
        </aside>
    )
        ;
}
