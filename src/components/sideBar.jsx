import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar"
import { Link, useNavigate } from "react-router-dom"
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { BsReceipt } from "react-icons/bs";
import { MdHowToVote } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { Button } from "flowbite-react"
import { IoPeople } from "react-icons/io5";
import { GiThreeFriends } from "react-icons/gi";
import { SiGooglemeet } from "react-icons/si";
import { GrGallery } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { TbLogout } from "react-icons/tb";
import { logout } from "../store/reducers/userSlice"
const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            active={selected === title}
            style={{
                // color: "#1f2a40",
            }}

            onClick={() => setSelected(title)}
            icon={icon}
            component={<Link to={to} />}
            rootStyles={{
                ['.' + menuClasses.button]: {
                    '&:hover': {
                        backgroundColor: 'greenyellow', // Changes the background color to red on hover
                    },
                },
            }}
        >
            <div className="">
                {title}
            </div>

        </MenuItem>
    );
};





function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(logout());
        navigate('/');
    }
    return (
        <div style={{}} className="text-white">
            <Sidebar
                backgroundColor="#1f2a40"
                collapsed={isCollapsed}
                style={{
                    height: "100%",
                }}

            >
                <Menu

                    menuItemStyles={{
                        button: {
                            '&:hover': {
                                backgroundColor: '#727681',
                            },
                        },
                    }}

                    rootStyles={{
                        [`.${menuClasses.icon}`]: {
                            //   backgroundColor: '#e1e1e1',
                            // color: '#344cff',
                            // '&:hover': {
                            //     color: 'red',
                            // },
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => { setIsCollapsed(!isCollapsed) }}
                        icon={isCollapsed ? <FiMenu /> : undefined}

                    >
                        {
                            !isCollapsed && (
                                <div className="flex justify-between ml-[15px] items-center text-white  ">
                                    {/* <p>{user.userType}</p> */}
                                    <p>Admin</p>
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
                                    src={user.photo}
                                // src='/images/moha.svg'

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
                            title="Home"
                            to="/home"
                            icon={<IoMdHome />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Dashboard"
                            to="/Dashboard"
                            icon={<MdDashboard />}
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
                            title="Members"
                            to="/set"
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
                            title="Events"
                            to="/events"
                            icon={<SiGooglemeet />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Gallery"
                            to="/gallery"
                            icon={<GrGallery />}
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
                            title="Election"
                            to="/election"
                            icon={<MdHowToVote />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* <div className="text-center">LOGOUT</div>
                        <button>log</button> */}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mb-4 flex justify-center">
                        <Button
                            onClick={logOut}
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                            <TbLogout size={20} />
                            {isCollapsed ? null : <span>LOGOUT</span>}
                        </Button>
                    </div>
                </Menu>
            </Sidebar>


        </div>
    )
}

export default SideBar;