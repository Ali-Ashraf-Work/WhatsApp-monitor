import { LuCctv } from "react-icons/lu";
import LoginForm from "../components/LoginForm";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <LuCctv className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            WhatsApp Monitoring (view only)
          </h1>
          <p className="text-gray-600 mt-2">please login to continue</p>
        </div>

        {/* Login Form */}
        <div>
          <LoginForm />
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo Credentials:</p>
          <p className="font-mono mt-1">admin@whatsdashboard.com / Admin123</p>
        </div>
      </div>
    </div>
  );
}
