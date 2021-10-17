import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import "./FavouritePlaces.scss";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { fetchWeather } from "../../../reducers/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { changeVisibility } from "../../../reducers/widgetsArrangementSlice";

interface FavouritePlacesProps {
  x: number;
  y: number;
  editMode: boolean;
  visible: boolean;
}

const FavouritePlaces: React.FC<FavouritePlacesProps> = ({
  x,
  y,
  editMode,
  visible,
}) => {
  const { t } = useTranslation();

  const [placeName, setPlaceName] = useState("");
  const [position, setPosition] = useState({ x, y });
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const favouritePlaces = useSelector(
    (state: any) => state.rootReducers.favouritePlacesReducer
  );

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  const handleStopWidgetPosition = (e: any, position: any) => {
    const arrangmentString = localStorage.getItem("widgetArrangement");
    if (arrangmentString) {
      const arrangement = JSON.parse(arrangmentString);
      arrangement["favPlaces"] = {
        x: position.x,
        y: position.y,
      };
      localStorage.setItem("widgetArrangement", JSON.stringify(arrangement));
      setPosition({ x: position.x, y: position.y });
    }
  };
  const handleChange = (ev: any) => {
    setPlaceName(ev.target.value);
    const coords = {
      lat: ev.target.value.split(",")[0],
      lng: ev.target.value.split(",")[1],
    };
    dispatch(fetchWeather(coords));
  };
  return (
    <Draggable position={position} onStop={handleStopWidgetPosition}>
      <FormControl ref={nodeRef} variant="filled" className="FvouritePlaces">
        <InputLabel htmlFor="filled-age-native-simple">
          {t(`favPlaces`)}
        </InputLabel>
        <Select native onChange={handleChange}>
          <option aria-label="None" value="" />
          {favouritePlaces.map((place: any) => {
            return (
              <option key={place.id} value={[`${place.lat}`, `${place.lng}`]}>
                {place.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </Draggable>
  );
};

export default FavouritePlaces;
