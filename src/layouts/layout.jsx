import { SideBar } from "../components/sideBar";
import PropTypes from "prop-types";

const Layout = ({ children, title }) => {

    return (
        <div className="flex min-h-screen overflow-hidden">
            <SideBar className="" />
            <main className="">
                <div className=" p-5">
                    {children}
                </div>

            </main>
        </div>
    );
};
Layout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};
export default Layout;
