import { RtmChannel, RtmMessage } from "agora-rtm-sdk";
import { useRef, useState } from "react";
import { TMessage } from "../components/HelpWidget";

export const useRTM = (initialMessages?: TMessage[]) => {
  const channelRef = useRef<RtmChannel | null>(null);
  const [messages, setMessages] = useState<TMessage[]>(initialMessages ?? []);

  const connectTo = async (id: string) => {
    if (channelRef.current) {
      channelRef.current.leave();
      channelRef.current = null;
    }
    const { default: AgoraRTM } = await import("agora-rtm-sdk");
    const client = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_ID!);
    await client.login({
      uid: `${Math.floor(Math.random() * 250)}`,
      token: undefined,
    });
    const channel = await client.createChannel(id);
    channelRef.current = channel;
    await channel.join();
    channel.on("ChannelMessage", (message: RtmMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: message.text ?? "",
          id: Math.random() + "",
          sender: "1",
        },
      ]);
    });
  };

  const sendMessage = async (text: string) => {
    const channel = channelRef.current;
    await channel?.sendMessage({ text });
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: text,
        id: Math.random() + "",
        sender: "0",
      },
    ]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return { messages, clearMessages, sendMessage, connectTo };
};
