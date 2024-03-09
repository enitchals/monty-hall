function Scores({stayWin, switchWin, stayLose, switchLose}) {
  return (
    <div className="results box">
      <img className="goatimg" src={GOAT}/>
      <div className="results-table">
        <h3>RESULTS:</h3>
        <tr>
          <th>&nbsp;</th>
          <th>stay</th>
          <th>swap</th>
        </tr>
          <th>win</th>
          <td>{stayWin}</td>
          <td>{switchWin}</td>
        <tr>
          <th>lose</th>
          <td>{stayLose}</td>
          <td>{switchLose}</td>
        </tr>
      </div>
    </div>
  );
};