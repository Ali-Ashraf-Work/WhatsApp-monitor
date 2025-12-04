import { useRef, memo } from "react";
import type { Message } from "../types/chatTypes";
import { BiCheck, BiCheckDouble, BiDownload, BiMap } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { formatTime } from "../utils/helpers";
import VoiceMessagePlayer from "./VoiceMessege";

const MessageComponent = memo(function MessageComponent({ message }: { message: Message }) {
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
              <p className="mt-2 text-sm text-text-primary">{message.caption}</p>
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
              <p className="mt-2 text-sm text-text-primary">{message.caption}</p>
            )}
          </div>
        );

      case "LOCATION": {
        const locationContent = safeParse(message.content);

        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationContent?.latitude || 0},${locationContent?.longitude || 0}`;

        return (
          <div className="bg-dark-elevated p-1 rounded-lg overflow-hidden min-w-[200px] neon-border-cyan">
            {/* Map Preview Placeholder */}
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block h-32 bg-dark-card relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-dark-bg-tertiary/50 group-hover:bg-dark-bg-tertiary/30 transition-colors">
                <BiMap className="w-12 h-12 text-neon-cyan opacity-80" />
              </div>
            </a>

            <div className="p-2">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-neon-cyan hover:underline text-sm block mb-1">
                View on Google Maps
              </a>
              {locationContent?.description && (
                <p className="text-xs text-text-secondary whitespace-pre-wrap">{locationContent.description}</p>
              )}
            </div>
          </div>
        );
      }

      case "VCARD": {
        const contactContent = safeParse(message?.content || "");

        return (
          <div className="bg-dark-elevated p-3 rounded-lg flex items-center gap-3 min-w-[200px] neon-border-cyan">
            <div className="w-10 h-10 bg-dark-card rounded-full flex items-center justify-center text-neon-cyan font-bold overflow-hidden">
              {contactContent?.photoBase64 ? (
                <img src={`data:image/jpeg;base64,${contactContent.photoBase64}`} alt={contactContent?.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg">{contactContent?.name?.[0]?.toUpperCase() || "?"}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-text-primary truncate text-sm">{contactContent?.name || "Unknown Contact"}</p>
              <p className="text-xs text-text-secondary truncate">{contactContent?.phone || "No phone number"}</p>
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
              <p className="mt-2 text-sm text-text-primary">{message.caption}</p>
            )}
          </div>
        );

      case "AUDIO":
        return (
          <div
            className={`flex items-center gap-3 rounded-lg ${isIncoming ? " text-white neon-border-cyan" : "bg-dark-card neon-border-magenta"
              }`}
          >
            <VoiceMessagePlayer audioUrl={message.mediaUrl || ""} />
          </div>
        );

      case "DOCUMENT":
        return (
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${isIncoming
              ? "bg-dark-elevated neon-border-cyan"
              : "bg-dark-card neon-border-magenta"
              }`}
          >
            <FiFileText className="w-8 h-8 text-neon-cyan" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-text-primary">
                {message.fileName || "Document"}
              </p>
              <p className="text-xs text-text-secondary">PDF Document</p>
            </div>
            <a
              href={message.mediaUrl || "#"}
              download={message.fileName || "document.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-dark-bg-tertiary rounded-full transition-colors text-neon-cyan"
            >
              <BiDownload className="w-5 h-5" />
            </a>
          </div>
        );

      case "TEXT":
      default:
        return <div className="px-4 py-2.5 flex items-center gap-3">

          <p className="text-sm whitespace-pre-wrap break-all text-text-primary">{message.content}</p>
        </div>
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
        <span className="text-xs text-text-muted mb-1 px-2">
          {message.senderName}
        </span>

        {/* Message bubble - DISTINCT STYLES */}
        <div
          className={`rounded-2xl border overflow-hidden transition-all duration-300 shadow-elegant ${isIncoming
            ? "bg-linear-to-br from-teal-400/10 to-yellow-600/10 hover:bg-linear-to-br hover:from-teal-500/20 hover:to-yellow-700/20 transition-colors border-accent-teal rounded-tl-none hover:shadow-elegant-teal"
            : "bg-linear-to-r from-red-200/10 to-pink-600/20  duration-300 hover:bg-linear-to-br hover:from-red-500/10 hover:to-pink-700/10 transition-all border-accent-purple rounded-tr-none"
            }`}
        >
          {renderMediaContent()}
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1 mt-1 px-2">
          <span className="text-xs text-text-muted">
            {formatTime(message.timestamp)}
          </span>
          {!isIncoming && (
            <span className="text-text-muted">
              {message.status === 'SEEN' || message.status === 'PLAYED' ? (
                <BiCheckDouble className="w-4 h-4 text-neon-cyan" />
              ) : message.status === 'DELIVERED' ? (
                <BiCheckDouble className="w-4 h-4" />
              ) : message.status === 'SENT' ? (
                <BiCheck className="w-4 h-4" />
              ) : (
                <BiCheck className="w-4 h-4 text-text-muted" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default MessageComponent;
