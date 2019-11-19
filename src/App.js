import React, { useState, useEffect } from "react";

import axios from "axios";

const sha256 = require("js-sha256").sha256;

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    (async function send() {
      const ts = Date.now() / 1000;
      const verify = sha256(
        `10001|${ts}|${process.env.REACT_APP_PRIVATE_KEY}|`
      );

      const data = {
        clientID: 10001,
        ts,
        type: "json",
        verify
      };

      try {
        let response = await axios.post("/api", data);
        setResponse(response);
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  return (
    <div>
      {response && (
        <p>
          Response: {response.data.response}, Status: {response.status}
        </p>
      )}
    </div>
  );
}

export default App;
