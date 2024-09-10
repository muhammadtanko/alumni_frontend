import SideBar  from "../components/sideBar";
import PropTypes from "prop-types";
import TopBar from "../components/topBar";
const Layout = ({ children }) => {

    return (
        <>
            <div className="flex min-h-screen overflow-hidden">
                <SideBar className="flex-shrink-0" />
                <main className="flex flex-col w-full">
                    <TopBar className='w-full' />
                    <div className=" p-5 flex-1">
                        {children}
                    </div>

                </main>
            </div>
        </>

    );
};
Layout.propTypes = {
    children: PropTypes.node.isRequired,
    // title: PropTypes.string.isRequired,
};
export default Layout;
