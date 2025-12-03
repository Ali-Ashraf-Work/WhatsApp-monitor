import React, { useRef, memo } from "react";
import type { Message } from "../types/chatTypes";
import { BiCheck, BiCheckDouble, BiDownload, BiPause, BiPlay, BiMap } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { formatTime, handleAudioToggle } from "../utils/helpers";

const MessageComponent = memo(function MessageComponent({ message }: { message: Message }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isIncoming = message.direction === "INCOMING" || message.fromMe === false;

  const safeParse = (content: string | object) => {
    if (typeof content === 'object') return content;
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse message content:", e);
      return {};
    }
  };

  const renderMediaContent = () => {
    switch (message.type) {
      case "IMAGE":
        return (
          <div className="relative rounded-lg overflow-hidden max-w-sm">
            <img
              src={message.mediaUrl}
              alt="Shared image"
              className="w-full h-auto"
            />
            {message.caption && (
              <p className="mt-2 text-sm">{message.caption}</p>
            )}
          </div>
        );

      case "STICKER":
        return (
          <div className="relative rounded-lg overflow-hidden max-w-sm">
            <img
              src={message.mediaUrl}
              alt="Shared sticker"
              className="w-28 h-auto"
            />
          </div>
        );

      case "GIF":
        return (
          <div className="relative rounded-lg overflow-hidden max-w-sm">
            <img
              src={message.mediaUrl}
              alt="Shared GIF"
              className="w-full h-auto"
            />
            {message.caption && (
              <p className="mt-2 text-sm">{message.caption}</p>
            )}
          </div>
        );

      case "LOCATION": {
        const locationContent = safeParse(message.content);

        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationContent?.latitude || 0},${locationContent?.longitude || 0}`;

        return (
          <div className="bg-gray-100 p-1 rounded-lg overflow-hidden min-w-[200px]">
            {/* Map Preview Placeholder - using a static color or pattern since we don't have a map key */}
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block h-32 bg-brand-primary-50 relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-brand-primary-50/50 group-hover:bg-brand-primary-50/30 transition-colors">
                <BiMap className="w-12 h-12 text-brand-primary-50 opacity-80" />
              </div>
            </a>

            <div className="p-2">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-primary-500 hover:underline text-sm block mb-1">
                View on Google Maps
              </a>
              {locationContent?.description && (
                <p className="text-xs text-gray-600 whitespace-pre-wrap">{locationContent.description}</p>
              )}
            </div>
          </div>
        );
      }

      case "VCARD": {
        const contactContent = safeParse(message?.content || "");

        return (
          <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-3 min-w-[200px]">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold overflow-hidden">
              {contactContent?.photoBase64 ? (
                <img src={`data:image/jpeg;base64,${contactContent.photoBase64}`} alt={contactContent?.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg">{contactContent?.name?.[0]?.toUpperCase() || "?"}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate text-sm">{contactContent?.name || "Unknown Contact"}</p>
              <p className="text-xs text-gray-500 truncate">{contactContent?.phone || "No phone number"}</p>
            </div>
          </div>
        );
      }

      case "VIDEO":
        return (
          <div className="relative rounded-lg overflow-hidden max-w-sm">
            <video
              ref={videoRef}
              controls
              className="w-full h-auto"
              src={message.mediaUrl || ""}
            >
              Your browser does not support the video tag.
            </video>
            {message.caption && (
              <p className="mt-2 text-sm">{message.caption}</p>
            )}
          </div>
        );

      case "AUDIO":
        return (
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isIncoming ? "bg-gray-100" : "bg-blue-50"
              }`}
          >
            <button
              onClick={() =>
                handleAudioToggle(audioRef, isPlaying, setIsPlaying)
              }
              className={`p-2 rounded-full transition-colors ${isIncoming
                ? "bg-gray-200 hover:bg-gray-300"
                : "bg-blue-100 hover:bg-blue-200"
                }`}
            >
              {isPlaying ? (
                <BiPause className="w-5 h-5" />
              ) : (
                <BiPlay className="w-5 h-5" />
              )}
            </button>
            <audio
              ref={audioRef}
              src={message.mediaUrl || ""}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
            <div className="flex-1">
              <div className="h-1 bg-gray-300 rounded-full">
                <div className="h-full bg-blue-500 rounded-full w-0"></div>
              </div>
            </div>
          </div>
        );

      case "DOCUMENT":
        return (
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${isIncoming
              ? "bg-gray-50 border-gray-200"
              : "bg-brand-primary-100 border-blue-100"
              }`}
          >
            <FiFileText className="w-8 h-8 text-gray-600" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {message.fileName || "Document"}
              </p>
              <p className="text-xs text-gray-500">PDF Document</p>
            </div>
            <a
              href={message.mediaUrl || "#"}
              download={message.fileName || "document.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <BiDownload className="w-5 h-5" />
            </a>
          </div>
        );

      case "TEXT":
      default:
        return <p className="text-sm whitespace-pre-wrap break-all">{message.content}</p>;
    }
  };

  return (
    <div
      className={`flex w-full mb-4 ${isIncoming ? "justify-start" : "justify-end"
        }`}
    >
      <div
        className={`flex flex-col max-w-[75%] overflow-hidden ${isIncoming ? "items-start" : "items-end"
          }`}
      >
        {/* Sender name */}
        <span className="text-xs text-gray-500 mb-1 px-2">
          {message.senderName}
        </span>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm ${isIncoming
            ? "bg-white border border-gray-200 rounded-tl-none"
            : "bg-brand-primary-100 text-black rounded-tr-none"
            }`}
        >
          {renderMediaContent()}
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1 mt-1 px-2">
          <span className="text-xs text-gray-400">
            {formatTime(message.timestamp)}
          </span>
          {!isIncoming && (
            <span className="text-gray-400">
              {message.status === 3 ? (
                <BiCheckDouble className="w-4 h-4 text-blue-500" />
              ) : message.status === 2 ? (
                <BiCheckDouble className="w-4 h-4" />
              ) : message.status === 1 ? (
                <BiCheck className="w-4 h-4" />
              ) : (
                <BiCheck className="w-4 h-4 text-gray-300" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default MessageComponent;
