import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loader from "../assets/loader3.gif";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute, setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const api = "https://api.dicebear.com/9.x/bottts/svg?seed=";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }
  },[])

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("please select an avatar");
    }
    else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"))
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{image:avatars[selectedAvatar]});

      if(data.isSet){
        user.isAvatarImageSet = true
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigate("/")
      }
      else{
        toast.error("Error setting avatar. Please try again", toastOptions)
      }
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 10; i++) {
        try {
          const image = await axios.get(
            `${api} ${Math.round(Math.random() * 100)}`
          );

          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }

      setAvatars(data);
      setIsLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      {
      isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Select Avatar For Profile Picture</h1>
          </div>

          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            set as profile picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

// -----------------------------------------------------------------

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #000000d9;
  height: 100vh;
  width: 100vw;
  padding: 1rem;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      text-align: center; 
      font-size: 1.5rem; 
    }
  }
  .avatars {
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #07bc0c;
    }
  }
  .submit-btn {
    background-color: #07bc0c;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  @media (max-width: 768px) {
    .title-container {
      h1 {
        font-size: 1.2rem; /* Smaller font size on small screens */
      }
    }
  
    .avatars {
      gap: 1rem; /* Smaller gap between avatars */
      
      .avatar {
        img {
          height: 4rem; /* Smaller avatar size */
        }
      }
    }
  
    .submit-btn {
      padding: 0.8rem 1.5rem; /* Smaller padding on button */
      font-size: 0.9rem; /* Smaller font size on button */
    }
  }
  
`;
