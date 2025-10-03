import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";

import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAtoken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    try {
      if (state === "Admin") {
        const response = await axios.post(
          `${backendUrl}/api/admin/login`,
          payload
        );
        if (response.data.success) {
          setAtoken(response.data.token);
          console.log(response.data);
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Doctor login logic would go here
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center "
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#5F6FFF]">{state}</span> Login
        </p>
        {/* Email and Password Inputs remain the same */}
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>
        {/* Toggle links remain the same */}
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
