import React, { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens.accessToken.toString();

      const response = await fetch(
        "https://zkci3v1k8h.execute-api.us-east-1.amazonaws.com/prod/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("History fetch failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3E8FF] via-[#FFFFFF] to-[#FEF9C3] p-12">
      <div className="max-w-4xl mx-auto">
        
        <button
          onClick={() => navigate("/")}
          className="mb-8 bg-[#0070D2] text-white px-6 py-2 rounded-lg"
        >
          ← Back to Chat
        </button>

        <h1 className="text-3xl font-bold text-[#0070D2] mb-8">
          Your History
        </h1>

        {history.length === 0 && (
          <p className="text-gray-500">No history found.</p>
        )}

        <div className="space-y-6">
          {history.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-lg"
            >
              <p className="font-semibold text-[#0070D2]">Prompt:</p>
              <p className="text-gray-700 mb-4">
                {item.prompt?.S}
              </p>

              <p className="font-semibold text-purple-600">
                Response:
              </p>
              <p className="text-gray-700">
                {item.response?.S}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;