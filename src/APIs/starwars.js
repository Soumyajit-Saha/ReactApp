import axios from "axios";

const starwars = {
  getPeople: async (url) => {
    try {
      if (url === "") {
        const response = await axios.get("https://swapi.dev/api/people");
        console.log(response.data);
        return response.data;
      } else {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      return error;
    }
  },
  getPlanets: async (url) => {
    try {
      if (url === "") {
        const response = await axios.get("https://swapi.dev/api/planets");
        console.log(response.data);
        return response.data;
      } else {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      return error;
    }
  },
  getStarships: async (url) => {
    try {
      if (url === "") {
        const response = await axios.get("https://swapi.dev/api/starships");
        console.log(response.data);
        return response.data;
      } else {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      return error;
    }
  }
};

export default starwars;
