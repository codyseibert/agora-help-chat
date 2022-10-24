import { TMessage } from "./HelpWidget";

export const ChatPannel = ({
  handleSendMessage,
  text,
  setText,
  onClose,
  messages,
}: {
  handleSendMessage: any;
  messages: TMessage[];
  text: string;
  onClose?: () => void;
  setText: (newText: string) => void;
}) => {
  return (
    <div>
      {onClose && (
        <button
          className="hover:text-red-400d absolute top-2 right-2"
          onClick={onClose}
        >
          X
        </button>
      )}

      <ul className="h-[300px] overflow-auto">
        {messages.map(({ message, id, sender }) => (
          <li
            className={`mb-2 rounded p-1 ${
              sender === "1" ? "bg-gray-50" : "bg-blue-200"
            }`}
            key={id}
          >
            {message}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSendMessage} className="flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-600 p-1 px-2"
        ></input>
        <button
          className="
          cursor-pointer bg-blue-400 p-2 px-4
          text-white hover:bg-blue-500
        "
        >
          Send
        </button>
      </form>
    </div>
  );
};
