"use client"
import Navbar from "@components/SideNavBar";
import {Form, Input, Button} from "antd";
import FormItem from "antd/es/form/FormItem";
import { useMutation } from "react-query";
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { changePass } from "@lib/services/table_data";
const Profile = () => {
  const [tkn, setTkn] = useState();
  const { mutate, isSuccess } = useMutation(
    (data) => changePass(data, userID),
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
    let userID;
    const handlePasswordUpdate = (value) =>{
        console.log("Update password!")
        console.log(value)
        if (userID){
          mutate(value);
        }
    }
    // const { data } = useSession();
    // console.log({data})
      // const check  =async () => {
      //   const session = await getSession();
      //   setTkn(session?.token)
      // }
      // check();
      // console.log({tkn})
      const getTokenFromSession = async () => {
        const session = await getSession();
        console.log({session})
        if (session) {
          const token = session.token;
          console.log('Token:', token);
          setTkn(token?.access_token);
          return session;
        }
      };
      useEffect(() => {
        getTokenFromSession();
      }, []);
      console.log(tkn);
      if(tkn){
        const decode = jwtDecode(tkn);
        console.log({decode});
        userID=decode?.sub;
      }
      console.log({userID});
    return(<>
    <Navbar/>
    <div className="p-10">
        <img src="/great/dashboard/icons/avatar.svg" className="h-20 w-20"/>
        <div className="flex flex-col py-8 gap-4">
            <h3>Update Password</h3>
            <Form
                name="update_password"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handlePasswordUpdate}
                // onFinishFailed={()=>console.log("finish failed")}
                autoComplete="off"
                >
                <FormItem
                label="New Password"
                name="password"
                type="password"
                rules={[{ required: true}]}
                >
                <Input placeholder="Insert New Password" value="password" type="password" disabled={false}/>
                </FormItem>
                <FormItem>
                    <button  type="submit" className="rounded bg-green-600 text-white p-2 hover:bg-green-400">Change Password</button>
                </FormItem>
            </Form>
        </div>
    </div>
    </>)
}
export default Profile;