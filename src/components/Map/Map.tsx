import GoogleMapReact from "google-map-react";
import "./Map.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { weatherSelector } from "../../reducers/weatherSlice";
import RoomIcon from "@material-ui/icons/Room";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../reducers/weatherSlice";
import { fetchPollution } from "../../reducers/pollutionSlice";
import marker from "../../icons/marker.png";
const Marker = (props: any) => {
  return <img className="map-marker" id="icon" src={marker} alt="icon" />;
};
const Map = (props: any) => {
  const dispatch = useDispatch();
  const data = useSelector(weatherSelector);
  const [coords, setCoords] = useState({
    lat: 51.754068098167764,
    lng: 19.45612245592359,
  });
  useEffect(() => {
    if (
      data &&
      Object.keys(data.data).length !== 0 &&
      data.data.isText == true
    ) {
      setCoords({ lat: data.data.lat, lng: data.data.lon });
    }
  }, [data]);
  const findUserGeolocation = () => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const geolocation = { lat, lng };
        setCoords(geolocation);
        dispatch(fetchWeather(geolocation));
        dispatch(fetchPollution(geolocation));
      },
      (err) => {
        dispatch(fetchWeather(coords));
        dispatch(fetchPollution(coords));
        console.log(err, "Error,  Unable to access location");
      }
    );
  };

  const handlePosition = (ev: any) => {
    setCoords({ lat: ev.lat, lng: ev.lng });
    dispatch(fetchWeather({ lat: ev.lat, lng: ev.lng }));
    dispatch(fetchPollution({ lat: ev.lat, lng: ev.lng }));
  };

  return (
    <div className="container">
      <GoogleMapReact
        onGoogleApiLoaded={findUserGeolocation}
        defaultCenter={{
          lat: 51.754068098167764,
          lng: 19.45612245592359,
        }}
        center={coords}
        onClick={handlePosition}
        defaultZoom={8}
      >
        <Marker lat={coords.lat} lng={coords.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
