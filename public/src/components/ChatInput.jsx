import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");


  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
    console.log(emojiObject);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
    
  };
// ------------------------------------------------------------------
return (
  <Container>
    <div className="button-container">
      <div className="emoji">
        <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>

    <form className="input-container" onSubmit={(e) => sendChat(e)}>
      <input
        type="text"
        placeholder="Message. . ."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button className="submit">
        <IoMdSend />
      </button>
    </form>
  </Container>
);
}

const Container = styled.div`
display: flex;
align-items: center;
background-color: #3b322847;
padding: 1rem 2rem;
position: relative;

@media screen and (min-width: 720px) and (max-width: 1080px) {
  padding: 1rem;
  gap: 1rem;
}

.button-container {
  margin-right: 15px;
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  

  .emoji {
    position: relative;

    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }

    .emoji-picker-container {
      position: absolute;
      bottom: 3.5rem;
      z-index: 1;

      .emoji-picker-react {
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;

          &-thumb {
            background-color: #9a86f3;
          }
        }

        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }

        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }

        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
}

.input-container {
  
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #ffffff34;
  border-radius: 2rem;
  

  input {
    flex-grow: 1;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 2rem;
    font-size: 1.2rem;

    &::selection {
      background-color: #9a86f3;
    }

    &:focus {
      outline: none;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eda743;
    border: none;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    width: 100px;
    height: 50px;

    svg {
      font-size: 1.5rem;
      color: white;
    }
  }
  
   
  }
}
`;