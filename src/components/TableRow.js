import React from "react";

function Tablerow(props) {
  const { stdDetails, marksDetails } = props.listVal;
  const { fullName } = stdDetails;
  const { tamil, english, maths, science, social, total, rank, status } =
    marksDetails;

  return (
    <tr>
      <td>{props.slNo}</td>
      <td>{fullName}</td>
      <td>{tamil}</td>
      <td>{english}</td>
      <td>{maths}</td>
      <td>{science}</td>
      <td>{social}</td>
      <td>{total}</td>
      <td>{rank}</td>
      <td>
        <h6 className={status === "PASS" ? "status_pass" : "status_fail"}>
          {status}
        </h6>
      </td>
    </tr>
  );
}

export default Tablerow;
