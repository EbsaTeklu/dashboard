"use client";
import Image from "next/image";
import { fetchData } from "@lib/services/table_data";
import { Button } from "antd";
import Navbar from "@components/SideNavBar";
import {
  LogoutOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";
import MyTable from "@components/MyTable";
import { hashPassword } from "./api/user/auth";
export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });
  const handleLogout = () => {
    // router.push("/api/auth/federated-sign-out");
    // signOutHandler();
      signOut({ redirect: false }).then(() => {
        router.push("/");})
  };
  // console.log("dataaa", data);
  if (isLoading) {
    return <div className="flex justify-center h-screen items-center">
    <div className="loading loading-spinner text-primary"></div>
  </div>;
  }
  // console.log(hashPassword("b"))
  return (
    <>
      <div className="">
        {/* Nav Bar */}
        {/* <nav className="bg-green-600 p-4 text-white flex flex-row gap-4">
          <div className="flex flex-row flex-auto">
            <div className="flex-auto text-2xl">Great Run 2023 Dashboard</div>
            <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="text-white font-bold"
        >
          Logout
        </Button></div>
        </nav> */}
        <Navbar/>
        {/* End-Nav Bar */}
        {/* <MyTable data={data}/> */}
      </div>
    </>
  );
}
