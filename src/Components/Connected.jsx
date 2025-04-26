
import React from "react";

const Connected = (props) => {
  return (
    <div className="connected-container">
      <h1>ยินดีต้อนรับ</h1>
      <p>กระเป๋าตังค์: {props.account}</p>

      {props.canVote ? (
        <div>
          <input
            type="number"
            placeholder="หมายเลขผู้สมัคร"
            value={props.number}
            onChange={props.handleNumber}
          />
          <button onClick={props.handleVote}>โหวต</button>
        </div>
      ) : (
        <p>คุณได้โหวตแล้ว</p>
      )}

      <table>
        <thead>
          <tr>
            <th>หมายเลข</th>
            <th>ชื่อ</th>
            <th>คะแนน</th>
          </tr>
        </thead>
        <tbody>
          {props.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.index}</td>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Connected;
