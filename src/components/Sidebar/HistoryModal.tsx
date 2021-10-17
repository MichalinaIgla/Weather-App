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
import "./HistoryModal.scss";
import { fetchWeather } from "../../reducers/weatherSlice";
import RoomIcon from "@material-ui/icons/Room";
import { getCoords } from "../../api/weather";
import { useTranslation } from "react-i18next";
interface HistoryModalProps {
  handleToggleHistoryModal: () => void;
  openHistory: boolean;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  handleToggleHistoryModal,
  openHistory,
}) => {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (openHistory === true) {
      const retrievedHistory = localStorage.getItem("History");
      if (localStorage["History"]) {
        let retrievedArray =
          retrievedHistory !== null ? JSON.parse(retrievedHistory) : [];
        setHistory(retrievedArray);
      }
    }
  }, [openHistory]);

  const handleClick = async (event: any) => {
    let text = event.target.innerText;
    let cutted = text.substring(0, text.indexOf(","));

    if (cutted !== "") {
      const resp = await getCoords(cutted);
      let data = { lat: resp[0].lat, lng: resp[0].lon, isText: true };
      if (resp !== []) {
        dispatch(fetchWeather(data));
        handleToggleHistoryModal();
      }
    }
  };
  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      open={openHistory}
      onClose={() => {
        handleToggleHistoryModal();
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Container>
        <Box className="saveWidget">
          <DialogTitle id="form-dialog-title" disableTypography>
            <Typography variant="h5" align="center">
              {t("searchHistory")} <RoomIcon className="roomicon" />
            </Typography>
          </DialogTitle>

          <div className="historyContainer">
            <ul>
              {history.map((x: any, index) => (
                <li key={index} onClick={handleClick}>
                  {x.name}, {x.country}
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Container>
    </Dialog>
  );
};

export default HistoryModal;
