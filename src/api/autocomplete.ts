import axios from "axios";
export const autoComplete = async (word: string) => {
  return await axios
    .get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${word}&apiKey=${process.env.REACT_APP_AUTOCOMPLETE_API_KEY}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
