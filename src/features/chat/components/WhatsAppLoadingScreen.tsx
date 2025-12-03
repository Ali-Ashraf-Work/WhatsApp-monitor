import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { socket } from "../../../lib/socket";

interface LoadingData {
  whatsappNumberId: string;
  displayName: string;
  percent: number;
  message: string;
}

interface AuthenticatedData {
  whatsappNumberId: string;
  displayName: string;
  status: string;
}
export default function WhatsAppLoadingScreen() {
  const [loadingData, setLoadingData] = useState<LoadingData | null>(null);

  useEffect(() => {
    socket.on("whatsapp:loading", (data: LoadingData) => {
      setLoadingData(data);
    });
    socket.on("whatsapp:ready", () => {
      socket.off("whatsapp:loading");
      setLoadingData(null);
    });

    socket.on("whatsapp:authenticated", (data: AuthenticatedData) => {
      if (data.status === "AUTHENTICATED") setLoadingData(null);
    });

    return () => {
      socket.off("whatsapp:loading");
      socket.off("whatsapp:ready");
      socket.off("whatsapp:authenticated");
    };
  }, []);

  if (!loadingData) return null;

  return (
    <div className="fixed inset-0 z-99999999 flex items-center justify-center bg-linear-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-green-400/10 via-emerald-500/10 to-teal-400/10"></div>

      <div className="relative">
        {/* Animated background circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute w-64 h-64 bg-green-200 rounded-full opacity-20 animate-ping"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute w-48 h-48 bg-emerald-300 rounded-full opacity-30 animate-ping"
            style={{ animationDuration: "2s" }}
          ></div>
        </div>

        {/* Main content */}
        <div className="relative bg-white rounded-3xl shadow-2xl p-12 w-96 backdrop-blur-sm bg-opacity-95">
          {/* Icon with animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-linear-to-br from-green-500 to-emerald-600 p-6 rounded-full shadow-lg transform transition-transform hover:scale-110">
                <FaWhatsapp className="w-12 h-12 text-white" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                  <IoCheckmarkDone className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Display name */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {loadingData.displayName}
          </h2>

          {/* WhatsApp number */}
          <p className="text-sm text-center text-gray-500 mb-6">
            {loadingData.whatsappNumberId}
          </p>

          {/* Loading message */}
          <p className="text-center text-gray-600 mb-6 font-medium min-h-6 transition-all duration-300">
            {loadingData.message}
          </p>

          {/* Progress bar container */}
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-linear-to-r from-green-500 via-emerald-500 to-green-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${loadingData.percent}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
              </div>
            </div>

            {/* Percentage text */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500">Loading...</span>
              <span className="text-sm font-semibold text-green-600">
                {Math.round(loadingData.percent)}%
              </span>
            </div>
          </div>

          {/* Dots animation */}
          <div className="flex justify-center mt-8 space-x-2">
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
