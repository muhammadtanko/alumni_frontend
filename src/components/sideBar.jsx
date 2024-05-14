import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Link } from "react-router-dom"
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { BsReceipt } from "react-icons/bs";
import { MdHowToVote } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { GiThreeFriends } from "react-icons/gi";
import { SiGooglemeet } from "react-icons/si";


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
            "& .pro-menu-item.active": {
                color: "#6870fa !important",
            },
        }} className="text-white">
            <Sidebar
                backgroundColor="#1f2a40"
                collapsed={isCollapsed}
                style={{
                    height: "100%",
                }}

            >
                <Menu>
                    {/* <div 
                    style={{
                        position:""
                    }}
                    className=""> */}
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
                        {
                            !isCollapsed && (
                                <div className="mb-5 flex justify-center items-center">
                                    
                                </div>
                            )
                        }
                    {/* </div> */}
                    <div
                        style={{
                        }}
                    >
                        <Item
                            title="Dashboard"
                            to="/chapters"
                            icon={<IoMdHome />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Payments"
                            to="/payments"
                            icon={<BsReceipt />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Email"
                            to="/email"
                            icon={<MdOutlineMarkEmailUnread />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Calendar"
                            to="/chapters"
                            icon={<FaCalendar />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Election"
                            to="/payments"
                            icon={<MdHowToVote />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Class"
                            to="/email"
                            icon={<GiThreeFriends />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Chapters"
                            to="/chapters"
                            icon={<IoPeople />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                         <Item
                            title="Meetings"
                            to="/chapters"
                            icon={<SiGooglemeet />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                       

                    </div>

                </Menu>
            </Sidebar>


        </div>
    )
}

