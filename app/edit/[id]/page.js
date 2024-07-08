"use client"
import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "react-query";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchTicket } from "@lib/services/table_data";
import { updateSize } from "@lib/services/table_data";
import { Button, Checkbox, Form, Input, Select, Modal } from 'antd';
import {LogoutOutlined} from "@ant-design/icons";
const Edit = ({params}) =>{
  const router = useRouter();
    const {data, isLoading, isFetching} = useQuery({
        queryKey:["ticket", params.id],
        queryFn:() => fetchTicket(params.id)
    });
    const [showModal, setShowModal] = useState(false);
    let userData;
    const [newData, setNewData] = useState();
    const handleLogout = () => {
      // router.push("/api/auth/federated-sign-out");
      // signOutHandler();
      signOut({ redirect: true }).then(() => {
        router.push("/");})
      };
      // console.log(data?.data)
      let currentValueSize;
      let currentValueStation;
      if (data?.status===200){
        // console.log(data.data[0])
        userData = data?.data[0]
        // setCurrentValue(userData?.size)
        currentValueSize = userData?.size;
        currentValueStation = userData?.station;
      }
      // console.log(userData)
const handleUpdateData = (values) =>{
  setNewData(values);
  }
  const { mutate, isSuccess } = useMutation(
    (data) => updateSize(data, userData?.id),
    {
      onSuccess: () => {
        const message = "success";
        console.log(message);
        alert("Successfully Updated!")
      },
      onError: () => {
        console.log("there was an error");
      },
    }
  );
  const handleOK =(values) =>{
    // console.log("on finish", newData.size)
    let sendData={
        "size":newData?.size,
        "station":newData?.station

    }
    console.log("send Data: ", sendData)
    mutate(sendData);
    setShowModal(false);
    
}
    return(
        <>
        <nav className="bg-green-600 p-4 text-white flex flex-row gap-4">
          <div className="flex flex-row gap-2 flex-auto">
            <Link href={"/sold-items"}><img src="/great/dashboard/icons/back.svg" className="w-8 h-8"/></Link>
            <div className="flex-auto mt-1">Edit Record</div>
            <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="text-white font-bold"
        >
          Logout
        </Button></div>
        </nav>
        <div className="p-4">
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleUpdateData}
        onFinishFailed={()=>console.log("finish failed")}
        autoComplete="off"
        >
    <Form.Item
      label="OwnerName"
      name="ownerName"
      
      disabled={true}
      rules={[{ required: false}]}
    >
      <Input placeholder={userData?.name} value={userData?.ownerName} disabled={true}/>
    </Form.Item>
    <Form.Item
      label="First Name"
      name="firstName"
      
      disabled={true}
      rules={[{ required: false}]}
    >
      <Input placeholder={userData?.firstName} disabled={true}/>
    </Form.Item>
    <Form.Item
      label="Middle Name"
      name="middleName"
      
      disabled={true}
      rules={[{ required: false}]}
    >
      <Input placeholder={userData?.middleName} disabled={true}/>
    </Form.Item>
    <Form.Item
      label="Last Name"
      name="lastName"
      
      disabled={true}
      rules={[{ required: false}]}
    >
      <Input placeholder={userData?.lastName} disabled={true}/>
    </Form.Item>
    <Form.Item
      label="ownerTel"
      name="ownerTel"
      
      disabled={true}
      rules={[{ required: false}]}
    >
      <Input placeholder={userData?.ownerTel} disabled={true}/>
    </Form.Item>
    <Form.Item
      label="Reference Code"
      name="reference"
      disabled={true}
      rules={[{ required: false}]}
    >
      <Input  placeholder={userData?.code} disabled={true}/>
    </Form.Item>
    <Form.Item
      label="Station"
      name="station"
      disabled={true}
      rules={[{ required: false}]}
    >
      {/* <Input  placeholder={userData?.station} disabled={true}/> */}
      <Select placeholder={userData?.station} value={userData?.station}>
        <Option value="Bole – In front of Getu Commercial">Bole – In front of Getu Commercial</Option>
        <Option value="Lideta – In front of Lideta Orthodox Church">Lideta – In front of Lideta Orthodox Church</Option>
        <Option value="Kera - Next to NOC">Kera - Next to NOC</Option>
        <Option value="Adwa Adebabay - Megenagna Next to zefmesh mall">Adwa Adebabay - Megenagna Next to zefmesh mall</Option>
        <Option value="Balcha - Behind Balcha Hospital">Balcha - Behind Balcha Hospital</Option>
        <Option value="Bole Medhanialem - New bright tower Ground floor">Bole Medhanialem - New bright tower Ground floor</Option>
        <Option value="Tana Mercato tana commercial center">Tana Mercato tana commercial center</Option>
        <Option value="Nifassilk - Nifas silk Paint building">Nifassilk - Nifas silk Paint building</Option>
        <Option value="Piassa – In front of Electric Building">Piassa – In front of Electric Building</Option>
        <Option value="Alem cinema">Alem cinema</Option>
      </Select>
    </Form.Item>
    <Form.Item
      name="size"
      label="Size"
      hasFeedback
      rules={[{ required: false, message: `Selected size ${userData?.size}` }]}
    >
      <Select placeholder={userData?.size} value={userData?.sizes}>
        <Option value="small">Small</Option>
        <Option value="medium">Medium</Option>
        <Option value="large">Large</Option>
        <Option value="extra_large">Extra Large</Option>
        <Option value="extra_extra_large">Extra Extra Large</Option>
      </Select>
    </Form.Item>
    


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="btn bg-green-600 text-white" htmlType="submit" onClick={()=>setShowModal(true)}>
        Update Data
      </Button>
    </Form.Item>
  <Modal open={showModal} centered onCancel={()=>setShowModal(false)} onOk={handleOK} footer={null}>
   {newData?.size || newData?.station !== undefined ? (
    <div>
    <span>
    Are you sure you want to update the data from {newData?.station && <span className="font-bold">{currentValueStation}</span>} to {currentValueStation && <span className="font-bold">{newData?.station}</span>}
    {" "} {newData?.size && <span className="font-bold">{userData?.size}</span>} to {newData?.size && <span className="font-bold">{newData?.size}</span>}?
    </span>
    <br></br>
    <div className="flex flex-row gap-2 justify-center">
    <button className="btn bg-red-600 p-2 rounded-md mt-4 text-white" onClick={()=>setShowModal(false)}>
      Cancel
    </button>
    <button className="btn bg-green-600 p-2 rounded-md mt-4 text-white" onClick={handleOK}>
      Yes
    </button>
    </div></div>

   ):(
    <div>No Changes made!</div>
   )}
  </Modal>
  </Form>
        </div>
        </>
    )
}
export default Edit;