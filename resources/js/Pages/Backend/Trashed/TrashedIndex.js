import BackendContainer from "./../components/containers/BackendContainer";
import {Menu, Transition} from "@headlessui/react";
import {DotsVerticalIcon} from "@heroicons/react/solid";
import {Fragment, useContext, useEffect, useMemo, useState} from "react";
import {BackendContext} from "./../context/BackendContext";
import {orderBy, isEmpty} from 'lodash';
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js';
import LocalizedText from "../components/widgets/LocalizedText";


export default function TrashedIndex({elements, model }) {
    const {
        trans,
        classNames,
        isRTL,
        theme,
        handleDeleteItem,
        colName,
        sortDesc,
        handleSort,
    } = useContext(BackendContext);
    const [currentData, setCurrentData] = useState();

    useMemo(() => {
        setCurrentData(elements.data);
    }, [elements.data])

    useMemo(() => {
        if (sortDesc) {
            setCurrentData(orderBy(elements.data, [colName], ['desc']));
        } else {
            setCurrentData(orderBy(elements.data, [colName], ['asc']));
        }
    }, [sortDesc])

    return (
        <BackendContainer elements={elements} showSearch={elements.total > 1} showNoElements={elements.total < 1}
                          showMobileView={elements.total > 1}>
            <div className="flex flex-col hidden sm:block">
                <div className="overflow-visible ">
                    <div className="align-middle inline-block min-w-full rounded-b-lg">
                        <div
                            className={classNames(true ? `bg-${theme}-600` : 'bg-blue-600', "shadow border-b overflow-visible border-gray-200 sm:rounded-lg")}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead
                                    className={classNames(true ? `bg-${theme}-300` : '', "text-black font-extrabold uppercase")}>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 flex flex-row justify-start items-center rtl:text-right ltr:text-left  uppercase tracking-wider tracking-wider"
                                        onClick={() => handleSort('id')}
                                    >
                                        {sortDesc ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M5 15l7-7 7 7"/>
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 9l-7 7-7-7"/>
                                            </svg>}
                                        {trans('id')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" px-3 py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('main_image')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" px-3 py-3 flex flex-1 flex-row justify-start items-center rtl:text-right ltr:text-left"
                                        onClick={() => handleSort('name')}
                                    >
                                        {sortDesc ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M5 15l7-7 7 7"/>
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 9l-7 7-7-7"/>
                                            </svg>}
                                        {trans('name')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" px-3 py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('commands')}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    currentData && currentData.map(element =>
                                        <tr className={'bg-white border-b border-gray-100'} key={element.id}>
                                            <td className="px-3 py-4 whitespace-nowrap font-medium text-gray-900">{element.id}</td>
                                            <td className="px-3 py-4 whitespace-nowrap text-gray-500">
                                                <img className="w-14 h-14  object-contain rounded-md shadow-inner"
                                                     src={element.imageThumb} alt={element.name}/>
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap text-gray-500">{element.name}</td>
                                            <td className=" px-6 py-4 whitespace-nowrap text-right font-medium">
                                                <div key={element.name}
                                                     className="relative flex justify-center items-center rounded-full shadow-md w-12 h-12">
                                                    <Menu as="div" className="abflex-shrink-0 z-60">
                                                        {({open}) => (
                                                            <>
                                                                <Menu.Button
                                                                    className={`w-8 h-8 bg-white inline-flex items-center justify-center text-${theme}-400 rounded-full hover:text-${theme}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme}-500`}>
                                                                            <span
                                                                                className="sr-only">Open options</span>
                                                                    <DotsVerticalIcon className="w-5 h-5"
                                                                                      aria-hidden="true"/>
                                                                </Menu.Button>
                                                                <Transition
                                                                    show={open}
                                                                    as={Fragment}
                                                                    enter="transition ease-out duration-100"
                                                                    enterFrom="transform opacity-0 scale-95"
                                                                    enterTo="transform opacity-100 scale-100"
                                                                    leave="transition ease-in duration-75"
                                                                    leaveFrom="transform opacity-100 scale-100"
                                                                    leaveTo="transform opacity-0 scale-95"
                                                                >
                                                                    <Menu.Items
                                                                        static
                                                                        className={classNames(isRTL ? 'right-10' : 'left-10', "z-40 mx-3 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none")}
                                                                    >
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <Link
                                                                                        href={route(`backend.restore`, { id : element.id , model })}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right'
                                                                                        )}
                                                                                    >
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            className="h-6 w-6 mx-2"
                                                                                            fill="none"
                                                                                            viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path strokeLinecap="round"
                                                                                                  strokeLinejoin="round"
                                                                                                  strokeWidth={2}
                                                                                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                                                        </svg>
                                                                                        {trans('restore')}
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </div>
                                                                    </Menu.Items>
                                                                </Transition>
                                                            </>
                                                        )}
                                                    </Menu>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </BackendContainer>
    );
}

