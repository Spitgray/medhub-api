import React, { useState, useEffect } from "react";

import axios from "axios";

const sha256 = require("js-sha256").sha256;

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    (async function send() {
      const ts = Date.now() / 1000;
      const request = '{"programID":19,"startDate":"2016-07-01","endDate":"2016-12-31"}'
      const verify = sha256(`10001|${ts}|gdm00vtvqhw4|${request}`);

      const data = {
        clientID: 10001,
        ts,
        type: "json",
        request,
        verify
      };

      try {
        let response = await axios.post(
          "https://cors-anywhere.herokuapp.com/https://harbor.medhub.com/functions/api/schedules/shiftsSchedule",
          data
        );
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
          Response: {response.data.response}, Status: {response.status};
          {console.log(response.data)}
        </p>
      )}
    </div>
  );
}

export default App;
