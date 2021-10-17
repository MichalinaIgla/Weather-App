import Sidebar from "../../components/Sidebar";
import { useDispatch } from "react-redux";
import "./MapWeather.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWeather, weatherSelector } from "../../reducers/weatherSlice";
import Widgets from "../../components/Widgets";
import Map from "../../components/Map/Map";
import { fetchPollution } from "../../reducers/pollutionSlice";
import pl from "../../icons/pl.svg";
import en from "../../icons/en.svg";
import { useTranslation } from "react-i18next";
const MapWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState();
  const data = useSelector(weatherSelector);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("pl");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchWeather({ lat: 51.753981757816746, lng: 19.45603662523837 }));
    dispatch(
      fetchPollution({ lat: 51.753981757816746, lng: 19.45603662523837 })
    );

    if (!localStorage.widgetArrangement) {
      localStorage.setItem(
        "widgetArrangement",
        JSON.stringify({
          weather: { x: 162, y: 97 },
          airQuality: { x: 125, y: 14 },
          favPlaces: { x: 10, y: 10 },
          astro: {
            sunrise: { x: 1396, y: 221 },
            sunset: { x: 678, y: 137 },
            moonset: { x: 463, y: -327 },
            moonrise: { x: 1398, y: 156 },
          },
        })
      );
    }
  }, []);

  useEffect(() => {
    if (data && data.data) {
      if (Object.keys(data.data).length !== 0) {
        setWeatherData(data);
      }
    }
  }, [data]);

  const handleChangeLanguage = () => {
    if (language === "pl") {
      i18n.changeLanguage("en");
      setLanguage("en");
    } else {
      i18n.changeLanguage("pl");
      setLanguage("pl");
    }
  };
  return (
    <div className="mapWeather">
      <div className="flags" onClick={handleChangeLanguage}>
        <img id={language === "en" ? "second" : "first"} src={en} />
        <img id={language === "pl" ? "second" : "first"} src={pl} />
      </div>
      <Sidebar />
      <Map className="container" />
      <Widgets data={weatherData} />
    </div>
  );
};

export default MapWeather;
