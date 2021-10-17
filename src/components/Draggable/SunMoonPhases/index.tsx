import Draggable from "react-draggable";
import Card from "@material-ui/core/Card";
import "./SunMoonPhases.scss";
import { useRef, useEffect, useState } from "react";
import sun from "../../../icons/sun.png";
import moon from "../../../icons/moon.png";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useDispatch } from "react-redux";
import { changeVisibility } from "../../../reducers/widgetsArrangementSlice";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

interface SunMoonPhasesProps {
  category: string;
  hour: string | null;
  text: string;
  arrangementElement: string;
  x: number;
  y: number;
  editMode: boolean;
  visible: boolean;
}
const SunMoonPhases: React.FC<SunMoonPhasesProps> = ({
  text,
  hour,
  category,
  x,
  y,
  arrangementElement,
  editMode,
  visible,
}) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState({ x, y });
  // const [visibleWidget, setvisibleWidget] = useState(initialState)
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  const date = new Date(Number(hour) * 1000);
  const formatedTime = date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2);

  const handleStopWidgetPosition = (e: any, position: any) => {
    const arrangmentString = localStorage.getItem("widgetArrangement");
    if (arrangmentString) {
      const arrangement = JSON.parse(arrangmentString);
      arrangement.astro[arrangementElement] = {
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
    const changedVisibility: any = {};
    changedVisibility[arrangementElement] = !visible;
    dispatch(changeVisibility(changedVisibility));
  };

  return (
    <div className={`${visible ? "" : "hidden"} ${editMode ? "transparent" : ""}`}>
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        position={position}
        disabled={!editMode}
        handle="strong"
        onStop={handleStopWidgetPosition}
      >
        <Card ref={nodeRef} className={`SunMoonPhases ${category}`}>

          {editMode ? (
            visible ? (
              <VisibilityIcon className="visibility-icon" onClick={handleToggleVisibilityWidget} />
            ) : (
              <VisibilityOffIcon className="visibility-icon" onClick={handleToggleVisibilityWidget} />
            )
          ) : null}

          <div className="hour">
            {hour !== undefined || hour !== null ? formatedTime : "..."}
            <img id="icon" src={category === "sun" ? sun : moon} alt="icon" />
          </div>

          <div className="text">{t(`${text}`)}</div>
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

export default SunMoonPhases;
