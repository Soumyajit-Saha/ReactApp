import { React, useState, useEffect } from "react";
import starwars from "../APIs/starwars";
import Multiselect from "multiselect-react-dropdown";
import _ from "lodash";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
// import "../styles/style.css";

function List(props) {
  const [data, setData] = useState([]);

  const [itemsToBeRemoved, setItemsToBeRemoved] = useState([]);
  const [loading, setLoading] = useState(props.input[3]);
  const [expandable, setExpandable] = useState(new Set());
  const [url, setUrl] = useState("");
  const [resp, setResp] = useState([]);
  // const [filteredData, setFiltreredData] = useState([]);
  console.log("loading", loading);
  console.log("url", url);

  const handlePage = (direction) => {
    if (direction === "next") {
      if (resp.next != null) {
        setUrl(resp.next);
        setLoading(true);
        console.log("url changed", url);
      }
    } else {
      if (resp.previous != null) {
        setUrl(resp.previous);
        setLoading(true);
        console.log("url changed", url);
      }
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    setItemsToBeRemoved((itemsToBeRemoved) => [
      ...itemsToBeRemoved,
      selectedItem.id
    ]);
    // console.log("items to be removed", itemsToBeRemoved);
  };

  const onRemove = (selectedList, removedItem) => {
    setItemsToBeRemoved(
      itemsToBeRemoved.filter((item) => !(item === removedItem.id))
    );
    // && item.name === removedItem.name))
    // console.log("items to be removed", itemsToBeRemoved);
  };

  const expand = (url) => {
    // for (var i = 0; i < filteredData.length; i++) {
    //   if (filteredData[i].url === url) {
    //     filteredData[i].expandable = !filteredData[i].expandable;
    //   }
    // }
    setExpandable((expandable) => {
      expandable = new Set(expandable);
      if (expandable.has(url)) {
        expandable.delete(url);
      } else {
        expandable.add(url);
      }
      return expandable;
    });
    // setFiltreredData([...filteredData, filteredData]);
    console.log("expandable", expandable);
  };

  console.log("Type", props.input[2]);

  useEffect(
    () => {
      if (props.input[2] === "") {
        if (!url.includes("/people")) {
          setUrl("");
        }
        starwars.getPeople(url).then((response) => {
          console.log("response", response);
          console.log("url", url);
          setResp(response);
          setData(response.results);
          setLoading(false);
        });
      } else if (props.input[2] === "people") {
        if (!url.includes("/people")) {
          setUrl("");
        }
        starwars.getPeople(url).then((response) => {
          console.log("response", response);
          console.log("url", url);
          setResp(response);
          setData(response.results);
          setLoading(false);
        });
      } else if (props.input[2] === "planet") {
        if (!url.includes("/planets")) {
          setUrl("");
        }
        starwars.getPlanets(url).then((response) => {
          console.log("response", response);
          console.log("url", url);
          setResp(response);
          setData(response.results);
          setLoading(false);
        });
      } else {
        if (!url.includes("/starships")) {
          setUrl("");
        }
        starwars.getStarships(url).then((response) => {
          console.log("response", response);
          console.log("url", url);
          setResp(response);
          setData(response.results);
          setLoading(false);
        });
      }
      // setFiltreredData(
      //   data
      //     .filter((el) => {
      //       if (props.input[0] === "") {
      //         return el;
      //       } else {
      //         return el.name.toLowerCase().startsWith(props.input[0]);
      //       }
      //     })
      //     .filter((item) => {
      //       for (var i = 0; i < itemsToBeRemoved.length; i++) {
      //         if (item.url === itemsToBeRemoved[i]) {
      //           return false;
      //         }
      //       }
      //       return true;
      //     })
      // //     .map((e) => {
      // //       e.expandable = false;
      // //       return e;
      // //     })
      // );
    },
    [props.input, url] /*, loading, data, itemsToBeRemoved]*/
  );

  let filteredData = data
    .filter((el) => {
      if (props.input[0] === "") {
        return el;
      } else {
        return el.name.toLowerCase().includes(props.input[0]);
      }
    })
    .filter((item) => {
      for (var i = 0; i < itemsToBeRemoved.length; i++) {
        if (item.url === itemsToBeRemoved[i]) {
          return false;
        }
      }
      return true;
    });
  // .map((e) => {
  //   e.expandable = false;
  //   return e;
  // });

  // setPureData(filteredData);

  console.log("filtered data", filteredData);

  const options = _.map(filteredData, (el, index) => ({
    id: filteredData[index].url,
    name: filteredData[index].name
  }));

  console.log("options", options);
  console.log("items to be removed", itemsToBeRemoved);

  if (loading) {
    return (
      <div className="loading">
        <br />
        <ReactLoading
          type="spinningBubbles"
          color="#0096FF"
          height={"20%"}
          width={"20%"}
        />
      </div>
    );
  } else {
    if (props.input[1])
      return (
        <div>
          <br />
          <div className="Multiselect">
            <Multiselect
              options={options}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
              placeholder="Select Items to delete"
            />
          </div>
          <br />
          <div>
            {filteredData
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((item) => (
                <div className="card">
                  <div
                    className="card-body"
                    key={item.url}
                    onClick={() => expand(item.url)}
                  >
                    {item.name}
                    {/* {item.expandable.toString()} */}
                    {expandable.has(item.url) && (
                      <div className="details">
                        <pre>
                          <code>{JSON.stringify(item, null, 2)}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    else
      return (
        <div>
          <br />
          <div className="Multiselect">
            <Multiselect
              options={options}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
              placeholder="Select Items to delete"
            />
          </div>
          <br />
          <div>
            {filteredData.map((item) => (
              <div className="card">
                <div
                  className="card-body"
                  key={item.url}
                  onClick={() => expand(item.url)}
                >
                  {item.name}
                  {/* {item.expandable.toString()} */}
                  {expandable.has(item.url) && (
                    <div className="details">
                      <pre>
                        <code>{JSON.stringify(item, null, 2)}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <br />
          <div>
            <Button
              className="primary-btn"
              variant="primary"
              type="submit"
              onClick={() => handlePage("prev")}
            >
              Prev
            </Button>{" "}
            <Button
              className="primary-btn"
              variant="primary"
              type="submit"
              onClick={() => handlePage("next")}
            >
              Next
            </Button>{" "}
          </div>
          <br />
        </div>
      );
  }
}

export default List;
