import React, { useState, useEffect } from "react";
import {
  signInWithRedirect,
  fetchAuthSession,
  getCurrentUser,
  signOut,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

function App() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);
  const [error, setError] = useState(null);
  const [latency, setLatency] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState("Spanish");

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signInWithRedirect" || payload.event === "signedIn") {
        checkUser();
      }
    });
    checkUser();
    return () => unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      fetchHistory();
    } catch {
      setUser(null);
      setHistory([]);
    }
  };

  const handleLogin = () => signInWithRedirect();
  const handleLogout = async () => {
    await signOut({ global: true });
    setUser(null);
    setOutput("");
    setHistory([]);
  };
const handleSubmit = async () => {
  if (!prompt.trim()) return;

  setLoading(true);
  setLatency(null);

  try {
    // 🔥 Build finalPrompt based on mode
    

    let finalPrompt = prompt;

      if (mode === "summarize") {
       finalPrompt = `Summarize the following text clearly and concisely:\n\n${prompt}`;
      } else if (mode === "rewrite") {
      finalPrompt = `Rewrite the following text in a more professional and polished tone:\n\n${prompt}`;
      } else if (mode === "translate") {
  finalPrompt = `Translate the following text into ${targetLanguage}:\n\n${prompt}`;
}

    const session = await fetchAuthSession();
    const token = session.tokens.accessToken.toString();
    console.log("Mode:", mode);
    console.log("Final Prompt:", finalPrompt);
    const startTime = performance.now();
    setError(null);
    // ⏳ Create timeout controller
const controller = new AbortController();
const timeout = setTimeout(() => {
  controller.abort();
}, 15000); // 15 seconds timeout

const response = await fetch(
  "https://zkci3v1k8h.execute-api.us-east-1.amazonaws.com/prod/transform",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ prompt: finalPrompt }),
    signal: controller.signal, // 🔥 important
  }
);

