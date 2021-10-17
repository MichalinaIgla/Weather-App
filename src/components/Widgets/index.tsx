import SunMoonPhases from "../../components/Draggable/SunMoonPhases";
import WeatherBar from "../Draggable/WeatherBar";
import Pollution from "../../components/Draggable/Pollution";
import "./Widgets.scss";
import { useSelector } from "react-redux";
import FavouritePlaces from "./../Draggable/FavouritePlaces";

const Widgets = ({ data }: any) => {
  const widgetsArrangement = useSelector(
    (state: any) => state.rootReducers.widgetsArrangementReducer
  ).data;

  return (
    <div id="widgetContainer">
      <Pollution
        x={widgetsArrangement.airQuality.x}
        y={widgetsArrangement.airQuality.y}
        editMode={widgetsArrangement.editMode.mode}
        visible={widgetsArrangement.editMode.widgets.airQuality}
      />
      <SunMoonPhases
        category="sun"
        arrangementElement="sunrise"
        hour={data ? data.data.daily[0].sunrise : null}
        text="Sunrise"
        x={widgetsArrangement.astro.sunrise.x}
        y={widgetsArrangement.astro.sunrise.y}
        editMode={widgetsArrangement.editMode.mode}
        visible={widgetsArrangement.editMode.widgets.sunrise}
      />
      <SunMoonPhases
        category="sun"
        arrangementElement="sunset"
        hour={data ? data.data.daily[0].sunset : null}
        text="Sunset"
        x={widgetsArrangement.astro.sunset.x}
        y={widgetsArrangement.astro.sunset.y}
        editMode={widgetsArrangement.editMode.mode}
        visible={widgetsArrangement.editMode.widgets.sunset}
      />
      <SunMoonPhases
        category="moon"
        arrangementElement="moonrise"
        hour={data ? data.data.daily[0].moonrise : null}
        text="Moonrise"
        x={widgetsArrangement.astro.moonrise.x}
        y={widgetsArrangement.astro.moonrise.y}
        editMode={widgetsArrangement.editMode.mode}
        visible={widgetsArrangement.editMode.widgets.moonrise}
      />
      <SunMoonPhases
        category="moon"
        arrangementElement="moonset"
        hour={data ? data.data.daily[0].moonset : null}
        text="Moonset"
        x={widgetsArrangement.astro.moonset.x}
        y={widgetsArrangement.astro.moonset.y}
        editMode={widgetsArrangement.editMode.mode}
        visible={widgetsArrangement.editMode.widgets.moonset}
      />
      {data && (
        <WeatherBar
          x={widgetsArrangement.weather.x}
          y={widgetsArrangement.weather.y}
          data={data}
          editMode={widgetsArrangement.editMode.mode}
          visible={widgetsArrangement.editMode.widgets.weather}
        />
      )}
      <FavouritePlaces
        x={widgetsArrangement.favPlaces.x}
        y={widgetsArrangement.favPlaces.y}
        editMode={widgetsArrangement.editMode.mode}
        visible={widgetsArrangement.editMode.widgets.favPlaces}
      />
    </div>
  );
};

export default Widgets;
