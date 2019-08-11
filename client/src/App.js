import React from 'react';

//import react strap
import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  FormGroup
} from "reactstrap";

import Weather from './Weather';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      weather: null,
      cityList: [],
      newCityName: ''
    };

  };
  componentDidMount() {
    this.getCityList();
    console.log(this.state);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  //get all cities in database
  getCityList = () => {
    fetch('/api/cities')
      .then(res => res.json())
      .then(res => {
        var cityList = res.map(r => r.city_name);
        this.setState({ cityList });
      });
  };

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        console.log(weather);
        this.setState({ weather });
      });
  }

  handleInputChange = (event) => {
    console.log(this.state);
    this.setState({ newCityName: event.target.value });
  }

  handleChnageCity = (event) => {
    this.getWeather(event.target.value);
  }

  handleAddCity = () => {
    fetch("/api/cities", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ city: this.state.newCityName })
    }).then(res => res.json())
      .then(res => {
        this.getCityList();
        this.setState({ newCityName: '' });
      }).catch(err => { console.log(err) });
  }

  render() {
    return (
      <Container fluid className="centered" >
        <Navbar dark color="dark">
          <NavbarBrand href="/" title="Weather App">HRZS - Weather App</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">WEATHER APP BY HS</h1>
              <p className="lead">The current weather of your favorite countries in our PostgreSQL!</p>
              <InputGroup>

                <Input
                  placeholder="New city name here...."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />

                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                </InputGroupAddon>

              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChnageCity}>
                {this.state.cityList.length === 0 && <option>No cities added yet</option>}
                {this.state.cityList.length > 0 && <option>Select city</option>}
                {this.state.cityList.map((city, index) => <option key={index}>{city}</option>)}
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Weather data={this.state.weather} />
      </Container>
    );
  }

}

export default App;
