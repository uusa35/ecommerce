import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import GlobalContext from "./GlobalContext";
import {split, first, map, isEmpty, isNull, filter, each} from 'lodash';
import Ziggy from 'ziggy-js';
import {Inertia} from "@inertiajs/inertia";
import route from "ziggy-js";
import {isLocal} from "../helpers";
import moment from "moment";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {GrClose, IoCloseOutline} from "react-icons/all";
import {useSelector, useDispatch} from "react-redux";
import {translations} from './../../Pages/translations';
import {
    hideToastMessage,
    setBreadCrumbs,
    setModules,
    setParentModule,
    startBootStrapped
} from "../redux/actions";
import LoadingView from "../Backend/components/widgets/LoadingView";
import ConfirmationModal from "../Backend/components/partials/ConfirmationModal";
import {capitalize} from "lodash/string";

const AppContext = createContext({});

const AppContextProvider = ({children}) => {
    const {lang, locale, bootStrapped, confirmationModal, toastMessage } = useSelector(state => state);
    const {auth, settings, currencies} = useContext(GlobalContext);
    const dispatch = useDispatch();

    // const [isLoading, setIsLoading] = useLocalStorage('isLoading',true);
    // const [sideBarOpen, setSideBarOpen] = useLocalStorage('sideBarOpen',false);
    // const [currentRoute, setCurrentRoute] = useLocalStorage('currentRoute',route().current());
    // const [parentModule, setParentModule] = useLocalStorage('parentModule','');
    // const [childModule, setChildModule] = useLocalStorage('childModule','');
    // const [sysMessage, setSysMessage] = useLocalStorage('sysMessage',[])
    // const [isAdminOrAbove, setIsAdminOrAbove] = useState(false);
    // const [isSuper, setIsSuper] = useState(false);
    // const [formTabs, setFormTabs] = useLocalStorage('formTabs',[
    //     {id: 0, name: 'basic_information'},
    //     {id: 1, name: 'additional_information'},
    //     {id: 2, name: 'more_images'},
    // ]);
    // const [modules, setModules] = useState([]);
    // const [currentFormTab, setCurrentFormTab] = useLocalStorage('currentFormTab',first(formTabs));
    // const [showConfirmationModal, setShowConfirmationModal] = useLocalStorage('showConfirmationModal',false);
    // const [confirmationModalMessage, setConfirmationModalMessage] = useLocalStorage('confirmationModalMessage',{});
    // const [confirmationModalResponse, setConfirmationModalResponse] = useLocalStorage('confirmationModalResponse',false);
    // const [modalAction, setModalAction] = useLocalStorage('modalAction',{});
    // const [currentBreadCrumbs, setCurrentBreadCrumbs] = useLocalStorage('currentBreadCrumbs',{})
    // const [sortDesc, setSortDesc] = useLocalStorage('sortDesc',true)
    // const [colName, setColName] = useLocalStorage('colName','id');
    // const [locale, setLocale] = useLocalStorage('locale',document.getElementById('locale').innerHTML);
    // const [currency,setCurrency] = useLocalStorage('currency',currencies ? first(currencies) : {})
    // const [guest, setGuest] = useState(true)

    const options = {
        // onOpen: props => console.log(props.foo),
        // onClose: props => console.log(props.foo),
        autoClose: 6000,
        closeButton: IoCloseOutline,
        type: toast.TYPE.INFO,
        hideProgressBar: false,
        position: locale == 'ar' ? toast.POSITION.TOP_RIGHT : toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        progress: 0.2,
        closeOnClick: true,
        draggable: true,
    };

    // const handleSort = (colName) => {
    //     setColName(colName)
    //     setSortDesc(!sortDesc)
    // }
    const context = {
        //     locale,
        //     setLocale,
        //     isLoading,
        //     sideBarOpen,
        //     sortDesc,
        //     setSortDesc,
        //     colName,
        //     setColName,
        //     handleSort: (colName) => handleSort(colName),
        //     toggleIsLoading: (loading) => setIsLoading(loading),
        //     toggleSideBar: () => setSideBarOpen(!sideBarOpen),
        trans: (name) => translations[lang][name],
        classNames: (...classes) => classes.filter(Boolean).join(' '),
        //     setSystemMessage: (message) => setSysMessage(message),
        //     setCurrentFormTab: (tab) => setCurrentFormTab(tab),
        //     setCurrency : (currency) => setCurrency(currency),
        //     cart,
        //     currency,
        //     guest,
        //     formTabs,
        //     currentFormTab,
        //     sysMessage,
        //     currentRoute,
        //     currentBreadCrumbs,
        //     setCurrentBreadCrumbs,
        //     setCurrentRoute,
        //     parentModule,
        //     childModule,
        //     theme: settings.theme,
        //     modules,
        //     showConfirmationModal,
        //     setShowConfirmationModal,
        //     setConfirmationModalMessage,
        //     confirmationModalMessage,
        //     confirmationModalResponse,
        //     setConfirmationModalResponse,
        //     modalAction,
        //     setModalAction,
        //     otherLang: locale === 'ar' ? 'en' : 'ar',
        //     dir: locale === 'ar' ? 'rtl' : 'ltr',
        //     isRTL : locale === 'ar' ,
        getLocalized: (element = 'name') => lang === 'ar' ? `${element}_ar` : `${element}_en`,
        getThumb: (element) => `${Ziggy().t.url}/storage/uploads/images/thumbnail/${element}`,
        getLarge: (element) => `${Ziggy().t.url}/storage/uploads/images/thumbnail/${element}`,
        getFileUrl: (element) => `${Ziggy().t.url}/storage/uploads/files/${element}`,
        baseUrl: `${Ziggy().t.url}/`,
        isAdminOrAbove: !isEmpty(auth) && (auth.role?.is_admin || auth.role?.is_super),
        isSuper: !isEmpty(auth) && auth.role?.is_super,
        isAuthor: !isEmpty(auth) && auth.role?.is_author,
        guest: isEmpty(auth),
        //     setParentModule: (module) => setParentModule(module),
        //     setChildModule: (module) => setChildModule(module),
        //     handleDeleteItem: (type, model, id) => {
        //         setShowConfirmationModal(true)
        //         setModalAction({
        //             type,
        //             model,
        //             ide
        //         })
        //     }
    };

    // useEffect(() => {
    //     if (auth && isEmpty(modules)) {
    //         const filteredModules = map(auth.role.privileges, p => {
    //             return {
    //                 name: p.name_en,
    //                 index: p.index,
    //                 main_menu: p.main_menu,
    //                 image: p.image
    //             }
    //         });
    //         setModules(filteredModules);
    //         setIsAdminOrAbove(auth?.role.is_admin || auth?.role.is_super);
    //         setIsSuper(auth?.role.is_super);
    //         setGuest(false);
    //     } else {
    //         setIsSuper(false);
    //         setIsAdminOrAbove(false);
    //         setGuest(true);
    //         setModules([])
    //     }
    // }, [auth?.role, auth?.role.privileges]);

    useMemo(() => {
        document.getElementById('lang').innerHTML = lang;
        moment.locale(lang);
    }, [lang])

    useEffect(() => {
        isLocal() && console.log('useEffect starts here =====>')
        Inertia.on('navigate', (e) => {
            isLocal() && console.log('navigate ==>')
            const currentRoute = route().current();
            console.log('currentRoute ====!!!!', currentRoute);
            const breadCrumbs = split(currentRoute, '.');
            isLocal() && console.log('befre Module', breadCrumbs[1])
            isLocal() && console.log('bread', breadCrumbs);
            dispatch(setBreadCrumbs(breadCrumbs))
            dispatch(setParentModule(breadCrumbs[1]));
        })
        // setIsLoading(true);
    }, [route().current()])

    useEffect(() => {
        Inertia.on('before', (e) => {
            isLocal() && console.log('before ==>')
        })
        Inertia.on('start', (e) => {
            isLocal() && console.log('start ==>')
        })
        Inertia.on('finish', (e) => {
            isLocal() && console.log('finish ==>')
        });
        toast.configure(options)
    }, [])

    useEffect(() => {

    })


    // isLocal() && console.log('parentModule', parentModule);

    // useMemo(() => {
    // if(bootStrapped && navigator.onLine) {
    // dispatch(startBootStrapped())
    // }
    // },[]);

    useMemo(() => {
        if (!bootStrapped && navigator.onLine) {
            dispatch(startBootStrapped({settings, currencies}))
        }
        // dispatch(setSettings(settings));
        // dispatch(setCurrencies(currencies));
        if (!isEmpty(auth && auth.role?.privileges)) {
            const filteredModules = map(auth.role.privileges, p => {
                return {
                    name: p.name_en,
                    index: p.index,
                    main_menu: p.main_menu,
                    image: p.image
                }
            });
            dispatch(setModules(filteredModules));
        }
    }, [])

    return (
        <AppContext.Provider value={context}>
            {navigator.onLine ? children : <LoadingView/>}
            <ToastContainer
                rtl={locale.isRTL}
                closeButton={() => <GrClose color={'white'}/>}
                className={locale.isRTL ? 'font-bein font-extrabold w-full ' : 'font-tajwal-medium font-extrabold w-full'}
                bodyClassName={locale.isRTL ? 'font-bein font-extrabold w-full ' : 'font-tajwal-medium font-extrabold w-full text-left'}
                closeOnClick={true}
                pauseOnHover={true}
                type={toast.TYPE[capitalize(toastMessage.type)]}
                position={toast.POSITION[locale.isRTL ? 'TOP_LEFT' : 'TOP_RIGHT']}
            />
            {confirmationModal.display && <ConfirmationModal/>}
        </AppContext.Provider>
    );
};

export {AppContext, AppContextProvider};
