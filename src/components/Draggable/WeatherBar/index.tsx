import Draggable from "react-draggable";
import Card from "@material-ui/core/Card";
import "./WeatherBar.scss";
import { useRef, useState, useEffect } from "react";
import moment from "moment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {} from "../../../reducers/favouritePlacesSlice";
import { toggleFavPlace } from "../../../reducers/favouritePlacesSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Plot from "react-plotly.js";
import { useDispatch } from "react-redux";
import { changeVisibility } from "../../../reducers/widgetsArrangementSlice";
interface WeatherBarProps {
  x: number;
  y: number;
  data: any;
  editMode: boolean;
  visible: boolean;
}

interface arrInfoProps {
  arr: any[];
  count: number;
}
enum Interval {
  Daily = "DAILY",
  ThreeDays = "THREEDAYS",
  Weekly = "WEEKLY",
  TwoWeeks = "TWOWEEKS",
}
const WeatherBar: React.FC<WeatherBarProps> = ({
  x,
  y,
  data,
  editMode,
  visible,
}) => {
  const { t } = useTranslation();
  const [interval, setInterval] = useState(Interval.Daily);
  const [plotInfo, setPlotInfo] = useState({});
  const [position, setPosition] = useState({ x, y });
  const [isFavPlace, setIsFavPlace] = useState(false);
  const dispatch = useDispatch();
  const favouritePlaces = useSelector(
    (state: any) => state.rootReducers.favouritePlacesReducer
  );

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);
  useEffect(() => {
    const found = favouritePlaces.find(
      (el: any) =>
        el.name === `${data.data.name.name}, ${data.data.name.country}`
    );
    found ? setIsFavPlace(true) : setIsFavPlace(false);
  }, [data.data.name]);

  const handleStopWidgetPosition = (e: any, position: any) => {
    const arrangmentString = localStorage.getItem("widgetArrangement");
    if (arrangmentString) {
      const arrangement = JSON.parse(arrangmentString);
      arrangement.weather.x = position.x;
      arrangement.weather.y = position.y;
      localStorage.setItem("widgetArrangement", JSON.stringify(arrangement));
      setPosition({ x: position.x, y: position.y });
    }
  };
  const nodeRef = useRef(null);
  const layout = {
    autosize: false,
    width: 900,
    height: 180,
    yaxis: {
      range: [data.data.current.temp - 15, data.data.current.temp + 15],
    },
    xaxis: {
      showgrid: false,
      zeroline: false,
      showline: false,
      tickformat:
        interval === Interval.Daily || interval === Interval.ThreeDays
          ? "%I:%M %p"
          : "%d-%m-%Y",
    },
    font: {
      family: "Abhaya Libre",
      size: 17,
      color: "#5E5F60",
    },
    margin: {
      l: 45,
      r: 45,
      b: 35,
      t: 25,
      pad: 4,
    },
  };
  const todayDate = moment().format("dddd, Do MMMM");

  useEffect(() => {
    let arrInfo: any = { x: [], y: [], type: "scatter" };
    let arrInfo2: any = { x: [], y: [], type: "scatter" };
    let slice: arrInfoProps = { arr: [], count: 0 };
    if (data !== []) {
      switch (interval) {
        case Interval.Daily:
          slice.arr = data.data.hourly.slice(0, 24);
          break;
        case Interval.ThreeDays:
          slice.arr = data.data.daily.slice(0, 3);
          break;
        case Interval.Weekly:
          slice.arr = data.data.daily;
          break;
        case Interval.TwoWeeks:
          slice.arr = data.data.daily;
          break;
        default:
          break;
      }

      slice.arr.forEach((x) => {
        let dt = new Date(Number(x.dt) * 1000);
        arrInfo.x.push(dt);
        arrInfo.y.push(interval === Interval.Daily ? x.temp : x.temp.day);
      });
    }
    setPlotInfo(arrInfo);
  }, [interval, data]);

  const handleAddToFavPlaces = () => {
    dispatch(
      toggleFavPlace({
        name: `${data.data.name.name}, ${data.data.name.country}`,
        lat: data.data.lat,
        lng: data.data.lon,
      })
    );
    setIsFavPlace((isFav) => !isFav);
  };
  const handleToggleVisibilityWidget = () => {
    dispatch(changeVisibility({weather: !visible}));
  };
  return (
    <div className={`${visible ? "" : "hidden"} ${editMode ? "transparent" : ""}`}>
      <div className="weatherContainer">
        <Draggable
          position={{ x: 60, y: position.y }}
          axis="y"
          handle="strong"
          disabled={!editMode}
          onStop={handleStopWidgetPosition}
        >
          <Card ref={nodeRef} id="weatherBar">
            {editMode ? (
              visible ? (
                <VisibilityIcon className="visibility-icon" onClick={handleToggleVisibilityWidget} />
              ) : (
                <VisibilityOffIcon className="visibility-icon" onClick={handleToggleVisibilityWidget} />
              )
            ) : null}
            <div className="temperature">
              <div className="temp">{data.data.daily[0].temp.day}°</div>
              <div className="icon">
                <img
                  src={`http://openweathermap.org/img/wn/${data.data.daily[0].weather[0].icon}@2x.png`}
                  alt="icon"
                />
              </div>
              <div className="info">
                <div className="location">
                  {data.data.name.name},{data.data.name.country}
                </div>
                <div className="date">{todayDate}</div>
              </div>
              <div className="heart-icon" onClick={handleAddToFavPlaces}>
                <FavoriteBorderIcon className={isFavPlace ? "hide" : ""} />
                <FavoriteIcon className={isFavPlace ? "" : "hide"} />

            </div>

            </div>
            {editMode && (
              <strong className="handle">
                <div className="triangle"></div>
              </strong>
            )}


            <div className="plot">
              {interval === Interval.Daily && plotInfo !== {} && (
                <Plot
                  data={[plotInfo]}
                  layout={layout}
                  config={{ responsive: true }}
                />
              )}

              {interval === Interval.ThreeDays && plotInfo !== {} && (
                <Plot data={[plotInfo]} layout={layout} />
              )}
              {interval === Interval.Weekly && plotInfo !== {} && (
                <Plot data={[plotInfo]} layout={layout} />
              )}
              {interval === Interval.TwoWeeks && plotInfo !== {} && (
                <Plot data={[plotInfo]} layout={layout} />
              )}
            </div>

            <div className="buttonContainer">
              <button
                className={interval === Interval.Daily ? "selected" : ""}
                onClick={() => setInterval(Interval.Daily)}
              >
                {t("Daily")}
              </button>
              <button
                className={interval === Interval.ThreeDays ? "selected" : ""}
                onClick={() => setInterval(Interval.ThreeDays)}
              >
                {t("3days")}
              </button>
              <button
                className={interval === Interval.Weekly ? "selected" : ""}
                onClick={() => setInterval(Interval.Weekly)}
              >
                {t("Week")}
              </button>
              <button
                className={interval === Interval.TwoWeeks ? "selected" : ""}
                onClick={() => setInterval(Interval.TwoWeeks)}
              >
                {t("15days")}
              </button>
            </div>
          </Card>
        </Draggable>
      </div>
    </div>
  );
};

export default WeatherBar;
