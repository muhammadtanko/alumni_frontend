import { useNavigate } from "react-router-dom";

import { Button, Label, TextInput } from "flowbite-react";
import { HiMail, HiEye } from "react-icons/hi";

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register")
  }
  const handleSubmit = () => {
    navigate("/dashboard")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white rounded shadow-2xl p-4 md:p-8 w-full md:w-[35%]">
        <div className="text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Login</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email2" value="Your email" />
            <TextInput id="email2" type="email" icon={HiMail} placeholder="example@gmail.com" shadow />
          </div>
          <div className="mt-4">
            <Label htmlFor="password2" value="Your password" />
            <TextInput id="password2" icon={HiEye} placeholder="Password" type="password" shadow />
          </div>
          <div className="my-4">
            <p className="text-base text-gray-500">
              No account? 
              <span className="underline cursor-pointer" onClick={handleClick}> Register</span>
            </p>
          </div>
          <Button className="bg-bgDArk" type="submit" onClick={handleSubmit}>Login</Button>
        </div>
      </div>
    </div>
  )
}

export default Login;



