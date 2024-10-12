import SideBar  from "../components/sideBar";
import PropTypes from "prop-types";
import TopBar from "../components/topBar";
import { useState } from "react";



const Layout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);  // Add state to manage collapsed state
    const sidebarWidth = isCollapsed ? 80 : 240;  // Define sidebar width based on collapse state

    return (
        <>
            <div className="flex min-h-screen overflow-hidden">
                {/* Pass isCollapsed and setIsCollapsed to SideBar */}
                <SideBar className="flex-shrink-0" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                
                <main
                    className="flex flex-col w-full"
                    style={{
                        marginLeft: `${sidebarWidth}px`,  // Adjust main content based on sidebar width
                    }}
                >
                    <TopBar className='w-full' />
                    <div className="p-5 flex-1">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
