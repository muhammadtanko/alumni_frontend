import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Link } from "react-router-dom"
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { FaCalendar } from "react-icons/fa";


const Item = ({ title, to, icon, selected, setSelected }) => {

    return (
        <MenuItem
            active={selected === title}
            style={{
                color: "#e0e0e0",
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <div className="">
                {title}
            </div>
            <Link to={to} />
        </MenuItem>
    );
};





export const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    return (
        <div style={{

        }} className="">
            <Sidebar
                backgroundColor="#3e4396"
                collapsed={isCollapsed}
            >
                <Menu>
                    <MenuItem
                        onClick={() => { setIsCollapsed(!isCollapsed) }}
                        icon={isCollapsed ? <FiMenu /> : undefined}
                    >
                        {
                            !isCollapsed && (
                                <div className="flex justify-between ml-[15px] items-center text-white  ">
                                    <p>ADMIN</p>
                                    <FiMenu
                                        onClick={() => {
                                            setIsCollapsed(!isCollapsed)
                                        }}
                                    />
                                </div>
                            )
                        }
                    </MenuItem>
                    {
                        !isCollapsed && (
                            <div className="mb-5 flex justify-center items-center">
                                <img
                                    className="w-24 h-24 cursor-pointer rounded-full"
                                    alt="profile-user"
                                    src={`/images/moha.svg`}
                                />
                            </div>
                        )
                    }
                    <Item
                        title="Chapters"
                        to="/chapters"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Payments"
                        to="/payments"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Email"
                        to="/email"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Video Conferencing"
                        to="/calls"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Chapters"
                        to="/chapters"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Payments"
                        to="/payments"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Email"
                        to="/email"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Video Conferencing"
                        to="/calls"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Chapters"
                        to="/chapters"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Payments"
                        to="/payments"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Email"
                        to="/email"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Video Conferencing"
                        to="/calls"
                        icon={<FaCalendar />}
                        selected={selected}
                        setSelected={setSelected}
                    />

                </Menu>
            </Sidebar>


        </div>
    )
}

