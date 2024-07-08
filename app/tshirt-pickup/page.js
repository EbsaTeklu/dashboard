"use client"
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import {BsQrCodeScan, BsPersonCheckFill} from "react-icons/bs";
import Navbar from "@components/SideNavBar";
import { useMutation } from "react-query";
// import { useRouter } from "next/navigation";
import {
    SearchOutlined,
  } from "@ant-design/icons";
import FormItemInput from "antd/es/form/FormItemInput";
import { fetchTicket } from "@lib/services/table_data";
import { updateCollectionStatus } from "@lib/services/table_data";
import { useRouter } from "next/navigation";
// import { HiOutlinePresentationChartBar } from "react-icons/hi";
const TshirtPickup =()=>{
    const [refCode, setRefCode] = useState();
    const [searchLoading, setSearchLoading] = useState(false)
    const [tshirtData, setTshirtData] = useState();
    const [showNoResultModal, setShowNoResultModal] = useState(false);
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
    const [tshirtStatus, setTshirtStatus] = useState();
    const [pickupStatus, setPickupStatus] = useState();
    const [userId, setUserId] = useState();
    const router = useRouter();
    const { mutate, isSuccess } = useMutation(
        (data) => updateCollectionStatus(data, userId),
        {
          onSuccess: () => {
            const message = "success";
            console.log(message);
            alert("Successfully Updated!")
          },
          onError: () => {
            alert("There was an error");
          },
        }
      );
    const onSearch = async (values) => {
        // console.log(values.Reference_Number);
        // setRefCode(values.Reference_Number);
        setSearchLoading(true);
        try{
            const res = await fetchTicket(values?.Reference_Number);
            console.log(res.status)
            if(res.status === 200){
                setSearchLoading(false);
                console.log(res.data.length)
                if(res.data.length >0){
                    setTshirtData(res.data[0]);
                }else if (res.data.length === 0){
                    setShowNoResultModal(true);
                    setTshirtData("");
                    setSearchLoading(false);
                }
            }
        }catch(e){
            console.log(e);
            alert("Something went wrong. Please try again.")
        }
        // logic();
      };
      console.log({tshirtData})
      const handleStatusChange = (value) =>{
          setShowChangeStatusModal(true);
          setPickupStatus(value);
          console.log(value);
          setUserId(tshirtData?.id);
     }
     const mutateStatus = () =>{
        setShowChangeStatusModal(false);
        console.log("mutate status: ", pickupStatus);
        // TODO: ADD THE MUTATION LOGIC HERE
        mutate(pickupStatus);
        // router.replace(``)
        onSearch();
     }
    return(
        <>
        <Navbar/>
        <div className="px-10 py-4">
        <h2 className="text-3xl">
            Tshirt Pickup
        </h2>
        <br/>
        <div className="flex flex-row flex-wrap">
        <div className="flex-2 mr-10">
            {/* <button className="bg-green-600 flex flex-row p-2 gap-2 text-white rounded">
                <BsQrCodeScan className="text-l mt-1"/>
                <span>
                Scan QR
                </span>
            </button>
            <br/> */}
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onSearch}
            // onFinishFailed={onFinishFailed}
            autoComplete="off" 
            >
                <label className="text-xl font-bold">Search by Reference Number</label>
            {/* <div className="flex flex-row gap-2"> */}
            {/* <Form.Item
            label="OwnerName"
            name="ownerName"
            
            disabled={true}
            rules={[{ required: false}]}
            ><Input placeholder="hi" size="large" value="byr" disabled={true}/>
            </Form.Item> */}
            <Form.Item
            name="Reference_Number"
            rules={[{ required: true}]}
            key="ref"
            >
                <Input placeholder="Reference Number"
                size="large"
                className="w-80"
                />
            </Form.Item>
            <Form.Item key="sub">
                <button className="bg-green-600 text-white rounded p-2" type="submit">
                    {searchLoading ? (
                        <>
                        Searching...
                        </>
                    ):(
                        <>
                        Search
                        </>
                    )}
                    
                </button>
            </Form.Item>
            {/* </div> */}
            </Form>
        </div>
        <div className="flex-1">
            {tshirtData ? (
                <>
                <h2 className="text-2xl mb-4">T-shirt Details</h2>
                <div className="grid grid-rows-2 text-xl">
                    <h3>
                        Owner Name: <span className="font-bold">{tshirtData.name}</span>
                    </h3>
                    <h3>
                        First Name: <span className="font-bold">{tshirtData.firstName}</span>
                    </h3>
                    <h3>
                        Middle Name: <span className="font-bold">{tshirtData.lastName}</span>
                    </h3>
                    <h3>Color: <span className="font-bold">{tshirtData.color}</span></h3>
                    <h3>Size: <span className="font-bold">{tshirtData.size}</span></h3>
                    <h3>Pickup Station: <span className="font-bold">{tshirtData.station}</span></h3>
                    <h3>Buyer Phone Number: <span className="font-bold">{tshirtData.ownerTel}</span></h3>
                    <h3>Gender: <span className="font-bold">{tshirtData.gender}</span></h3>
                    <h3>Price Paid: <span className="font-bold">{parseFloat(tshirtData.price)} ETB</span></h3>
                </div>
                <Form
                onFinish={handleStatusChange}
                name="collection_status">
                    <h3 className="text-xl">Status:</h3>
                    <Form.Item
                    name="collection_status"
                    // label="Status"
                    hasFeedback
                    rules={[{ required: true, message: "Fill Status First" }]}
                    className="w-80"
                    >
                    <Select placeholder={tshirtData.collection_status} value={tshirtStatus}>
                        {/* <Option value="not_collected">Not Collected</Option> */}
                        <Option value="collected">Collected</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item>
                        <button type="submit" className="bg-green-600 text-white p-2 rounded">
                            Update Status
                        </button>
                    </Form.Item>
                </Form>
                </>
                
            ) :(
                ""
            )}
        </div>
        <div className="flex-1">
            {tshirtData?.collection_status === "not_collected" ? (
                <div className="flex flex-row bg-red-600 text-white text-4xl p-4 font-bold gap-4 justify-center">
                <h1 className="">T-shirt Not Collected</h1>
                </div>
            ) : (
                ""
            )}
            {tshirtData?.collection_status === "collected" ? (
                <div className="flex flex-row bg-green-600 text-white text-4xl p-4 font-bold gap-4 justify-center">
                <h1 className="">T-shirt Collected</h1><BsPersonCheckFill/>
                </div>
            ) : (
                ""
            )}
            
        </div>
        </div>

        <Modal 
        open={showNoResultModal}
        centered
        footer={null}
        onCancel={()=>{setShowNoResultModal(false)}}
        >
            <div className="flex justify-center items-center text-xl">
                No Result Found!!
            </div>
        </Modal>
        <Modal 
        open={showChangeStatusModal}
        centered
        footer={null}
        onCancel={()=>{setShowChangeStatusModal(false)}}
        >
            <div className="justify-center items-center text-xl">
               Are you sure you want to change T-shirt Status to <span className="font-bold">Collected</span>?
               <div className="flex flex-row gap-2 justify-center">
                <button className="btn bg-red-600 p-2 rounded-md mt-4 text-white" onClick={()=>setShowChangeStatusModal(false)}>
                    Cancel
                </button>
                <button className="btn bg-green-600 p-2 rounded-md mt-4 text-white" onClick={mutateStatus}>
                    Yes
                </button>
                </div>
            </div>
        </Modal>
        </div>
        
        </>
    )
}
export default TshirtPickup;