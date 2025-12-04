import { LuCctv } from "react-icons/lu";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-elegant-animated animate-gradientFlow flex items-center justify-center p-4">
      <div className="bg-elegant-card rounded-2xl border border-elegant-purple shadow-elegant-xl p-6 sm:p-8 w-full max-w-md animate-scaleIn">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-accent-purple to-accent-blue rounded-full mb-4 shadow-elegant-purple">
            <LuCctv className="w-7 h-7 sm:w-8 sm:h-8 text-text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            WhatsApp Monitoring
          </h1>
          <p className="text-text-secondary mt-2 text-sm sm:text-base">(view only)</p>
          <p className="text-text-muted mt-1 text-xs sm:text-sm">please login to continue</p>
        </div>

        {/* Login Form */}
        <div>
          <LoginForm />
        </div>

        {/* Demo Credentials */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-text-secondary">
          <p>Demo Credentials:</p>
          <p className="font-mono mt-1 text-accent-teal">admin@whatsdashboard.com / Admin123</p>
        </div>
      </div>
    </div>
  );
}
