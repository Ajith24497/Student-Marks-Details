import React, { useContext, useReducer, memo } from "react";
import { v4 as uuid } from "uuid";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { StudentContext } from "../contexts/StudentContext";
import "../css/addpage.css";
import student_icon from "../images/student.png";
import book_icon from "../images/books.png";

const initialState = {
  id: "",
  stdDetails: {
    stdId: "",
    firstName: "",
    lastName: "",
    fullName: "",
  },
  marksDetails: {
    tamil: 0,
    english: 0,
    maths: 0,
    science: 0,
    social: 0,
    total: 0,
    rank: 0,
    status: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "firstname":
      return {
        ...state,
        stdDetails: { ...state.stdDetails, firstName: action.payload },
      };
    case "lastname":
      return {
        ...state,
        stdDetails: { ...state.stdDetails, lastName: action.payload },
      };
    case "studentid":
      return {
        ...state,
        stdDetails: { ...state.stdDetails, stdId: action.payload },
      };
    case "tamil":
      return {
        ...state,
        marksDetails: { ...state.marksDetails, tamil: action.payload },
      };
    case "english":
      return {
        ...state,
        marksDetails: { ...state.marksDetails, english: action.payload },
      };
    case "maths":
      return {
        ...state,
        marksDetails: { ...state.marksDetails, maths: action.payload },
      };
    case "social":
      return {
        ...state,
        marksDetails: { ...state.marksDetails, social: action.payload },
      };
    case "science":
      return {
        ...state,
        marksDetails: { ...state.marksDetails, science: action.payload },
      };
    case "reset":
      return initialState;

    default:
      throw new Error("No Match Type Found");
  }
}

function Addpage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const studentContext = useContext(StudentContext);

  function submitHandler(e) {
    e.preventDefault();
    state.id = uuid(); //creates unique key
    state.stdDetails.fullName = `${state.stdDetails.firstName} ${state.stdDetails.lastName}`; //Combines fName & lName and creates fullName
    state.marksDetails.total =
      Number(state.marksDetails.tamil) +
      Number(state.marksDetails.english) +
      Number(state.marksDetails.maths) +
      Number(state.marksDetails.science) +
      Number(state.marksDetails.social); //Calculate Total from individual subject marks
    studentContext.addDetailsOnSubmit(state);

    dispatch({ type: "reset" });
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="add_main">
              <div className="form_area">
                <Form onSubmit={submitHandler}>
                  <div className="form_head_text">
                    <img
                      alt=""
                      src={student_icon}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    />
                    <h5>Student Detail</h5>
                  </div>
                  <hr
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      borderTop: "2px solid black",
                      marginTop: "-5px",
                    }}
                  />
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="First Name"
                      >
                        <Form.Control
                          required
                          type="text"
                          placeholder="Ajith"
                          autoComplete="off"
                          onChange={(e) =>
                            dispatch({
                              type: "firstname",
                              payload: e.target.value,
                            })
                          }
                          value={state.stdDetails.firstName}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Last Name"
                      >
                        <Form.Control
                          required
                          type="text"
                          placeholder="Siva Kumar"
                          autoComplete="off"
                          onChange={(e) =>
                            dispatch({
                              type: "lastname",
                              payload: e.target.value,
                            })
                          }
                          value={state.stdDetails.lastName}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      className="mb-3"
                      as={Col}
                      controlId="formGridStudentId"
                    >
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Student ID"
                      >
                        <Form.Control
                          required
                          type="text"
                          placeholder="10"
                          autoComplete="off"
                          onChange={(e) =>
                            dispatch({
                              type: "studentid",
                              payload: e.target.value,
                            })
                          }
                          value={state.stdDetails.stdId}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      controlId="formGridLastName"
                    ></Form.Group>
                  </Row>
                  <div className="form_head_text">
                    <img
                      alt=""
                      src={book_icon}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    />
                    <h5>Marks</h5>
                  </div>
                  <hr
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      borderTop: "2px solid black",
                      marginTop: "-5px",
                    }}
                  />
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTamil">
                      <Form.Label>Tamil</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        max={100}
                        placeholder={50}
                        onChange={(e) =>
                          dispatch({
                            type: "tamil",
                            payload: e.target.value,
                          })
                        }
                        value={state.marksDetails.tamil || ""}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEnglish">
                      <Form.Label>English</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        max={100}
                        placeholder={50}
                        onChange={(e) =>
                          dispatch({
                            type: "english",
                            payload: e.target.value,
                          })
                        }
                        value={state.marksDetails.english || ""}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridMaths">
                      <Form.Label>Maths</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        max={100}
                        placeholder={50}
                        onChange={(e) =>
                          dispatch({
                            type: "maths",
                            payload: e.target.value,
                          })
                        }
                        value={state.marksDetails.maths || ""}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridScience">
                      <Form.Label>Science</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        max={100}
                        placeholder={50}
                        onChange={(e) =>
                          dispatch({
                            type: "science",
                            payload: e.target.value,
                          })
                        }
                        value={state.marksDetails.science || ""}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridSocial">
                      <Form.Label>Social</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        max={100}
                        placeholder={50}
                        onChange={(e) =>
                          dispatch({
                            type: "social",
                            payload: e.target.value,
                          })
                        }
                        value={state.marksDetails.social || ""}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId="formGridEnglish"
                    ></Form.Group>
                  </Row>
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default memo(Addpage);
