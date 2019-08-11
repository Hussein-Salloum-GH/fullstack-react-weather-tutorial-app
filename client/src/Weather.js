import React from 'react';

import {
    Row,
    Col,
    Table,
    Spinner
} from "reactstrap";

const Weather = (props) => {
    const { data } = props;

    if (!data)
        return <div>
            {/* <Spinner style={{ width: '3rem', height: '3rem' }} />{' '} */}
            <Spinner style={{ width: '6rem', height: '6rem' }} type="grow" color="danger" />
        </div>
    return (
        <Row className="weather">
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <h1>{data.name}</h1>
                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon" />
                <div style={{ marginBottom: 10 }}>
                    <span>{data.weather[0].main}</span> &nbsp;
                    <span>{data.weather[0].description}</span> &nbsp;
                    <span>{Math.floor(data.main.temp)} &deg; F</span> &nbsp;
                    <span> {data.sys.country}</span>
                </div>

                <Table>
                    <tbody>
                        <tr>
                            <td><b>Wind</b></td>
                            <td>{Math.floor(data.wind.speed)} KM/H</td>
                        </tr>
                        <tr>
                            <td><b>Pressure</b></td>
                            <td>{Math.floor(data.main.pressure)} h Pascal</td>
                        </tr>
                        <tr>
                            <td><b>Humidity</b></td>
                            <td>{Math.floor(data.main.humidity)} %</td>
                        </tr>
                        <tr>
                            <td><b>Min Temp</b></td>
                            <td>{Math.floor(data.main.temp_min)} &deg; F</td>
                        </tr>
                        <tr>
                            <td><b>Max Temp</b></td>
                            <td>{Math.floor(data.main.temp_max)} &deg; F</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default Weather;
