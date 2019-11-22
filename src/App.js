import React, { useState } from "react";

import axios from "axios";

import "./App.css";

const sha256 = require("js-sha256").sha256;

function App() {
  const [apiData, setApiData] = useState(null);
  const [dates, setDates] = useState({});

  const setStartDate = e => {
    setDates({ ...dates, start: e.target.value });
  };

  const setEndDate = e => {
    setDates({ ...dates, end: e.target.value });
  };

  async function searchData() {
    const ts = Date.now() / 1000;
    const request = `{"programID":19,"startDate":"${dates.start}","endDate":"${dates.end}"}`;
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
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <div>
          <label>Start Date</label>
          <input type="date" onChange={setStartDate} />
        </div>
        <div>
          <label>End Date</label>
          <input type="date" onChange={setEndDate} />
        </div>
        <button onClick={searchData}>SEARCH</button>
      </div>
      <br />

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
