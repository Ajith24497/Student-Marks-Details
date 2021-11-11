import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import Tablerow from "../components/TableRow";
import { StudentContext } from "../contexts/StudentContext";
import "../css/viewpage.css";

const Viewpage = () => {
  const { state } = useContext(StudentContext);
  const [stdDetailsList, setStdDetailsList] = useState(state);

  function passList() {
    setStdDetailsList(state.filter((d) => d.marksDetails.status === "PASS"));
  }

  function allList() {
    setStdDetailsList(state.filter((d) => d));
  }

  function failList() {
    setStdDetailsList(state.filter((d) => d.marksDetails.status === "FAIL"));
  }
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="viewpage_main">
              <div className="table_area">
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                  <Container>
                    <Navbar.Collapse id="responsive-navbar-nav">
                      <NavDropdown title="Filter" id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={allList}>
                          All
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={passList}>
                          Pass
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={failList}>
                          Fail
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={2}></th>
                      <th style={{ textAlign: "center" }} colSpan={5}>
                        Marks
                      </th>
                      <th style={{ textAlign: "center" }} colSpan={3}>
                        Ranking
                      </th>
                    </tr>
                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Tamil</th>
                      <th>English</th>
                      <th>Maths</th>
                      <th>Science</th>
                      <th>Social</th>
                      <th>Total</th>
                      <th>Rank</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stdDetailsList.map((val, i) => (
                      <Tablerow key={val.id} listVal={val} slNo={i + 1} />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Viewpage;
