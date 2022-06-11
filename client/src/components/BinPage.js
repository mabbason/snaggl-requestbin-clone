import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dbOps from '../services/db';
import parseJSONStr from '../services/parseJSONStr';

const BinPage = () => {
  const [requests, setRequests] = useState([]);
  const { path } = useParams();
  const ulStyle = {
    listStyleType: 'none',
    borderStyle: 'solid',
    marginLeft: '75px',
    marginRight: '75px'
  };

  const liStyle = {
    overflow: 'auto',
    maxHeight: '500px',
    color: 'white'
  };

  const emptyBinStyle = {
    marginLeft: '35px',
    marginRight: '35px',
    color: 'white'
  }

  const cliStyle = {
    borderStyle: 'none',
    borderRadius: '10px',
    color: 'chartreuse',
    backgroundColor: 'gray',
    padding: '10px',
    overflow: 'auto',
    width: '65%'
  }

  useEffect(() => {
    dbOps
      .getRequests(path)
      .then(data => {
        setRequests(data.requests);
      })
      .catch(error => {
        throw new Error ('could not fetch requests')
      })
  }, [path])

  if (requests.length === 0) {
    return (
      <div style={emptyBinStyle}>
        <h2>Bin URL: {`https://snaggl.corkboard.dev/api/bins/${path}`}</h2>
          <h4>Your bin is empty. Make a request to get started...</h4>
          <h5>cURL</h5>
          <pre style={cliStyle}>
            {`curl -X POST -d "hello world" https://snaggl.corkboard.dev/api/bins/${path}`}
          </pre>
          <h5>PowerShell</h5>
          <pre style={cliStyle}>
          {`powershell -NoLogo -Command "(New-Object System.Net.WebClient).DownloadFile('https://snaggl.corkboard.dev/api/bins/${path}', 'C:\\Windows\\Temp\\fot5ok5r.txt')"`}
          </pre>
      </div>
    )
  }

  return (
    <div>
      <div className="bin-header-container">
        <h3 className='bin-header'>Request History for Bin: {path}</h3>
      </div>
      <div>
        { requests.map(request => 
            <ul key={request.id} style={ulStyle}>
              <li style={liStyle}>
                <p><strong>HTTP:</strong> {request.http_method}</p>
                <div>
                  <p><strong>Headers:</strong></p>
                  <ul>
                    <li>host: {JSON.parse(JSON.stringify(request.headers))["host"]}</li>
                    <li>accept: {JSON.parse(JSON.stringify(request.headers))["accept"]}</li>
                    <li>connection: {JSON.parse(JSON.stringify(request.headers))["connection"]}</li>
                    <li>user-agent: {JSON.parse(JSON.stringify(request.headers))["user-agent"]}</li>
                    <li>content-type: {JSON.parse(JSON.stringify(request.headers))["content-type"]}</li>
                  </ul>
                </div>
                <div>
                  <p><strong>Body:</strong></p>
                  <div><pre>{JSON.stringify(parseJSONStr(request.payload), null, 5)}</pre></div>
                </div>
              </li>
            </ul>
          )
        }
      </div>
    </div>
  )
};

export default BinPage;