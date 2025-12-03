import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoSearchOutline, IoHomeOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { useMemo } from "react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  // Generate random floating particles once
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      // eslint-disable-next-line
      x: Math.random() * 100,
      // eslint-disable-next-line
      y: Math.random() * 100,
      // eslint-disable-next-line
      delay: Math.random() * 5,
      // eslint-disable-next-line
      duration: 3 + Math.random() * 2,
    })),
    []
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-green-400/10 via-emerald-500/10 to-teal-400/10"></div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        ></div>
      ))}

      {/* Animated background circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-green-200 rounded-full opacity-10 animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-emerald-300 rounded-full opacity-20 animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* WhatsApp icon with glow effect */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative bg-linear-to-br from-green-500 to-emerald-600 p-8 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-12">
              <FaWhatsapp className="w-16 h-16 text-white" />
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2 shadow-lg animate-bounce">
                <MdErrorOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* 404 Message Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100 transform transition-all duration-300 hover:shadow-green-200/50">
          {/* 404 Number */}
          <div className="text-center mb-6">
            <h1 className="text-8xl md:text-9xl font-bold bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient-x">
              404
            </h1>
          </div>

          {/* Message bubble design */}
          <div className="space-y-4 mb-8">
            {/* Outgoing message (user) */}
            <div className="flex justify-end animate-slide-in-right">
              <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl rounded-tr-sm shadow-lg max-w-xs transform transition-all duration-300 hover:scale-105">
                <p className="text-sm font-medium">Looking for this page...</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs opacity-75">Just now</span>
                  <IoSearchOutline className="w-3 h-3 opacity-75" />
                </div>
              </div>
            </div>

            {/* Incoming message (system) */}
            <div className="flex justify-start animate-slide-in-left">
              <div className="bg-white px-6 py-3 rounded-2xl rounded-tl-sm shadow-lg max-w-md transform transition-all duration-300 hover:scale-105">
                <p className="text-gray-800 font-medium mb-1">Page Not Found</p>
                <p className="text-gray-600 text-sm">
                  Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <span className="text-xs text-gray-400 mt-1 block">Just now</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="group relative px-8 py-4 bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-gray-200 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="group relative px-8 py-4 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <IoHomeOutline className="w-5 h-5" />
                Go Home
              </span>
            </button>
          </div>

          {/* Decorative dots */}
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

        {/* Footer text */}
        <p className="text-center text-gray-500 mt-6 text-sm animate-fade-in">
          Error Code: 404 • Page Not Found
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out 0.3s both;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.8s both;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
