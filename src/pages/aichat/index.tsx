import React from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import ChatBox from "./components/ChatBox";

type Props = {};

const AIChat = (props: Props) => {
  return (
    <PageLayout background="default">
      <ChatBox />
    </PageLayout>
  );
};

export default AIChat;
