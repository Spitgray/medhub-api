import React, { useState, useEffect } from "react";

import axios from "axios";

import "./App.css";

const sha256 = require("js-sha256").sha256;

function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    (async function send() {
      const ts = Date.now() / 1000;
      const request =
        '{"programID":19,"startDate":"2016-07-01","endDate":"2016-12-31"}';
      const verify = sha256(
        `10001|${ts}|${process.env.REACT_APP_PRIVATE_KEY}|${request}`
      );

      const data = {
        clientID: 10001,
        ts,
        type: "json",
        request,
        verify
      };

      try {
        let res = await axios.post("/api", data);
        console.log(res);
        setApiData(res.data);
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  return (
    <div>
      {apiData && (
        <table style={{ width: "70%", textAlign: "center" }}>
          <thead>
            <tr>
              <th>Program</th>
              <th>Shift ID</th>
              <th>User ID</th>
              <th>Date ID</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((item, key) => (
              <tr key={key}>
                <td>19</td>
                <td>{item.shiftID}</td>
                <td>{item.userID}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
