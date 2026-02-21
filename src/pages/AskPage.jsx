// import { useState } from "react";

// export default function AskPage() {
//   const [messages, setMessages] = useState([
//     {
//       role: "bot",
//       content: "Hello 👋 Ask me anything about herbal and medicinal plants."
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const question = input;

//     setMessages(prev => [...prev, { role: "user", content: question }]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5001/api/ask-herbal", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question })
//       });

//       if (!res.ok) {
//         throw new Error("Server error");
//       }

//       const data = await res.json();

//       setMessages(prev => [
//         ...prev,
//         {
//           role: "bot",
//           content: data.answer || "🤔 I couldn't find a clear answer. Try rephrasing."
//         }
//       ]);
//     } catch (err) {
//       console.error("Frontend error:", err);

//       setMessages(prev => [
//         ...prev,
//         {
//           role: "bot",
//           content: "⚠️ Server not responding. Please try again later."
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex justify-center items-center">
//       <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg flex flex-col h-[80vh]">

//         {/* Header */}
//         <div className="p-4 border-b text-center font-semibold text-green-700">
//           🌿 Herbal AI Assistant
//         </div>

//         {/* Chat Area */}
//         <div className="flex-1 p-4 overflow-y-auto space-y-3">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`max-w-[75%] p-3 rounded-lg text-sm ${
//                 msg.role === "user"
//                   ? "ml-auto bg-green-600 text-white"
//                   : "mr-auto bg-gray-100 text-gray-800"
//               }`}
//             >
//               {msg.content}
//             </div>
//           ))}

//           {loading && (
//             <div className="mr-auto bg-gray-100 text-gray-600 p-2 rounded-md text-sm">
//               🌱 Thinking...
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t flex gap-2">
//           <input
//             type="text"
//             placeholder="Ask about Tulsi, Neem, Ashwagandha..."
//             className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
//             value={input}
//             onChange={e => setInput(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && sendMessage()}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
//           >
//             Ask
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";

export default function AskPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello 👋 Ask me anything about herbal plants."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const sendMessage = async () => {
    if ((!input.trim() && !selectedImage) || loading) return;

    const question = input;

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: question,
        image: selectedImage ? URL.createObjectURL(selectedImage) : null
      }
    ]);

    setInput("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("question", question);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await fetch("http://localhost:5001/api/ask-herbal", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          content: data.answer
        }
      ]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          content: "Server error. Check backend."
        }
      ]);
    }

    setLoading(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg flex flex-col h-[85vh]">

        <div className="p-4 border-b text-center font-semibold text-green-700">
          🌿 Herbal AI Assistant
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className="space-y-2">

              {msg.image && (
                <img
                  src={msg.image}
                  alt="preview"
                  className="max-h-48 rounded-lg ml-auto"
                />
              )}

              <div
                className={`max-w-[75%] p-3 rounded-lg text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "ml-auto bg-green-600 text-white"
                    : "mr-auto bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="mr-auto bg-gray-100 p-2 rounded-md text-sm">
              🌱 Thinking...
            </div>
          )}
        </div>

        <div className="p-4 border-t flex gap-2 items-center">

          <input
            type="text"
            placeholder="Ask about Tulsi, Neem..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-green-600 text-white p-2 rounded-full"
          >
            <FaCamera />
          </button>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={e => setSelectedImage(e.target.files[0])}
            className="hidden"
          />

          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
