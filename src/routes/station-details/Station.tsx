import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import Loader from '../../components/Loader';

import { errorToast } from '../../components/Toast';
import useRequest from "../../hooks/use-request";
import { ISnapshotResponse } from '../../interaces/snapshot-response.interface';
import { IStation } from '../../interaces/station.interface';
import { IWeather } from '../../interaces/weather.interface';
import { StyledInfo } from './index.styled.component';

function useQuery() {
  return new URLSearchParams(useLocation().search).get('at');
}

function formatDate(date: Date) {
  let d = new Date(date);
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${da}-${mo}-${ye}`;
}

function StationInfo({ station, weather }: { station: IStation | null, weather: IWeather | null }) {
  return (
    <>
      <h2>
        <strong>Information about station with kiosk id {station?.kioskId} on {formatDate(station?.createdAt ?? new Date())}:</strong>
      </h2>
      <StyledInfo>
        <div>
          <h3>
            <strong>Temperature:</strong>
          </h3>
          <p>
            {weather && Math.round(weather.temp)}&deg; Celsius
          </p>
          <h3>
            <strong>Name:</strong>
          </h3>
          <p>
            {station?.name}
          </p>
          <h3>
            <strong>Address:</strong>
          </h3>
          <p>
            Street: {station?.addressStreet}<br />
        City: {station?.addressCity}<br />
        State: {station?.addressState}<br />
        Zip code: {station?.addressZipCode}<br />
          </p>
          <h3>
            <strong>Kiosk:</strong>
          </h3>
          <p>
            Kiosk status: {station?.kioskStatus}<br />
            Kiosk public status: {station?.kioskStatus}<br />
          </p>
        </div>
        <div>
          <h3>
            <strong>Bikes:</strong>
          </h3>
          {station?.bikes.map((bike) => (
            <div key={bike._id}>
              <h4><strong>Dock number: {bike.dockNumber}</strong></h4>
              <ul>
                <li>Available: {bike.isAvailable ? 'Yes' : 'No'}</li>
                <li>Electric: {bike.isElectric ? 'Yes' : 'No'}</li>
              </ul>
            </div>
          ))}
        </div>
      </StyledInfo>
    </>
  );
}

export default function Station() {

  const [loading, setLoading] = React.useState(false);
  const [station, setStation] = React.useState<IStation | null>(null);
  const [weather, setWeather] = React.useState<IWeather | null>(null);

  const { kioskId } = useParams<{ kioskId: string }>();
  const query = useQuery();
  const history = useHistory();

  const { doRequest } = useRequest<any, ISnapshotResponse>({
    url: `https://indego-api.herokuapp.com/api/v1/snapshot/${kioskId}`,
    method: "get",
    onSuccess: (data) => {
      setStation(data.station);
      setWeather(data.weather);
      setLoading(false);
    },
    onError: (err) => {
      if (err.response.status === 404) {
        setStation(null);
        setWeather(null);
      } else {
        console.error(err.message ?? 'Something went wrong');
        errorToast(err.message ?? 'Something went wrong');
      }
      setLoading(false);
    },
  });

  React.useEffect(() => {
    if (!query) {
      history.replace('/');
    }
    setLoading(true);
    doRequest({
      params: {
        at: query,
      },
    });
  }, []);
  return (
    <>
      {loading
        ? <Loader />
        : <StationInfo station={station} weather={weather} />
      }
    </>
  )
}
