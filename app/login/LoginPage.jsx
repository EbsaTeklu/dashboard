"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Alert } from "antd";
import { hashPassword } from "@app/api/user/auth";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(
    {
      email:"",
      password:""
    }
  );
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const [user, setUser] = useState(null);
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formValues)
    try{
      const res = await signIn("credentials", {
        redirect:false,
        email: formValues.email,
        password: formValues.password
      })
    }
    catch(e){
      console.log(e)
    }
    // const validUsername = "admin";
    // const validPassword = "admin";

    // if (username === validUsername && password === validPassword) {
    //   setLoginError(false);
    //   setUser({ name: "Greatrun Admin" });
    //   // router.push("/mytable");
    // } else {
    //   setLoginError(true);
    //   setUser(null);
    // }
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    let res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    if (res && res?.ok) {
      setSuccessAlert(true);
      setLoading(false);
      await router.push('/sold-items');
      return;
    } else {
      setLoading(false);
      setErrorAlert(true);
      setTimeout(()=>{
        setErrorAlert(false);
      },4000)
    }
    return res;
  }
  return (
    <>
      
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="absolute h-screen">
    {successAlert && <Alert message="Successfully Logged In!" description="Welcome" type="success" showIcon />}
    </div>
      <div className="absolute h-screen">
    {errorAlert && <Alert className="relative top-0" message="Wrong email address or Password!" description="Please check and try again!" type="error" showIcon closable/>}
      </div>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
      <form onSubmit={handleSubmit}>
        {/* email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
          required
          id="email"
          type="email"
          // name="email"
          // value={email}
          // onChange={handleChange}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email address"
          className={`w-full p-2 border ${
            loginError ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
          required
          id="password"
          type="password"
          // name="password"
          // value={password}
          // onChange={handleChange}
          onChange={(e) => {
            // setPassword(hashPassword(e.target.value));
            setPassword(e.target.value);
          }}
          placeholder="Password"
          className={`w-full p-2 border ${
            loginError ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        </div>

        {loginError && (
          <p className="text-red-500 text-xs mb-4">
            Invalid username or password
          </p>
        )}

        <button
          type="submit"
          // onClick={handleSubmit}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800"
        >
          {loading ? ("Loging in..."):("Login")}
        </button>
      </form>

        {user && <p className="mt-4">Welcome, {user.name}!</p>}
        
      </div>
    </div></>
  );
};

export default LoginPage;
