import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import FetchService from "../../../services/FetchService";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user;
        await axios
          .get(`${process.env.API_URL}/user`, {
            params: {
              login: credentials.username,
              password: credentials.password,
            },
          })
          .then(function (response) {
            user = response;
          })
          .catch(function (error) {
            console.log(error);
          });
        return Promise.resolve(user ? user : null);
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
