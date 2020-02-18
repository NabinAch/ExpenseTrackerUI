import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";
import "./ManualEntry.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Jumbotron from "react-bootstrap/Jumbotron";

//function handleChange() {}

function ManualEntry() {
  let date = new Date();
  let item = { product: "", quantity: "", price: "" };
  const [formStore, setFormStore] = useState({ date: date, items: [item] });
  const [date1, setDate1] = useState(new Date());
  const [itemCount, setItemCount] = useState(0);
  const [modalValue, setModalValue] = useState(false);

  function handleSelect(props) {
    setDate1(props);
  }

  function handleSubmit(props) {
    console.log(props);
  }

  function handleChange(event) {
    setDate1(event);
  }

  function handleStoreChange(event) {
    console.log(event.target);
    formStore[event.target.id] = event.target.value;
    console.log(formStore);
  }

  function handleItemChange(event) {
    console.log(event.target.id);
    console.log(event.target.id.split("-"));
    let splitId = event.target.id.split("-");
    formStore.items[parseInt(splitId[0])][splitId[1]] = event.target.value;
    console.log(formStore.items);
  }

  function addItems() {
    formStore.items[itemCount + 1] = { product: "", quantity: "", price: "" };
    setItemCount(itemCount + 1);
    console.log(JSON.stringify(formStore.items));
  }

  function removeItems() {
    formStore.items.splice(itemCount, 1);
    setItemCount(itemCount - 1);
  }

  function finalSubmit() {
    console.log(JSON.stringify(formStore));
    let i = 0;
    let request = [];
    formStore.items.map(item => {
      let item1 = {};
      console.log(date1);
      let month = date1.getMonth() + 1;
      console.log(month);
      let day = date1.getDate();
      console.log(day);
      let year = date1.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }

      if (month < 10) {
        month = "0" + month;
      }
      item1["date"] = year + "-" + month + "-" + day;
      item1["shopName"] = formStore.store;
      item1["itemName"] = item.product;
      item1["price"] = item.price;
      item1["quantity"] = item.quantity;

      request[i] = item1;
      i++;
    });
    console.log(JSON.stringify(request));

    request.map(item3 => {
      console.log(item3);
      axios.post("http://localhost:8080/receipt", item3).then(
        res => {
          console.log(res);
          console.log(res.data);
          setFormStore({ store: "", items: [{ product: "", quantity: "", price: "" }] });
          document.receiptForm.reset();
          setModalValue(true);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  function hideModal() {
    setModalValue(false);
  }

  return (
    <Jumbotron>
      <Form name="receiptForm">
        <Form.Row>
          <Form.Group as={Col} controlId="date">
            <Form.Label>Date</Form.Label>
            <DatePicker className="date-picker" selected={date1} onChange={handleChange} onSelect={handleSelect} />
          </Form.Group>

          <Form.Group as={Col} controlId="store">
            <Form.Label>Grocery Store</Form.Label>
            <Form.Control type="text" placeholder="" onChange={handleStoreChange} />
          </Form.Group>
        </Form.Row>
        <div className="items-label"> Items: </div>
        {formStore.items.map((object, key) => (
          <Form.Row>
            <Form.Group as={Col} controlId={key + "-product"}>
              <Form.Label>Product</Form.Label>
              <Form.Control placeholder="" onChange={handleItemChange} />
            </Form.Group>

            <Form.Group as={Col} controlId={key + "-quantity"}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control placeholder="" onChange={handleItemChange} />
            </Form.Group>

            <Form.Group as={Col} controlId={key + "-price"}>
              <Form.Label>Price</Form.Label>
              <Form.Control placeholder="" onChange={handleItemChange} />
            </Form.Group>
          </Form.Row>
        ))}
        <div className="button-group">
          <Button className="submit-button" variant="success" onClick={finalSubmit}>
            Submit
          </Button>
          <Button className="other-button" variant="outline-primary" onClick={addItems}>
            Add New item
          </Button>
          <Button className="other-button" variant="outline-primary" onClick={removeItems}>
            Remove Last item
          </Button>
        </div>

        <Modal show={modalValue} onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Reciept has successfully submitted.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </Jumbotron>
  );
}

export default ManualEntry;
