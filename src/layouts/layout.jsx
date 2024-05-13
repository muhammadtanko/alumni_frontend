import { SideBar } from "../components/sideBar";
import PropTypes from "prop-types";

const Layout = ({ children, title }) => {

    return (
        <div className="flex min-h-screen overflow-hidden">
            <SideBar />
            <main className="h-screen w-full overflow-y-auto">
                <div className="sticky top-0 right-0 z-20">
                    <Navbar title={title} />
                </div>
                <div className="w-[97%] min-h-[68vh] mx-auto my-5 p-5">
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
