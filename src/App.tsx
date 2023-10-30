import Table from "react-bootstrap/Table";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import usersJson from "./users.json";
import timeSheetJson from "./timesheets.json";

function App() {
  const [show, setShow] = useState<boolean>(false);
  const [isId, setIsId] = useState<string>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filtered = timeSheetJson.filter((item) => item.userId === isId);

  filtered.sort((a, b) => {
    const startTimeA = new Date(b.startTime).getTime();
    const startTimeB = new Date(a.startTime).getTime();
    return startTimeA - startTimeB;
  });

  function minutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  return (
    <div className="App">
      <Table striped>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {usersJson.map((item) => (
            <tr key={item.id} onClick={() => setIsId(item.id)}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.position}</td>
              <td>
                <Button variant="primary" onClick={handleShow}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Timesheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Moment format="YYYY-MM-DD HH:mm">{item.startTime}</Moment>
                  </td>
                  <td>
                    <Moment format="YYYY-MM-DD HH:mm">{item.endTime}</Moment>
                  </td>
                  <td>{minutesToHoursAndMinutes(item.minutes)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
