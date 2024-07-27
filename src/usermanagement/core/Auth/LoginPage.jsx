import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/Operations/authAPI";
// import { Spinner } from "../../../utils/Spinner";
import signInBg from "../../../assets/MainImages/signin-bg-1.png";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-hot-toast";
import Preloader from "../../../Component/preloader/Preloader";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { username, password } = formData;
  const [backgrounLoading, setBackgrounLoading] = useState(true);
  //   const backgroundImage = "../../../assets/MainImages/signin-bg-1.png";

  useEffect(() => {
    const img = new Image();
    img.src = signInBg;

    const timer = setTimeout(() => {
      img.onload = () => {
        setBackgrounLoading(false);
      };
    }, 1600);

    img.onload = () => {
      clearTimeout(timer);
      setTimeout(() => {
        setBackgrounLoading(false);
      }, 1600);
    };

    return () => {
      clearTimeout(timer);
    };
  }, [signInBg]);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in both username and password.", {
        style: {
          fontFamily: "Poppins, sans-serif",
        },
      });
      return;
    }
    dispatch(login(username, password, navigate));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* {loading ? (
        <Spinner />
      ) : ( */}
      <div
        className="flex items-center justify-center h-screen"
        style={{
          backgroundImage: backgrounLoading ? "none" : `url(${signInBg})`,
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        {backgrounLoading ? (
          <Preloader />
        ) : (
          <div
            className="bg-black bg-opacity-70 px-14 rounded-2xl text-white w-auto h-[22rem] flex flex-col justify-center items-center"
            style={{ width: "26rem" }}
          >
            <img
              src="icons/signinpage logo.png"
              alt=" "
              className="absolute top-20 left-0 right-0 mx-auto w-50 h-24 object-cover rounded-t-md"
            />
            <h6 className="text-1xl font-normal mb-6 font-poppins text-xl">
              Rasta.
              <strong className="text-orange-500">Ai</strong> Enterprise
              Platform
            </h6>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  style={{ color: "black", width: "240px" }}
                  type="text"
                  name="username"
                  placeholder="User ID"
                  value={username}
                  onChange={handleOnChange}
                  className="w-full py-2 px-4 rounded bg-white bg-opacity-80 focus:outline-none font-poppins"
                />
              </div>
              <div className="mb-4 relative">
                <input
                  style={{ color: "black", width: "240px" }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleOnChange}
                  className="w-full py-2 px-4 rounded bg-white bg-opacity-80 focus:outline-none font-poppins"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? (
                    <IoMdEyeOff className="h-6 w-6 text-black" />
                  ) : (
                    <IoMdEye className="h-6 w-6 text-black" />
                  )}
                </div>
              </div>
              <div className="text-center  mt-4  ">
                <button
                  type="submit"
                  className="py-2 px-6 rounded bg-orange-500 text-white cursor-pointer font-poppins hover:bg-white hover:border hover:border-black hover:text-black transition-all 400 ease-in-out mt-4  hover:scale-105"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
};

export default LoginPage;
