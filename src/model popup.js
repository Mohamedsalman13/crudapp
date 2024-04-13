import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Example(props) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const updateApicall = () => {
    if(props.popData.id === null){

    fetch(`https://659ce747633f9aee790822da.mockapi.io/userData`, {
      method: 'POST', // or PATCH
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(props.popData)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(task => {
      props.setValue(!props.value);
      console.log("Successfully Added....")
    }).catch(error => {
      // handle error
    })

    props.closeFunctn();
  }
  
  else{
    fetch(`https://659ce747633f9aee790822da.mockapi.io/userData/${props.popData.id}`, {
      method: 'PUT', // or PATCH
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(props.popData)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(task => {
      props.setValue(!props.value);
      console.log("Updated Successfull....")
    }).catch(error => {
      // handle error
    })

    props.closeFunctn();
  }
}

  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={props.showPopup} onHide={props.closeFunctn}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.popData.name}
                placeholder="Enter your name"
                autoFocus
                onChange={(e) => props.updateData({...props.popData, name : e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                defaultValue={props.popData.emailId}
                placeholder="Enter your email"
                autoFocus
                onChange={(e) => props.updateData({...props.popData, emailId : e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="tel"
                defaultValue={props.popData.phoneNo}
                placeholder="Enter your phone no."
                autoFocus
                onChange={(e) => props.updateData({...props.popData, phoneNo : e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.popData.qualification}
                placeholder="Enter your qualification"
                autoFocus
                onChange={(e) => props.updateData({...props.popData, qualification : e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.popData.location}
                placeholder="Enter your location"
                autoFocus
                onChange={(e) => props.updateData({...props.popData, location : e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeFunctn}>
            Close
          </Button>
          {props.popData.id === null ? 
          <Button variant="primary" onClick={updateApicall}>
            Add Data
          </Button> :
          <Button variant="primary" onClick={updateApicall}>
            Save Changes
          </Button>}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Example;