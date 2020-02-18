import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";
import "./Search.css";
import axios from "axios";
import moment from "moment";
import Alert from "react-bootstrap/Alert";

function Search() {
  let quatityTotal = 0;
  let priceTotal = 0;
  const [product, setProduct] = useState("");
  const [store, setStore] = useState("");
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [response, setResponse] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [customDate, setCustomDate] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  function keywordChanged(event) {
    // console.log(event.target.value);
    setProduct(event.target.value);
  }

  function storeChanged(event) {
    // console.log(event.target.value);
    setStore(event.target.value);
  }

  function toChanged(value) {
    if (moment(value).isBefore(from)) {
      setShowAlert(true);
    } else {
      setTo(value);
      setShowAlert(false);
    }
  }

  function fromChanged(value) {
    setFrom(value);
    setShowAlert(false);
  }

  function dateRangeChange(event) {
    console.log(event.target.value);
    let dateRangeValue = event.target.value;
    setShowAlert(false);
    if (dateRangeValue === "1") {
      setCustomDate(false);
      setFrom(new Date());
      setTo(new Date());
    }
    if (dateRangeValue === "2") {
      setCustomDate(true);
      setFrom(
        new Date(
          moment()
            .subtract(7, "days")
            .format()
        )
      );
      setTo(new Date());
    }
    if (dateRangeValue === "3") {
      setCustomDate(true);
      setFrom(
        new Date(
          moment()
            .subtract(1, "months")
            .format()
        )
      );
      setTo(new Date());
    }
    if (dateRangeValue === "4") {
      setCustomDate(true);
      setFrom(
        new Date(
          moment()
            .subtract(1, "years")
            .format()
        )
      );
      setTo(new Date());
    }

    if (dateRangeValue === "5") {
      setCustomDate(true);
      setFrom("");
      setTo("");
    }
  }

  function handleSearch() {
    console.log(product);
    //http://localhost:8080/receipt/search?item=Banana
    let fromDate = moment(from).format("YYYY-MM-DD");
    let toDate = moment(to).format("YYYY-MM-DD");

    axios
      .get(
        "http://localhost:8080/receipt/search?item=" +
          product +
          "&store=" +
          store +
          "&from=" +
          fromDate +
          "&to=" +
          toDate
      )
      .then(
        res => {
          console.log(res);
          console.log(res.data);
          setResponse(res.data);
          setShowResult(true);
        },
        error => {
          console.log(error);
        }
      );
  }

  return (
    <div>
      <Form>
        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <b>Error!</b> End date cannot be before Begin date.
          </Alert>
        )}
        <Form.Row>
          <Form.Group as={Col} controlId="product">
            <Form.Label>Product</Form.Label>
            <Form.Control type="text" onChange={keywordChanged} />
          </Form.Group>

          <Form.Group as={Col} controlId="store">
            <Form.Label>Store</Form.Label>
            <Form.Control type="text" onChange={storeChanged} />
          </Form.Group>

          <Form.Group as={Col} controlId="dateRange">
            <Form.Label>Date Range</Form.Label>
            <Form.Control as="select" onChange={dateRangeChange}>
              <option value="1">Custom</option>
              <option value="2">Last Week</option>
              <option value="3">Last Month</option>
              <option value="4">Last Year</option>
              <option value="5">All Time</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="from">
            <Form.Label>Begin Date</Form.Label>
            <DatePicker className="date-picker" selected={from} onChange={fromChanged} disabled={customDate} />
          </Form.Group>

          <Form.Group as={Col} controlId="to">
            <Form.Label>End Date</Form.Label>
            <DatePicker className="date-picker" selected={to} onChange={toChanged} disabled={customDate} />
          </Form.Group>
        </Form.Row>

        <Button className="search-button" variant="primary" onClick={handleSearch}>
          &#x1F50D;
        </Button>
      </Form>

      {showResult && (
        <div className="result">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Store</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {response.map(item => {
                priceTotal = priceTotal + item.price;
                quatityTotal = quatityTotal + item.quantity;
                let date = item.date.split("-");
                return (
                  <tr>
                    <td>{date[1] + "/" + date[2] + "/" + date[0]}</td>
                    <td>{item.shopName}</td>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="3" className="total">
                  Total
                </td>
                <td>{quatityTotal + " lbs"}</td>
                <td>{"$ " + priceTotal}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Search;
