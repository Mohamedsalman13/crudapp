import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Model from "./model popup";
import createUtilityClassName from "react-bootstrap/esm/createUtilityClasses";

export default function Crud() {

  const [apiData, setApiData] = useState([]);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(true);

  const deleteApiCall = (data) => {
    // console.log(data.id);
    fetch( `https://659ce747633f9aee790822da.mockapi.io/userData/${data.id}`, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(task => {
      // Do something with deleted task
      console.log("Delete Successfull....")
      setValue(!value);
    }).catch(error => {
      // handle error
    })
  }

  const [userData, setUserData] = useState({
    id: null,
    name: null,
    emailId: null,
    phoneNo: null,
    location: null,
    qualification: null
  });

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    if (data) {
      setShow(true);
      setUserData({
        id: data.id,
        name: data.name,
        emailId: data.emailId,
        phoneNo: data.phoneNo,
        location: data.location,
        qualification: data.qualification
      })
    }
    else {
      setShow(true);
      setUserData({
        id: null,
        name: null,
        emailId: null,
        phoneNo: null,
        location: null,
        qualification: null
      })
    }
  };

  useEffect(() => {
    fetch("https://659ce747633f9aee790822da.mockapi.io/userData", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((data) => {
        // console.log(data);
        setApiData(data);

      })
      .catch((error) => {
        // handle error
        console.log(error)
      });
  }, [value]);

  console.log(apiData);

  return (
    <div>
      <h1> Crud Application </h1>

      <Button variant="primary" onClick={() => handleShow()} className="addbtn"> Add </Button><br /><br />

      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th className="fs-3 p-3">S.No</th>
            <th className="fs-3 p-3">Name</th>
            <th className="fs-3 p-3">Email</th>
            <th className="fs-3 p-3">Phone-No</th>
            <th className="fs-3 p-3">Qualification</th>
            <th className="fs-3 p-3">Location</th>
            <th className="fs-3 p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((item, i) => {
            return (
              <tr>
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.emailId}</td>
                <td className="p-3">{item.phoneNo}</td>
                <td className="p-3">{item.qualification}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3">
                  <Button variant="success" onClick={() => handleShow(item)}>Edit</Button>{" "}
                  <Button variant="danger" onClick={() => deleteApiCall(item)}>Delete</Button>{" "}
                </td>
              </tr>
            )
          })}


        </tbody>
      </Table>
      <Model showPopup={show} closeFunctn={handleClose} popData={userData} updateData={setUserData} setValue={setValue} value={value} />
    </div>
  );
}