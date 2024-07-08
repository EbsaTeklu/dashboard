"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import {PiTShirtBold} from "react-icons/pi";
import { signOut } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import {RxAvatar} from "react-icons/rx";
import LoadingDots from "./loading-dots";
import Link from "next/link";
import {
    LogoutOutlined,BarChartOutlined,
  } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const pathname = usePathname();
const router = useRouter();
  const sideList = [
    {
    //   icon: <AiOutlineHome className="text-2xl" />,
    item_key: "1",
    icon: <HiOutlinePresentationChartBar className="text-2xl" />,
      title: "All Sold Items",
      link: "/sold-items"
    },
    {
    item_key: "2",
    //   icon: <AiOutlineHome className="text-2xl" />,
    icon:<PiTShirtBold className="text-2xl"/>,
      title: "T-shirt Pickup",
      link: "/tshirt-pickup"
    },
  ];

  const navList = [
    {
    //   icon: <AiOutlineHome className="text-2xl mr-2" />,
    icon: <LogoutOutlined />,
      title: "Logout",
    },
    {
    //   icon: <AiOutlineHome className="text-2xl" />,
    icon:<PiTShirtBold/>,
      title: "",
    },
    {
      icon: <AiOutlineHome className="text-2xl" />,
      title: "",
    },
  ];

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    // router.replace("/api/auth/federated-sign-out");
    // signOutHandler();
      signOut({ redirect: true }).then(() => {
        router.replace("/");})
  };
  const hanldeClick = () =>{
    setIsOpen(false);
  }
  const handleProfile = () =>{
    setProfileLoading(true);
    router.replace("/profile");
    if(pathname === '/profile'){

      setProfileLoading(false);
    }
  }
  useEffect(() => {
    const handleEscKeyPress = (e) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  return (
    <nav className="flex  w-full items-center justify-between px-6 h-16 bg-green-600 text-gray-700 border-b border-gray-200 z-10">
      <div className="flex items-center">
        <button className="mr-2" aria-label="Open Menu" onClick={handleDrawer}>
          <GiHamburgerMenu className="text-3xl text-white" />
        </button>

        {/* <img
          src="/next.svg"
          alt="Logo"
          className="h-auto w-24"
        /> */}
        <div className="text-2xl text-white font-bold">Great Run 2023 Dashboard</div>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex md:justify-between md:bg-transparent">
          {/* {navList.map(({ icon, title }, index) => {
            return ( */}
              <button
                // key={index}
                title="Logout"
                onClick={handleLogout}
                className="flex items-center border-2 border-white bg- white text-white p-3 font-medium mr-2 text-center bg -gray-300 rounded hover:bg-white hover:text-black focus:outline-none focus:bg-white focus:text-black"
                icon={<LogoutOutlined />}
              >
                {/* <span>{icon}</span> */}
                {/* <span>{title}</span> */}
                Logout
              </button>
              {/* <Link href="/profile"> */}
              <button
                // key={index}
                onClick={handleProfile}
                title="Profile"
                // onClick={handleLogout}
                className="flex items-center border-2 border-white bg- white text-white p-3 font-medium mr-2 text-center bg -gray-300 rounded hover:bg-white hover:text-black focus:outline-none focus:bg-white focus:text-black"
                icon={< RxAvatar/>}
              >
                {/* <span>{icon}</span> */}
                {/* <span>{title}</span> */}
                < RxAvatar className="text-2xl"/>
                {profileLoading ? (<LoadingDots color="#000"/>):("Profile")
                }
              </button>
              {/* </Link> */}
            {/* );
          })} */}
        </div>
      </div>

      {isOpen && (
        <div className="z-10 fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
            tabIndex="0"
          ></div>
        </div>
      )}

      <aside
        className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <span className="flex w-full bg-green-600 text-white items-center p-4 border-b">
          {/* <img
            src="/next.svg"
            alt="Logo"
            className="h-auto w-32 mx-auto"
          /> */}
        <div className="text-2xl font-bold">Great Run 2023 Dashboard</div>
        </span>
        {sideList.map(({item_key, icon, title,link }, index) => {
          return (
            <Link href={`${link}`} onClick={hanldeClick} key={item_key}>
            <span
              key={index}
              className="flex items-center p-4 hover:bg-green-600 hover:text-white "
            >
              <span className="mr-2">{icon}</span> <span>{title}</span>
            </span></Link>
          );
        })}
        <div className="fixed bottom-0 w-full">
          <button className="flex items-center p-4 text-white bg-green-600 hover:bg-green-500 w-full" onClick={handleLogout}>
            <span className="mr-2">
              {/* <BsShare className="text-2xl" /> */}
              <LogoutOutlined />
            </span>

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;