// clear timeout after success
clearTimeout(timeout);
    const data = await response.json();
    const endTime = performance.now();
    setLatency(Math.round(endTime - startTime));

    setOutput(data.output);
    setPrompt("");
    setMode(null);
    fetchHistory();

  }catch (err) {
  console.error(err);

  if (err.name === "AbortError") {
    setError("Request timed out. Please check your connection.");
  } else if (!navigator.onLine) {
    setError("You are offline. Please reconnect to the internet.");
  } else {
    setError("Something went wrong. Please try again.");
  }
}

  finally {
  setLoading(false);
}
};

  const fetchHistory = async () => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens.accessToken.toString();
      const response = await fetch(
        "https://zkci3v1k8h.execute-api.us-east-1.amazonaws.com/prod/history",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("History fetch failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F3E8FF] via-[#FFFFFF] to-[#FEF9C3] text-[#0F172A] font-sans">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white/50 backdrop-blur-xl border-r border-gray-300/50 p-6 flex flex-col justify-between hidden md:flex shadow-xl shadow-purple-500/5">
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-10 flex items-center gap-3 bg-gradient-to-r from-[#0056A3] to-[#4F46E5] bg-clip-text text-transparent">
          <div className="w-10 h-6  rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <img
              src={logo}
              alt="MODIFAI Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          MODIFAI
          </h2>
          <nav className="space-y-3">
           <button
  onClick={() => {
    setPrompt("");
    setOutput("");
    setError(null);
    setLatency(null);
    setMode(null);   
  }}
  className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:bg-[#0070D2] hover:text-white transition-all duration-300 text-sm font-bold text-[#1E293B] shadow-sm group"
>
              <span className="text-lg group-hover:scale-110 transition-transform">+</span>
              New Chat
            </button>
            {user && (
              <button
                onClick={() => navigate("/history")}
                className="w-full flex items-center gap-3 p-4 bg-gray-200/50 rounded-2xl hover:bg-gray-200 transition text-sm font-bold text-[#1E293B] shadow-sm border border-gray-300"
              >
                🕘 View History
              </button>
            )}
          </nav>
        </div>
        
        {user && (
          <div className="bg-white/80 p-4 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-black text-[#64748B] uppercase tracking-widest mb-2">Authenticated</p>
            <p className="text-sm font-bold text-[#0F172A] truncate mb-3">{user.username}</p>
            <button 
              onClick={handleLogout}
              className="w-full py-2 text-xs font-black text-red-600 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 border border-red-100"
            >
              Log Out
            </button>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-10 z-10">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-black text-[#475569] uppercase tracking-widest">AI Content Transformation Engine</span>
          </div>
          {!user && (
            <button 
              onClick={handleLogin}
              className="bg-transparent border-2 border-[#0070D2] text-[#0070D2] hover:bg-[#0070D2] hover:text-white px-8 py-2 rounded-full text-sm font-black transition-all hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
          )}
        </header>

        {/* Chat Thread */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 scroll-smooth">
          {!output && !loading && (
            <div className="max-w-2xl mx-auto mt-24 ">
              <h1 className="text-5xl font-black text-[#0074EB] mb-6 tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
                Unlock your <br/>creative potential.
              </h1>
              <p className="text-[#334155] text-xl font-bold max-w-md border-l-4 border-[#0070D2] pl-6">
                Ready to transform your ideas? Start by typing a prompt below.
              </p>
              
    <p className="text-sm text-gray-600 font-medium  max-w-md border-l-4 border-[#0070D2] pl-6">
      Transform content intelligently. Powered by AWS Generative AI.
    </p>

            </div>
          )}

          {(output || loading) && (
            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-500">
              <div className="bg-white border-2 border-gray-100 p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 max-h-[60vh] overflow-y-auto scrollbar-hide">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0070D2]"></div>
                  </div>
                  <h3 className="text-sm font-black text-[#004A8B] uppercase tracking-[0.2em]">Response</h3>
                </div>
                
                {loading ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-5/6 animate-pulse delay-75"></div>
                  </div>
                ) : (
                  <p className="text-[#1E293B] leading-relaxed text-lg font-bold whitespace-pre-line">
                    {output}
                  </p>
                )}
              </div>
            </div>
          )}
          {latency && (
  <div className="mt-2 text-xs text-gray-500">
    Response time: {latency} ms
  </div>
)}
{error && (
  <p className="text-red-500 mt-2 text-sm">{error}</p>
)}
        </div>
        
      

        {/* Input Bar Area */}
        <div className="p-10 bg-transparent">
          <div className="max-w-5xl mx-auto relative group">
<div className="flex gap-3 mb-4 pl-6">
  <button
    onClick={() => setMode("summarize")}
    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
      mode === "summarize"
        ? "bg-[#0070D2] text-white"
        : "bg-gray-200 text-gray-700"
    }`}
  >
   Content Summarization
  </button>

  <button
    onClick={() => setMode("rewrite")}
    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
      mode === "rewrite"
        ? "bg-[#0070D2] text-white"
        : "bg-gray-200 text-gray-700"
    }`}
  >
    Professional Rewrite
  </button>

  <button
    onClick={() => setMode("translate")}
    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
      mode === "translate"
        ? "bg-[#0070D2] text-white"
        : "bg-gray-200 text-gray-700"
    }`}
  >
    Language Localization
  </button>
  {mode === "translate" && (
    <select
      value={targetLanguage}
      onChange={(e) => setTargetLanguage(e.target.value)}
      className="px-4 py-2 rounded-xl text-sm font-bold transition"
    >
      <option value="Spanish">Spanish</option>
      <option value="French">French</option>
      <option value="German">German</option>
      <option value="Hindi">Hindi</option>
      <option value="Japanese">Japanese</option>
      <option value="Kannada">Kannada</option>
      <option value="Telugu">Telugu</option>
      <option value="Tamil">Tamil</option>
      <option value="Urdu">Urdu</option>
      <option value="Tulu">Tulu</option>
    </select>
  )}
  <br />
  <p className="text-xs text-gray-500 mt-2">
  Select a transformation workflow powered by Amazon Bedrock.
</p>
  
</div>

            <div className="absolute -inset-1 bg-gradient-to-r from-[#0070D2] to-[#4F46E5] rounded-[2.2rem] blur opacity-0 group-focus-within:opacity-20 transition duration-500 pointer-events-none"></div>
            
            {/* Outer Container (Slightly Darker Background) */}
            <div className="relative bg-[#E2E8F0] border border-gray-300 rounded-[2rem] shadow-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#0070D2]/40 focus-within:border-transparent transition-all duration-300">
              
              {/* Textarea (Keep Background Light/White for readability) */}
              <textarea
                rows="3"
                placeholder="How can I assist you today?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-6 outline-none resize-none text-[#0F172A] placeholder-[#94A3B8] bg-white/90 text-lg font-bold"
              />
              
              {/* Bottom Control Strip */}
              <div className="flex items-center justify-between p-4 bg-[#CBD5E1]/50 border-t border-gray-300">
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-[#475569] hover:text-[#0070D2] hover:border-[#0070D2] transition-colors shadow-sm">
                    <span className="text-sm font-bold">📎</span>
                  </button>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={loading || !user || !prompt.trim()}
                  className={`px-8 py-3 rounded-xl font-black text-sm transition-all duration-300 shadow-lg ${
                    loading || !user || !prompt.trim()
                      ? "bg-[#94A3B8] text-white cursor-not-allowed shadow-none"
                      : "bg-[#0070D2] hover:bg-[#005bb2] text-white hover:shadow-[#0070D2]/40 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {loading ? (
                <div className="flex items-center gap-2">
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </div>
              ) : (
               "Generate"
                )}
                </button>
              </div>
            </div>
            {!user && (
              <p className="text-center text-[11px] font-black text-[#0056A3] uppercase tracking-widest mt-4 animate-pulse">
                Please Sign In to unlock the AI Engine
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-4 right-6 text-xs text-gray-500 font-medium">
  Powered by Amazon Bedrock + AWS Serverless
</div>

      </main>
    </div>
  );
}

export default App;