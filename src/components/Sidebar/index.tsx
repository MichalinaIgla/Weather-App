import { Button, IconButton, List, TextField } from "@material-ui/core";
import debounce from "lodash.debounce";
import Drawer from "@material-ui/core/Drawer";
import { useEffect, useRef, useState, useCallback } from "react";
import WidgetsModal from "./WidgetsModal";
import "./Sidebar.scss";
import searchloupe from "../../icons/search-loupe.png";
import { autoComplete } from "../../api/autocomplete";
import { getCoords } from "../../api/weather";
import { fetchWeather } from "../../reducers/weatherSlice";
import { useDispatch } from "react-redux";
import HistoryModal from "./HistoryModal";
import { changeEditMode } from "../../reducers/widgetsArrangementSlice";
import ManagementModal from "./ManagemetModal";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import SettingsIcon from "@material-ui/icons/Settings";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";

const Sidebar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openWidgets, setOpenWidgets] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openManagement, setOpenManagement] = useState(false);
  const [autoCompleteCities, setAutoCompleteCities] = useState([]);
  const wrapperRef = useRef(null);
  const [inputText, setInputText] = useState("");

  const handleClickOutside = (event: any) => {
    // @ts-ignore: Object is possibly 'null'.
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenSidebar(false);
    }
  };

  const handleToggleWidgetsModal = () => {
    setOpenWidgets(!openWidgets);
  };

  const handleToggleHistoryModal = () => {
    setOpenHistory(!openHistory);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleClickOutside);
    };
  }, [wrapperRef]);

  const getWeatherByCityName = async (event: any) => {
    event.preventDefault();
    if (inputText !== "") {
      const resp = await getCoords(inputText);

      if (resp != undefined && resp.length > 0) {
        console.log(resp);
        let data = { lat: resp[0].lat, lng: resp[0].lon, isText: true };
        dispatch(fetchWeather(data));
        setOpenSidebar(false);
        setInputText("");
        setAutoCompleteCities([]);
      }
    }
  };

  const getWeatherFromAutoComplete = async (name: any) => {
    const resp = await getCoords(name);
    let data = { lat: resp[0].lat, lng: resp[0].lon, isText: true };
    if (resp !== []) {
      dispatch(fetchWeather(data));
      setOpenSidebar(false);
      setInputText("");
      setAutoCompleteCities([]);
    }
  };

  const handleChange = async (event: any) => {
    if (event.target.value.length > 0 && event.target.value != " ") {
      const resp = await autoComplete(event.target.value);
      if (resp !== undefined) {
        let namesArr = [] as any;
        resp.features.forEach((x: any) => {
          if (x.properties.city != undefined) {
            namesArr.push(x.properties.city);
          }
        });
        setAutoCompleteCities(namesArr);
      }
    } else if (event.target.value.length == 0) {
      setAutoCompleteCities([]);
    }
  };

  const debouncedChangeHandler = useCallback(debounce(handleChange, 400), []);

  const handleChangeEditMode = () => {
    dispatch(changeEditMode());
    setEditMode(!editMode);
    setOpenSidebar(false);
  };
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setOpenSidebar(true)}
        edge="start"
        style={{ width: "4em" }}
      >
        <img className="loupe" id="icon" src={searchloupe} alt="icon" />
      </IconButton>
      <IconButton
        edge="start"
        className="settings-icon"
        onClick={handleChangeEditMode}
      >
        {editMode ? <SettingsApplicationsIcon /> : <SettingsIcon />}
      </IconButton>
      <Drawer
        className="side-drawer"
        variant="persistent"
        anchor="left"
        open={openSidebar}
        ref={wrapperRef}
      >
        <form>
          <div className="form-group row">
            <TextField
              className="form-control form-control-lg"
              placeholder={t("search")}
              value={inputText}
              onChange={(event) => {
                setInputText(event.target.value);
                debouncedChangeHandler(event);
              }}
            />
            <button type="submit" onClick={getWeatherByCityName}>
              <img className="loupe" id="icon" src={searchloupe} alt="icon" />{" "}
            </button>
          </div>
          <ul className={autoCompleteCities.length > 0 ? "listBackground" : ""}>
            {autoCompleteCities &&
              autoCompleteCities !== [] &&
              autoCompleteCities.map((x, index) => (
                <li key={index} onClick={() => getWeatherFromAutoComplete(x)}>
                  {x}
                </li>
              ))}
          </ul>
        </form>

        <div>
          <List>
            <Link to="/">
              <Button
                variant="contained"
                disableElevation
                className="standard-button"
              >
                {t("backToHome")}
              </Button>
            </Link>
            <Button
              variant="contained"
              disableElevation
              onClick={handleToggleWidgetsModal}
              className="standard-button"
            >
              {t("widgetsArrangements")}
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={handleToggleHistoryModal}
              className="standard-button"
            >
              {t("searchHistory")}
            </Button>
          </List>{" "}
        </div>
      </Drawer>
      <WidgetsModal
        handleToggleWidgetsModal={handleToggleWidgetsModal}
        openWidgets={openWidgets}
      />
      <HistoryModal
        handleToggleHistoryModal={handleToggleHistoryModal}
        openHistory={openHistory}
      />
    </>
  );
};

export default Sidebar;
