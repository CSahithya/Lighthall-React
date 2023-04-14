import React, { useState } from 'react';
import './App.css';
import Table from './DisplayTable.jsx';
import useGeoLocation from './useGeolocation';

function App() {
  const [count, setCount] = React.useState(0);
  const location = useGeoLocation();
  const [locate, setLocate] = useState([]);

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
        <Table />
      </div>
    </div>
  );
}
export default App;
