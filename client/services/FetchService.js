import axios from "axios";

class FetchService {
  static async getUser(login, password) {
    console.log("2");
    await axios.get(`${process.env.API_URL}/user`, {
      params: {
        login,
        password,
      },
    });
  }
}

export default FetchService;
