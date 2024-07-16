import React, { useState } from "react";
import { getLlm } from "./ChatBotApi";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const response = await getLlm(message);
      console.log(response);
      setChatHistory([...chatHistory, { type: "user", text: message }, { type: "bot", text: response }]);
      setMessage("");
    }
  };

  const formatResponse = (response) => {
    const formattedText = response.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      return <p key={index} dangerouslySetInnerHTML={{ __html: line }} />;
    });
    return formattedText;
  };

  return (
    <div>
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-6 col-xl-8">
              <div className="card" id="chat1" style={{ borderRadius: "15px" }}>
                <div
                  className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                  style={{ borderRadius: "15px" }}
                >
                  <i className="fas fa-angle-left"></i>
                  <p className="mb-0 fw-bold">Chat Bot</p>
                  <i className="fas fa-times"></i>
                </div>
                <div className="card-body" style={{ height: "600px", overflowY: "scroll" }}>
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`d-flex flex-row justify-content-${chat.type === "user" ? "end" : "start"} mb-4`}>
                      <div className={`p-3 ${chat.type === "user" ? "me-3" : "ms-3"} border bg-body-tertiary`} style={{ borderRadius: "15px" }}>
                        {chat.type === "bot" ? formatResponse(chat.text) : <p className="small mb-0">{chat.text}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card-footer">
                  <div data-mdb-input-init className="form-outline">
                    <textarea
                      className="form-control bg-body-tertiary"
                      id="textAreaExample"
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <label className="form-label" htmlFor="textAreaExample">Ingrese mensaje</label>
                    <button className="btn btn-primary mt-2" onClick={handleSendMessage} style={{ marginLeft: "30px" }}>Enviar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatBot;