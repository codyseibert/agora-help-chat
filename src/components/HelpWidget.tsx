import { HelpRequest } from "@prisma/client";
import { RtmChannel } from "agora-rtm-sdk";
import { useRef, useState } from "react";
import { useRTM } from "../hooks/useRTM";
import { trpc } from "../utils/trpc";
import { ChatPannel } from "./ChatPanel";

export type TMessage = {
  message: string;
  id: string;
  sender: string;
};

export const HelpWidget = () => {
  const createHelpRequestMutation =
    trpc.helpRequest.createHelpRequest.useMutation();
  const deleteHelpRequestMutation =
    trpc.helpRequest.deleteHelpRequest.useMutation();

  const [isChatPanelDisplayed, setIsChatPanelDisplayed] = useState(false);
  const [text, setText] = useState("");
  const channelRef = useRef<RtmChannel | null>(null);
  const helpRequestRef = useRef<HelpRequest | null>(null);
  const { messages, connectTo, sendMessage } = useRTM([
    {
      message: "How can I help you?",
      id: "1324b0asd",
      sender: "0",
    },
  ]);

  const handleOpenSupportWidget = async () => {
    setIsChatPanelDisplayed(true);
    const helpRequest = await createHelpRequestMutation.mutateAsync();
    helpRequestRef.current = helpRequest;
    connectTo(helpRequest.id);
  };

  const handleCloseWidget = async () => {
    setIsChatPanelDisplayed(false);
    channelRef.current?.leave();
    channelRef.current = null;
    if (!helpRequestRef.current) return;
    await deleteHelpRequestMutation.mutateAsync({
      id: helpRequestRef.current.id,
    });
    helpRequestRef.current = null;
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(text);
    setText("");
  };

  return isChatPanelDisplayed ? (
    <div
      className="
      fixed bottom-10 right-10
      flex h-96 w-72 flex-col justify-between bg-white p-6"
    >
      <ChatPannel
        text={text}
        setText={setText}
        messages={messages}
        onClose={handleCloseWidget}
        handleSendMessage={handleSendMessage}
      />
    </div>
  ) : (
    <button
      onClick={handleOpenSupportWidget}
      className="
        fixed bottom-10 right-10 cursor-pointer bg-blue-400 p-2 px-4
        text-white hover:bg-blue-500
      "
    >
      Speak to our Support Team
    </button>
  );
};
