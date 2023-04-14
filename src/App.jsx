import React, { useState } from 'react';
import './App.css';
import useGeoLocation from './useGeolocation';

function App() {
  const [count, setCount] = React.useState(0);
  const location = useGeoLocation();
  const [locate, setLocate] = useState([]);
  const [placeh, setPlaceh] = useState('unknown location');
  const { latitude, longitude, error } = useGeoLocation();
  const apiKey = 'AIzaSyA2Le07ANd2cVOo8C2GY2TmQ0xPPyiZ0yA';
  const url =
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}';
  const [tableData, setTableData] = useState([
    { id: 1, name: 'United States', counter: 0 },
    { id: 2, name: 'India', counter: 0 },
    { id: 3, name: 'Total', counter: 0 },
  ]);

  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const addressComponents = data.results[0].address_components;
        const region = addressComponents.find((component) =>
          component.types.includes('administrative_area_level_1')
        ).long_name;
        console.log(region);
        setPlacehold((placehold) => region);
      })
      .catch((error) => console.error(error));
  }, []);
  React.useEffect(() => {
    const data = localStorage.getItem('value');
    if (data && data != 0) {
      setCount(JSON.parse(data));
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem('value', JSON.stringify(count));
  }, [count]);
  return (
    <div>
      <div className="card">
        <h1>Count is {count}</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          Button Click
        </button>
      </div>
      <div>
        <p>Table/Map comes here</p>
        <h3>{placeh}</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Counter</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.counter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
