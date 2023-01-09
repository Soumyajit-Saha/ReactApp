import React, { useState } from "react";
import List from "./list";
import { MDBInput } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/style.css";
import logo from "../logo/clubwealth.png";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [sort, setSort] = useState(false);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  let sortData = () => {
    setSort(!sort);
  };

  return (
    <div className="main">
      <br />
      <h2>Club Wealth Search</h2>
      <div className="search search-bar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <div className="search-type">
          <span>Search For: </span>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setLoading(true);
              setType(e.target.value);
            }}
            className="primary-inp"
          >
            <option value="people">People</option>
            <option value="planet">Planets</option>
            <option value="starship">Starships</option>
          </Form.Select>
        </div>
        <MDBInput
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          type="text"
          placeholder="Search by name..."
          className="search-input primary-inp"
        />
        <div className="sort-button">
          <Button
            className="primary-btn"
            variant="primary"
            onClick={sortData}
            type="submit"
          >
            Sort By Name
          </Button>{" "}
        </div>
      </div>
      <List input={[inputText, sort, type, loading]} />
    </div>
  );
}

export default SearchBar;
