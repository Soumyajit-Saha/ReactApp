import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/searchBar";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles/style.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
