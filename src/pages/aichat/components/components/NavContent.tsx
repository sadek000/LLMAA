import React from "react";
import NavLinksContainer from "./NavLinksContainer";
import NavPrompt from "./NavPrompt";
import NewChat from "./NewChat";

const NavContent = ({
  setCreateChat,
  chatLog,
  setChatLog,
  setShowMenu,
  showMenu,
  setMessages,
  messages,
  id,
  setId,
}: any) => {
  const hashId = window.location.hash.replace("#", "");
  return (
    <>
      <NewChat setCreateChat={setCreateChat} setChatLog={setChatLog} setShowMenu={setShowMenu} />
      <div className="navPromptWrapper">
        {chatLog?.map(
          (chat: any, idx: any) =>
            chat.title && (
              <NavPrompt
                active={hashId === chat.id}
                chatPrompt={chat.title}
                id={chat.id}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                setId={setId}
                key={idx}
              />
            )
        )}
      </div>
      <NavLinksContainer chatLog={chatLog} setChatLog={setMessages} />
    </>
  );
};

export default NavContent;
