import React, { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  
  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  const goToHome = () => {
    navigateTo("/");
    setShow(!show);
  };
  const goToDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const goToMessagePage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const goToAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const goToAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };


  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={goToHome} />
          <FaUserDoctor onClick={goToDoctorsPage} />
          <MdAddModerator onClick={goToAddNewAdmin} />
          <IoPersonAddSharp onClick={goToAddNewDoctor} />
          <AiFillMessage onClick={goToMessagePage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className="wrapper"
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
