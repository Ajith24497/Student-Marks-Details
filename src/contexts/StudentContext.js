import React, { createContext, useReducer, useEffect } from "react";

export const StudentContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "adddetails":
      return [...state, action.payload];
    case "rank":
      const ids = action.payload.map((val) => val.id);
      return [
        ...action.payload,
        ...state.filter((val) => !ids.includes(val.id)),
      ];
    default:
      throw new Error("Error Happened");
  }
}

export function StudentProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    calculateRank();
  }, [state.length]);

  function calculateRank() {
    const tempArr = JSON.parse(JSON.stringify(state)); //Created deep clone of state array
    const passArr = JSON.parse(JSON.stringify(tempArr.filter(isPass))); //Deep Filtered pass list of tempArr
    const passArrIds = passArr.map((d) => d.id); //got the ids of pass list

    passArr.sort((a, b) => b.marksDetails.total - a.marksDetails.total); //Sorting based on total
    passArr.forEach((val, i) => (val.marksDetails.rank = i + 1)); //Assigning Rank

    //Assigning Status
    tempArr.forEach((val) => {
      val.marksDetails.status = passArrIds.includes(val.id) ? "PASS" : "FAIL";
    });

    //Assigning Rank considering status
    tempArr.forEach((val) => {
      if (val.marksDetails.status === "PASS") {
        passArr.forEach((value) => {
          if (val.id === value.id)
            val.marksDetails.rank = value.marksDetails.rank;
        });
      } else {
        val.marksDetails.rank = "-";
      }
    });

    function isPass(val) {
      if (
        val.marksDetails.tamil < 50 ||
        val.marksDetails.english < 50 ||
        val.marksDetails.maths < 50 ||
        val.marksDetails.science < 50 ||
        val.marksDetails.social < 50
      ) {
        return false;
      } else {
        return true;
      }
    }

    //Sorting the array based on total and status
    tempArr.sort((a, b) => {
      return (
        b.marksDetails.status.localeCompare(a.marksDetails.status) ||
        b.marksDetails.total - a.marksDetails.total
      );
    });

    dispatch({ type: "rank", payload: tempArr }); //Updating in state
  }

  function addDetailsOnSubmit(stateValue) {
    dispatch({ type: "adddetails", payload: stateValue });
  }

  return (
    <StudentContext.Provider
      value={{ state, addDetailsOnSubmit, calculateRank }}
    >
      {props.children}
    </StudentContext.Provider>
  );
}
