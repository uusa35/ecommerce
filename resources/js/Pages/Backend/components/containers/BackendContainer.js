import { useContext, useEffect} from "react";
import SideBar from "../partials/SideBar";
import BackendHeader from "../partials/BackendHeader";
import Footer from "../partials/Footer";
import BreadCrumbs from "../partials/BreadCrumbs";
import SystemMessage from "../partials/SystemMessage";
import {isEmpty, capitalize} from 'lodash';
import ConfirmationModal from "../partials/ConfirmationModal";
import Pagination from "../partials/Pagination";
import NoElements from "../widgets/NoElements";
import PropTypes from 'prop-types';
import TableMobileview from "../widgets/TableMobileview";
import {AppContext} from "../../../context/AppContext";
import LoadingView from "../widgets/LoadingView";
import {useSelector} from "react-redux";

const BackendContainer = ({
                              children, elements = [],
                              mainModule = null,
                              subModule = null,
                              showNoElements = false,
                              showSearch = false,
                              showMobileView = false
                          }) => {
    const {
        parentModule, setParentModule, childModule, setChildModule, isLoading,
    } = useContext(AppContext);
    const { dir } = useSelector(state => state.locale);

    useEffect(() => {
        mainModule ? setParentModule(mainModule) : null;
        subModule ? setChildModule(subModule) : null;
    }, [parentModule, subModule])

    return (
        <div className="h-full flex overflow-hidden text-sm md:text-lg" dir={dir}>
            {/*<Head title={`${cXapitalize(trans(pluralize(parentModule)))} :: ${settings[getLocalized()]}`}>*/}
            {/*    <meta head-key="description" name="description" content={settings[getLocalized('description')]}/>*/}
            {/*    <link rel="icon" type="image/svg+xml" href={getThumb(settings.image)}/>*/}
            {/*</Head>*/}
            <SideBar/>
            <ConfirmationModal/>
            {isLoading && <LoadingView />}

                <main className="flex-1 relative z-0 focus:outline-none max-w-full bg-gray-100">
                    <BackendHeader/>
                    <div className="min-h-screen">
                        <div className="align-middle inline-block min-w-full h-auto">
                            <BreadCrumbs/>
                            <div className="mx-3 space-y-2">
                                <SystemMessage/>
                                {
                                    !isEmpty(elements?.data) && elements.total > 0 && parentModule && <Pagination
                                        type={parentModule}
                                        total={elements.total}
                                        links={elements.links}
                                        showSearch={showSearch}
                                    />
                                }
                                {!isEmpty(elements?.data) && showMobileView &&
                                <TableMobileview elements={elements} tableName={childModule}/>}
                                {/*{isLoading ? <LoadingView/> : children}*/}
                                {children}
                                <NoElements display={showNoElements}/>
                                {
                                    !isEmpty(elements?.data) && elements.total > 0 && parentModule && <Pagination
                                        type={parentModule}
                                        total={elements.total}
                                        links={elements.links}
                                        showSearch={showSearch}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </main>

        </div>
    );
}


export default BackendContainer;

BackendContainer.propTypes = {
    type: PropTypes.string,
    elements: PropTypes.object,
};
