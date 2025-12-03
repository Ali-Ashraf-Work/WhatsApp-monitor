import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./core/components/Routes";
import { Toaster } from "react-hot-toast";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Routes />
      </QueryClientProvider>
    </>
  );
}

export default App;
