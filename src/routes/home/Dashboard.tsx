import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  GridApi,
} from "ag-grid-community";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import Button from 'antd/lib/button/button';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import useRequest from "../../hooks/use-request";
import { ISnapshotsResponse } from '../../interaces/snapshot-response.interface';
import { IStation } from '../../interaces/station.interface';
import { errorToast } from '../../components/Toast';
import DatePicker from '../../components/Datepicket';
import Loader from '../../components/Loader';
import {
  Container,
  GridContainer,
  Filters,
} from './index.styled.components';
import { IPostStationResponse } from '../../interaces/post-station-response.interface';
import { IWeather } from '../../interaces/weather.interface';

function Dashboard() {
  const [loading, setLoading] = React.useState(false);
  const [stations, setStations] = React.useState<IStation[]>([]);
  const [weather, setWeather] = React.useState<IWeather | null>(null);

  const { doRequest } = useRequest<any, ISnapshotsResponse>({
    url: 'https://indego-api.herokuapp.com/api/v1/snapshot',
    method: "get",
    onSuccess: (data) => {
      setStations(data.stations);
      setWeather(data.weather);
      setLoading(false);
    },
    onError: (err) => {
      if (err.response.status === 404) {
        setStations([]);
        setWeather(null);
      } else {
        console.error(err.message ?? 'Something went wrong');
        errorToast(err.message ?? 'Something went wrong');
      }
      setLoading(false);
    },
  });

  const { doRequest: postRequest } = useRequest<any, IPostStationResponse>({
    url: 'https://indego-api.herokuapp.com/api/v1/store',
    method: "post",
    onSuccess: (data) => {
      setStations([
        ...stations,
        ...data.data,
      ]);
      setLoading(false);
    },
    onError: (err) => {
      setStations([]);
      console.error(err.message ?? 'Something went wrong');
      errorToast(err.message ?? 'Something went wrong');
      setLoading(false);
    },
  });

  React.useEffect(() => {
    setLoading(true);
    doRequest({
      params: {
        at: new Date(new Date().setHours(0,0,0,0)),
      },
    });
  }, []);

  const onFirstDataRendered = ({ api }: { api: GridApi }) => {
    api.sizeColumnsToFit();
  };

  function valueGetter(params: any) {
    return params.data;
  }

  const ActionRenderer = ({ value }: { value: IStation }) => {
    return (
      <Link to={`/${value.kioskId}?at=${value.createdAt}`}>View</Link>
    );
  };

  function onChange(date: any, dateString: string) {
    setLoading(true);
    doRequest({
      params: {
        at: date,
      },
    })
  }

  function disabledDates(current: Date) {
    return current && current > new Date();
  }

  function fetchLatestData() {
    setLoading(true);
    postRequest();
  }

  function formatDate(date: Date) {
    let d = new Date(date);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  }

  return (
    <>
      {loading && <Loader />}
      <Container>
        <Filters>
          <DatePicker
            disabledDate={disabledDates}
            onChange={onChange}
          />
          {weather && (<div>
            Temperature on {formatDate(stations[0]?.createdAt ?? new Date())}: {weather && Math.round(weather.temp)}&deg; Celsius
          </div>)}
          <Button
            type='primary'
            onClick={fetchLatestData}
          >
            Fetch latest data
          </Button>
        </Filters>
        <GridContainer className="ag-theme-alpine">
          <AgGridReact
            rowData={stations}
            pagination={true}
            paginationPageSize={10}
            onFirstDataRendered={onFirstDataRendered}
            frameworkComponents={{
              actionRenderer: ActionRenderer,
            }}
          >
            <AgGridColumn field="kioskId" headerName='Kiosk ID'></AgGridColumn>
            <AgGridColumn field="name" headerName='Name'></AgGridColumn>
            <AgGridColumn field="addressStreet" headerName="Street"></AgGridColumn>
            <AgGridColumn
              cellRenderer="actionRenderer"
              headerName="Actions"
              field="actions"
              valueGetter={valueGetter}
            />
          </AgGridReact>
        </GridContainer>
      </Container>
    </>
  )
}

export default Dashboard;

