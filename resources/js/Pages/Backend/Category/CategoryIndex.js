import BackendContainer from "../components/containers/BackendContainer";
import route from 'ziggy-js';
import {map} from "lodash";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {showModal} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import ActiveDot from "../components/widgets/ActiveDot";
import ToolTipWidget from "../components/widgets/ToolTipWidget";

export default function({elements}) {
    const {trans, classNames, getLocalized} = useContext(AppContext);
    const { locale } = useSelector(state => state);
    const {params} = route();
    const dispatch = useDispatch();

    return (
        <BackendContainer
            elements={elements}
            showSearch={false}
            showNoElements={elements.meta.total < 1}
            showMobileView={elements.meta.total > 1}
            total={elements.meta.total}
            links={elements.meta.links}
            mainModule={'category'}
        >
            <div className="flex flex-col ">
                <div className=" overflow-auto">
                    <div className="align-middle inline-block min-w-full rounded-b-lg">
                        <div
                            className={classNames(true ? `bg-gray-600` : 'bg-blue-600', "shadow border-b border-gray-200 sm:rounded-lg")}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead
                                    className={classNames(true ? `bg-gray-300` : '', "text-black font-extrabold text-sm uppercase")}>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-3 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                    >
                                        {trans('id')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                    >
                                        {trans('name')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                    >
                                        {trans('categories_children')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                    >
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex">
                                                {trans('commands')}
                                            </div>
                                            <div className="flex">
                                                <Link
                                                    href={route('backend.category.create', {user_id: elements.data.length > 0 ? elements.data[0]?.user_id : params.user_id})}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                </Link>

                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {map(elements.data, element => (
                                    <tr key={element.id}>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element.id}</td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                            <div className='flex flex-row justify-start items-center'>
                                                <ActiveDot active={element.active}/>
                                                {element[getLocalized()]}
                                            </div>
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                            <ol className="rtl:mr-2 ltr:ml-2 space-y-3">
                                                {element.children.length > 0 && map(element.children, child => (
                                                    <>
                                                        <li className="py-2 flex flex-1 flex-row justify-between items-center border-b-2 border-gray-200"
                                                            key={child.id}>
                                                            <Link
                                                                className="flex flex-1 justify-between items-center"
                                                                href={route('backend.category.edit', child.id)}>
                                                                <ActiveDot active={child.active}/>
                                                                <span
                                                                    className="flex flex-row justify-start flex-1 ">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     className="h-5 w-5 mx-4"
                                                                                     viewBox="0 0 20 20"
                                                                                     fill="currentColor">
                                                                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                                                                                    </svg>
                                                                    {child[getLocalized()]}</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     className="h-4 w-4 mx-3"
                                                                     fill="none" viewBox="0 0 24 24"
                                                                     stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                                </svg>
                                                            </Link>
                                                            <Link
                                                                href={route(`backend.toggle.activate`, {
                                                                    model: 'category',
                                                                    id: child.id
                                                                })}
                                                                className="text-gray-600 hover:text-gray-900 has-tooltip">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                                </svg>
                                                                <div className={classNames(locale.isRTL ? `left-10`: `right-10`,'absolute z-50')}>
                                                                    <ToolTipWidget message={trans('toggle_active')}/>
                                                                </div>
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    dispatch(showModal({
                                                                        type: 'destroy',
                                                                        model: 'category',
                                                                        id: child.id,
                                                                        title: `${trans('destroy')} ${trans('category')} ${child[getLocalized()]}`,
                                                                        message: `${trans('confirmation')} ${trans('destroy')} ${trans('category')}`,
                                                                    }))
                                                                }
                                                                className="text-gray-600 hover:text-gray-900 ">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     className="h-4 w-4 mx-3"
                                                                     fill="none" viewBox="0 0 24 24"
                                                                     stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                                </svg>
                                                            </button>
                                                        </li>
                                                        <ol className="rtl:mr-10 ltr:ml-10 space-y-2">
                                                            {
                                                                child.children.length > 0 && map(child.children, sub =>
                                                                        <li className="py-2 flex flex-1 flex-row justify-start items-center"
                                                                            key={sub.id}>
                                                                            <Link
                                                                                className="flex flex-1 flex-row justify-between items-center"
                                                                                href={route('backend.category.edit', sub.id)}>
                                                                                <ActiveDot active={sub.active}/>
                                                                            <span
                                                                                className="flex flex-row justify-start flex-1 ">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     className="h-5 w-5 mx-4"
                                                                                     viewBox="0 0 20 20"
                                                                                     fill="currentColor">
                                                                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                                                                                    </svg>
                                                                                {sub[getLocalized()]}</span>
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     className="h-4 w-4 mx-3"
                                                                                     fill="none" viewBox="0 0 24 24"
                                                                                     stroke="currentColor">
                                                                                    <path strokeLinecap="round"
                                                                                          strokeLinejoin="round"
                                                                                          strokeWidth={2}
                                                                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                                                </svg>
                                                                            </Link>
                                                                            <Link
                                                                                href={route(`backend.toggle.activate`, {
                                                                                    model: 'category',
                                                                                    id: sub.id
                                                                                })}
                                                                                className="text-gray-600 hover:text-gray-900 has-tooltip">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                                                </svg>
                                                                                <div className={classNames(locale.isRTL ? `left-10`: `right-10`,'absolute z-50')}>
                                                                                    <ToolTipWidget message={trans('toggle_active')}/>
                                                                                </div>
                                                                            </Link>
                                                                            <button
                                                                                onClick={() =>
                                                                                    dispatch(showModal({
                                                                                        type: 'destroy',
                                                                                        model: 'category',
                                                                                        id: sub.id,
                                                                                        title: `${trans('destroy')} ${trans('category')} ${sub[getLocalized()]}`,
                                                                                        message: `${trans('confirmation')} ${trans('destroy')} ${trans('category')}`,
                                                                                    }))
                                                                                }
                                                                                // href={route(`backend.category.destroy`, a.id)}
                                                                                className="text-gray-600 hover:text-gray-900 ">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     className="h-4 w-4 mx-3"
                                                                                     fill="none" viewBox="0 0 24 24"
                                                                                     stroke="currentColor">
                                                                                    <path strokeLinecap="round"
                                                                                          strokeLinejoin="round"
                                                                                          strokeWidth={2}
                                                                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                                                </svg>
                                                                            </button>
                                                                        </li>
                                                                )
                                                            }
                                                        </ol>
                                                    </>
                                                ))}
                                            </ol>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                            <div className="flex flex-row items-center justify-around">
                                                <Link href={route(`backend.category.edit`, element.id)}
                                                      className="text-gray-600 hover:text-gray-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={route(`backend.toggle.activate`, {
                                                        model: 'category',
                                                        id: element.id
                                                    })}
                                                    className="text-gray-600 hover:text-gray-900 has-tooltip">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                    </svg>
                                                    <div className={classNames(locale.isRTL ? `left-10`: `right-10`,'absolute z-50')}>
                                                        <ToolTipWidget message={trans('toggle_active')}/>
                                                    </div>
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        dispatch(showModal({
                                                            type: 'destroy',
                                                            model: 'category',
                                                            id: element.id,
                                                            title: `${trans('destroy')} ${trans('category')} ${element[getLocalized()]}`,
                                                            message: `${trans('confirmation')} ${trans('destroy')} ${trans('category')}`,
                                                        }))
                                                    }
                                                    // href={route(`backend.category.destroy`, a.id)}
                                                    className="text-gray-600 hover:text-gray-900 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </BackendContainer>
    )
}
