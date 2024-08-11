import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/api-client";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFLE_ROUTE,
  LOGOUT_ROUTE,
} from "@/lib/constants";
import { useState, useRef, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { colors } from "@/lib/utils";


const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);

  const logout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/welcome");
        setUserInfo(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is Required.");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is Required.");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFLE_ROUTE,
          {
            firstName,
            lastName,
            color: selectedColor,
          },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile Updated Successfully.");
          navigate("/profilemain");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        toast.success("Image updated successfully.");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Image Removed Successfully.");
        setImage(undefined);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate(-1);
    } else {
      toast.error("Please setup profile.");
    }
  };

  return (
    <div className="bg-[#000000] h-[100vh] flex items-center justify-center flex-col ">
      <div className=" w-[100%] h-full md:w-max flex flex-col gap-10 pl-[10px] pr-[10px]">

        <div className="flex justify-between items-center h-[30px] ">
        <div className="text-[16px] lg:text-[20px] text-blue-600 text-opacity-90 cursor-pointer" onClick={handleNavigate}>
         Cancel
        </div>
        <div className="bg-transparent">
          <div
            className="text-blue-600 cursor-pointer"
            onClick={saveChanges}
          >
            Save
          </div>
        </div>
        </div>
        <div className=" flex flex-col justify-center items-center w-full">
          <div
            className="h-[100px] w-[100px]  flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-[100px] w-[100px] rounded-full overflow-hidden mb-[20px]">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-[100px] w-[100px]  text-5xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-[#fff]  flex items-center justify-center rounded-full`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
           
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )} 
               
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              accept=".png, .jpg, .jpeg, .svg, .webp"
              name="profile-image"
            />
          </div>
          
          <div className="flex flex-col w-full text-white items-center px-[5px] bg-[#272727d3] rounded-[10px] mt-[10px] mb-[3px] justify-center">
           
            <div className="w-full border-b-[0.5px] border-zinc-700">
              <Input
                placeholder="First Name"
                type="text"
                className=" text-white rounded-none  py-[10px]  bg-transparent border-none"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                className=" text-white  rounded-none py-[10px]  bg-transparent border-none"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            </div>
            <p className="text-zinc-400 text-[14px] mb-[20px] text-start">Enter your name and add an otional profile photo</p>

            <div className="w-[100%] rounded-[10px] gap-0 bg-[#1d1c1cd7]">
            <div className="w-[100%] flex justify-between items-center text-white px-[10px] ">
              <p>Email</p>
              <Input
                placeholder="Email"
                type="email"
                className="bg-transparent text-end w-fit border-none "
                disabled
                value={userInfo.email}
              />
            </div>
            <div className="w-[100%] flex justify-between items-center text-white px-[10px] py-[5px] border-none">
              <p>Change Number</p>
              <Input
              placeholder="+91 8234575860"
                type="text"
                className="bg-transparent text-end text-[#fff] w-fit border-none focus:border-none "
              />
            </div>

            <div className="w-[100%] flex justify-between items-center text-white px-[10px] py-[5px] border-none">
              <p>Username</p>
              <Input
              placeholder="@username"
                type="text"
                className="bg-transparent text-[#fff] text-end w-fit border-none focus:border-none "
              />
            </div>
            </div>
            <p className="text-zinc-400 text-[14px] mb-[20px] text-start">You can set or change your username and number</p>
            
            <div className="w-full justify-center flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-100 ${
                    selectedColor === index
                      ? " outline outline-white outlin4"
                      : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          
        </div>
        <div className="w-full">
          <Button
            className="py-[10px] bg-[#1d1c1cd7] hover:bg-white text-red-700 text-[16px] font-bold w-full"
             onClick={logout} 
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
