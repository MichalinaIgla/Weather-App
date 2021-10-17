import Card from "@material-ui/core/Card";
import { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import "./Pollution.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { changeVisibility } from "../../../reducers/widgetsArrangementSlice";
interface PollutionProps {
  x: number;
  y: number;
  editMode: boolean;
  visible: boolean;
}
const Pollution: React.FC<PollutionProps> = ({ x, y, editMode, visible }) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState({ x, y });
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const pollutionData = useSelector(
    (state: any) => state.rootReducers.pollutionReducer
  ).data;
  // const isEditMode = useSelector((state: any) => state.rootReducers.widgetsArrangementReducer).data.editMode.mode;
  // console.log(isEditMode, "isEditMode");
  const getAqiDescription = (aqi: number) => {
    switch (aqi) {
      case 1:
        return t("Very Good");
      case 2:
        return t("Good");
      case 3:
        return t("Fair");
      case 4:
        return t("Poor");
      case 5:
        return t("Very Poor");
      case 6:
        return t("Hazardous");
      default:
        return "...";
    }
  };
  const handleStopWidgetPosition = (e: any, position: any) => {
    const arrangmentString = localStorage.getItem("widgetArrangement");
    if (arrangmentString) {
      const arrangement = JSON.parse(arrangmentString);
      arrangement.airQuality = {
        x: position.x,
        y: position.y,
      };
      localStorage.setItem("widgetArrangement", JSON.stringify(arrangement));
      setPosition({ x: position.x, y: position.y });
    }
  };
  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  const handleToggleVisibilityWidget = () => {
    dispatch(changeVisibility({airQuality: !visible}));
  };
  
  return (
    <div className={`${visible ? "" : "hidden"} ${editMode ? "transparent" : ""}`}>
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        nodeRef={nodeRef}
        handle="strong"
        position={position}
        disabled={!editMode}
        onStop={handleStopWidgetPosition}
      >
        <Card className="Pollution" ref={nodeRef}>

        {editMode ? (
            visible ? (
              <VisibilityIcon className="visibility-icon" onClick={handleToggleVisibilityWidget} />
            ) : (
              <VisibilityOffIcon className="visibility-icon" onClick={handleToggleVisibilityWidget} />
            )
          ) : null}
          <div className="title">{t("airQuality")}</div>

          <Box
            className="circle-wrapper"
            display="flex"
            justifyContent="center"
          >
            <Box
              className={`circle variant${pollutionData.main.aqi}`}
              border={6}
              width={100}
              height={100}
              borderRadius={100}
            />
            <div className={`aqi variant${pollutionData.main.aqi}`}>
              {getAqiDescription(pollutionData.main.aqi)}
            </div>
          </Box>
          <div className="pm">
            pm10 {t("is")}{" "}
            {pollutionData.components && pollutionData.components.pm10}
          </div>
          {editMode && (
            <strong className="handle">
              <div className="triangle"></div>
            </strong>
          )}
        </Card>
      </Draggable>
    </div>
  );
};

export default Pollution;
