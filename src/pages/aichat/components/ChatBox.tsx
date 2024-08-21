/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import NavContent from "./components/NavContent";
import Avatar from "./components/Avatar";
import Loading from "./components/Loading";
import IntroSection from "./components/IntroSection";
import Error from "./components/Error";
import "./components/style.css";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {};
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ApiService } from "services/api";
import { useHasPermission } from "hooks/useHasPermission";
import _ from "lodash";
import FormDialog from "./Dialogue";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ChatBox = (props: Props) => {
  const [showMenu, setShowMenu] = useState<any>(false);
  const [inputPrompt, setInputPrompt] = useState<any>("");
  const [chatLog, setChatLog] = useState<any>([]);
  const [err, setErr] = useState<any>(false);
  const [responseFromAPI, setResponseFromAPI] = useState<any>(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const chatLogEndRef = useRef(null);
  const hasCreateUserPermission = useHasPermission("LLMAA.AttachmentFile.Create");
  const [chats, setChats] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [id, setId] = useState<any>("");
  const [fetche, setRefetch] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [createChat, setCreateChat] = useState<boolean>(false);

  useEffect(() => {
    if (fetche) {
      ApiService.get(`/api/app/chat/${id}`).then((res) => {
        setMessages((res.data as any).chatMessages);
        setRefetch(false);
      });
    }
  }, [fetche]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (inputPrompt.trim() !== "") {
      const newChatLogEntry = { chatPrompt: inputPrompt, botMessage: "Sending..." };
      setChatLog((prevChatLog: any) => [...prevChatLog, newChatLogEntry]);
      setInputPrompt(""); 
      setLoading(true);

      try {
        const response = await ApiService.post(
          `/api/app/chat/send-message/${id}?message=${inputPrompt}`
        );
        setChatLog((prevChatLog: any) => [
          ...prevChatLog.slice(0, -1),
          { ...newChatLogEntry, botMessage: (response.data as any).message },
        ]);
        setErr(null);
      } catch (error) {
        setErr("Failed to send message");
        setChatLog((prevChatLog: any) => [
          ...prevChatLog.slice(0, -1),
          { ...newChatLogEntry, botMessage: "Error sending message" },
        ]);
      } finally {
        setRefetch(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const hashId = window.location.hash.replace("#", "");
    if (hashId) {
      setId(hashId);
      fetchChatMessages(hashId);
    }
    ApiService.get("/api/app/chat").then((res) => {
      setChats((res.data as any).items);
    });
  }, []);

  const fetchChatMessages = (chatId: any) => {
    ApiService.get(`/api/app/chat/${chatId}`)
      .then((res) => {
        setMessages((res.data as any).chatMessages);
      })
      .catch((error) => {
        console.error("Failed to fetch chat messages:", error);
      });
  };

  useEffect(() => {
    if (id) {
      ApiService.get(`/api/app/chat/${id}`).then((res) => {
        setMessages((res.data as any).chatMessages);
      });
    }
  }, [id]);

  useEffect(() => {
    // Scroll to the bottom of the chat log to show the latest message
    if (chatLogEndRef.current) {
      chatLogEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatLog, messages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      ApiService.post("/api/app/attachment/upload-files", {
        Files: [event.target.files[0]],
      }).then((res) => console.log(res));
      console.log(event.target.files[0]);
    }
  };

  const onCreateChat = (newChat: any) => {
    setChats((prevChats: any) => [...prevChats, newChat]); // Update chat list
    setId(newChat.id); // Set new chat as active
    setMessages([]); // Reset messages for new chat
    window.location.hash = newChat.id;
  };

  return (
    <div className="App">
      <header>
        <div className="menu">
          <button onClick={() => setShowMenu(true)}>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#d9d9e3"
              strokeLinecap="round"
            >
              <path d="M21 18H3M21 12H3M21 6H3" />
            </svg>
          </button>
        </div>
        <h1>TalkBot</h1>
      </header>
      {loading && (
        <>
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
      {(chats?.length === 0 || createChat) && (
        <FormDialog setCreateChat={setCreateChat} onCreateChat={onCreateChat} />
      )}
      {showMenu && (
        <nav>
          <div className="navItems">
            <NavContent
              setCreateChat={setCreateChat}
              chatLog={chats}
              setChatLog={setChatLog}
              setShowMenu={setShowMenu}
              showMenu={showMenu}
              setMessages={setMessages}
              messages={messages}
              id={id}
              setId={setId}
            />
          </div>
          <div className="navCloseIcon">
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
              stroke="#fff"
              width={42}
              height={42}
              onClick={() => setShowMenu(false)}
            >
              <path d="m53.691 50.609 13.467-13.467a2 2 0 1 0-2.828-2.828L50.863 47.781 37.398 34.314a2 2 0 1 0-2.828 2.828l13.465 13.467-14.293 14.293a2 2 0 1 0 2.828 2.828l14.293-14.293L65.156 67.73c.391.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 0 0 0-2.828L53.691 50.609z" />
            </svg>
          </div>
        </nav>
      )}

      <aside className="sideMenu">
        <NavContent
          setCreateChat={setCreateChat}
          chatLog={chats}
          setChatLog={setChatLog}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          setMessages={setMessages}
          messages={messages}
          id={id}
          setId={setId}
        />
      </aside>

      <section className="chatBox">
        {messages.length > 0 ? (
          <div className="chatLogWrapper">
            {messages.map((chat: any, idx: any) => (
              <div className="chatLog" key={_.uniqueId()} id={`chat-${chat.chatId}`}>
                {chat.isResponse && (
                  <div className="botMessageMainContainer">
                    <div className="botMessageWrapper">
                      <Avatar bg="#11a27f" className="openaiSVG">
                        {/* Bot avatar */}B
                      </Avatar>
                      {chat.message === "Loading..." ? (
                        <Loading />
                      ) : err ? (
                        <Error err={err} />
                      ) : (
                        <div id="botMessage">{chat.message}</div>
                      )}
                    </div>
                  </div>
                )}
                {!chat.isResponse && (
                  <div className="chatPromptMainContainer">
                    <div className="chatPromptWrapper">
                      <Avatar bg="#5437DB" className="userSVG">
                        {/* User avatar */}U
                      </Avatar>
                      <div id="chatPrompt">{chat.message}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatLogEndRef} /> {/* Invisible element to scroll into view */}
          </div>
        ) : (
          <IntroSection />
        )}

        <form onSubmit={handleSubmit}>
          <div className="inputPromptWrapper">
            {hasCreateUserPermission && (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon color="action" />}
              >
                <span style={{ color: "white" }}>Upload file</span>
                <VisuallyHiddenInput onChange={handleFileChange} type="file" />
              </Button>
            )}
            <input
              name="inputPrompt"
              id=""
              className="inputPrompttTextarea"
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              autoFocus
            ></input>
            <button aria-label="form submit" type="submit">
              <svg
                fill="#ADACBF"
                width={15}
                height={20}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#212023"
                strokeWidth={0}
              >
                <title>{"submit form"}</title>
                <path
                  d="m30.669 1.665-.014-.019a.73.73 0 0 0-.16-.21h-.001c-.013-.011-.032-.005-.046-.015-.02-.016-.028-.041-.05-.055a.713.713 0 0 0-.374-.106l-.05.002h.002a.628.628 0 0 0-.095.024l.005-.001a.76.76 0 0 0-.264.067l.005-.002-27.999 16a.753.753 0 0 0 .053 1.331l.005.002 9.564 4.414v6.904a.75.75 0 0 0 1.164.625l-.003.002 6.259-4.106 9.015 4.161c.092.043.2.068.314.068H28a.75.75 0 0 0 .747-.695v-.002l2-27.999c.001-.014-.008-.025-.008-.039l.001-.032a.739.739 0 0 0-.073-.322l.002.004zm-4.174 3.202-14.716 16.82-8.143-3.758zM12.75 28.611v-4.823l4.315 1.992zm14.58.254-8.32-3.841c-.024-.015-.038-.042-.064-.054l-5.722-2.656 15.87-18.139z"
                  stroke="none"
                />
              </svg>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ChatBox;
