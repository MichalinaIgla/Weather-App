import { widgetsApiClient } from "./client";
import { Widgets } from "../types/Widgets";

export const getWidgets = async () => {
  return await widgetsApiClient
    .get('/')
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const postWidgets = async (newArrangement: Widgets) => {
  return await widgetsApiClient
    .post('/', newArrangement)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteWidgets = async (id: string) => {
  return await widgetsApiClient
    .delete(`/${id}`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
};