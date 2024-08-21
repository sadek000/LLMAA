import React from "react";

const NewChat = ({ setCreateChat, setChatLog, setShowMenu }: any) => {
  return (
    <div
      className="sideMenuButton"
      onClick={() => {
        setChatLog([]);
        setCreateChat(true);
        setShowMenu(false);
      }}
    >
      <span>+</span>
      New chat
    </div>
  );
};

export default NewChat;
