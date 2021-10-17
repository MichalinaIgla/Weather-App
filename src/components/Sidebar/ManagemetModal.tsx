import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import { useEffect, useState } from "react";
import "./ManagementModal.scss";
import { fetchWeather } from "../../reducers/weatherSlice";
import RoomIcon from "@material-ui/icons/Room";
import { getCoords } from "../../api/weather";
import Checkbox from "@material-ui/core/Checkbox";
import { changeVisibility } from "../../reducers/widgetsArrangementSlice";
import { useTranslation } from "react-i18next";
interface ManagementModalProps {
  handleToggleManagementModal: () => void;
  openManagement: boolean;
}

const ManagementModal: React.FC<ManagementModalProps> = ({
  handleToggleManagementModal,
  openManagement,
}) => {
  const { t } = useTranslation();
  const [widgets, setWidgets] = useState({
    weather: true,
    airQuality: true,
    favPlaces: true,
    sunrise: true,
    sunset: true,
    moonrise: true,
    moonset: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeVisibility(widgets));
  }, [widgets]);
  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      open={openManagement}
      onClose={() => {
        handleToggleManagementModal();
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Container>
        <Box className="saveWidget">
          <ul>
            <li>
              Moonset{" "}
              <Checkbox
                checked={widgets.moonset}
                onChange={() =>
                  setWidgets({ ...widgets, moonset: !widgets.moonset })
                }
              />
            </li>
            <li>
              Moonrise{" "}
              <Checkbox
                checked={widgets.moonrise}
                onChange={() =>
                  setWidgets({ ...widgets, moonrise: !widgets.moonrise })
                }
              />
            </li>
            <li>
              Sunset{" "}
              <Checkbox
                checked={widgets.sunset}
                onChange={() =>
                  setWidgets({ ...widgets, sunset: !widgets.sunset })
                }
              />
            </li>
            <li>
              Sunrise{" "}
              <Checkbox
                checked={widgets.sunrise}
                onChange={() =>
                  setWidgets({ ...widgets, sunrise: !widgets.sunrise })
                }
              />
            </li>
            <li>
              Favorite Places{" "}
              <Checkbox
                checked={widgets.favPlaces}
                onChange={() =>
                  setWidgets({ ...widgets, favPlaces: !widgets.favPlaces })
                }
              />
            </li>
            <li>
              Weather{" "}
              <Checkbox
                checked={widgets.weather}
                onChange={() =>
                  setWidgets({ ...widgets, weather: !widgets.weather })
                }
              />
            </li>
            <li>
              Air Quality{" "}
              <Checkbox
                checked={widgets.airQuality}
                onChange={() =>
                  setWidgets({ ...widgets, airQuality: !widgets.airQuality })
                }
              />
            </li>
          </ul>
        </Box>
      </Container>
    </Dialog>
  );
};

export default ManagementModal;
