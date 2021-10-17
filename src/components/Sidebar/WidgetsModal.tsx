import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Backdrop from "@material-ui/core/Backdrop";
import { useEffect, useState } from "react";
import "./WidgetsModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchWidgets } from "../../reducers/widgetsSlice";
import { removeWidgets } from "../../reducers/widgetsSlice";
import { addWidgets } from "../../reducers/widgetsSlice";
import { setWidgetArragment } from "../../reducers/widgetsArrangementSlice";
import { useTranslation } from "react-i18next";

interface WidgetsModalProps {
  handleToggleWidgetsModal: () => void;
  openWidgets: boolean;
}

const WidgetsModal: React.FC<WidgetsModalProps> = ({
  handleToggleWidgetsModal,
  openWidgets,
}) => {
  const { t } = useTranslation();
  const [inputName, setInputName] = useState("");
  const [responseWidget, setResponseWidget] = useState("");
  const dispatch = useDispatch();

  const widgetsData = useSelector((state: any) => state.rootReducers.widgetsReducer).data;
  const visibilityData = useSelector(
    (state: any) => state.rootReducers.widgetsArrangementReducer

  ).data;

  useEffect(() => {
    dispatch(fetchWidgets());
  }, []);
  const handleSaveWidgets = (ev: any) => {
    ev.preventDefault();
    const storageArragment = localStorage.getItem("widgetArrangement");
    if (storageArragment) {
      const arrangement = JSON.parse(storageArragment);
      const { weather, airQuality, favPlaces } = arrangement;
      const { sunrise, sunset, moonset, moonrise } = arrangement.astro;

      dispatch(
        addWidgets({
          name: inputName,
          weather,
          airQuality,
          favPlaces,
          astro: { sunrise, sunset, moonset, moonrise },
          editMode: {
            mode: false,
            widgets: {  
              ...visibilityData.editMode.widgets
            }, 
          }
        })
      );
      setResponseWidget("Added Successfully");
    } else {
      setResponseWidget("Error");
    }
  };

  const handleUseWidget = (id: string) => {
    dispatch(setWidgetArragment(widgetsData.find((el: any) => el._id === id)));
  };

  const handleRemoveWidgetArrangement = (ev: any, id: string) => {
    ev.preventDefault();
    ev.stopPropagation();
    dispatch(removeWidgets(id));
  };

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      open={openWidgets}
      onClose={() => {
        setResponseWidget("");
        setInputName("");
        handleToggleWidgetsModal();
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
              {t("newArrangementsText")}
            </Typography>
          </DialogTitle>
          <form onSubmit={handleSaveWidgets} style={{ display: "flex" }}>
            <TextField
              variant="outlined"
              required
              id="standard-required"
              label={t("name")}
              value={inputName}
              fullWidth
              onChange={(e: any) => {
                setInputName(e.target.value);
              }}
            />
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleSaveWidgets}
              >
                {t("save")}
              </Button>
            </DialogActions>
          </form>
          <div className="resultText">
            <Typography>{responseWidget}</Typography>
          </div>
        </Box>
        <List>
          <ListItem>
            <Typography>{t("useSavedArrangements")}</Typography>
          </ListItem>
          {widgetsData?.map((arrangement: any) => (
            <ListItem
              button
              key={arrangement._id}
              onClick={() => {
                handleUseWidget(arrangement._id);
              }}
            >
              <ListItemText primary={arrangement.name} />
              <ListItemIcon>
                <IconButton
                  onClick={(ev) => {
                    handleRemoveWidgetArrangement(ev, arrangement._id);
                  }}
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Container>
    </Dialog>
  );
};

export default WidgetsModal;
