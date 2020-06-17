import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Results = props => {
  const history = useHistory();

  const [results, setResults] = useState([]);
  //const [city, setCity] = useState("");
  //const [country, setCountry] = useState("");
  //const [guests, setGuests] = useState("");

  const getResults = async (city, country, guests) => {
    try {
      let response = await axios.get(
        `http://localhost:9090/properties/search?city=${city}&country=${country}&guest_capacity=${guests}`
      );
      setResults(response.data.results);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");
    const country = params.get("country");
    const guests = params.get("guest_capacity");
    console.log(!city);
    if (!city || !country || !guests) {
      history.replace("/");
    }

    getResults(city, country, guests);
  }, []);

  return (
    <>
      <h1>Holiday Houses</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div id="inam" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container-fluid">
                    <div className="row">
                      {results.map((result, index) => {
                        return (
                          <>
                            <div
                              className="col-sm-12 col-lg-4"
                              key={"index-" + index}
                            >
                              <div className="card" style={{ width: "300px;" }}>
                                <img
                                  className="rounded shadow-lg"
                                  style={{ maxWidth: "100%" }}
                                  src={`http://localhost:9090/images/${result.name}`}
                                  alt=""
                                ></img>
                                <div className="card-body">
                                  <h3 className="card-title">{result.title}</h3>
                                  <div
                                    className="container"
                                    style={{
                                      backgroundColor: "rgb(50, 57, 65)",
                                      color: "white"
                                    }}
                                  >
                                    <h5>{result.price}</h5>
                                  </div>
                                  <p
                                    className="card-text"
                                    style={{ color: "black" }}
                                  >
                                    {result.description}
                                  </p>
                                  <button
                                    type="button"
                                    className="btn btn-warning"
                                  >
                                    View More
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="#inam"
                className="carousel-control-prev"
                data-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </a>
              <a
                href="#inam"
                className="carousel-control-next"
                data-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
