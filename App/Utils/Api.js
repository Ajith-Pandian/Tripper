import { Platform } from "react-native";

export default class Api {
  static headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  static get(route) {
    return this.request(route, null, "GET", false);
  }
  static getByUrl(url) {
    return this.request(url, null, "GET", true);
  }

  static put(route, params) {
    return this.request(route, params, "PUT");
  }

  static post(route, params) {
    return this.request(route, params, "POST");
  }

  static delete(route, params) {
    return this.request(route, params, "DELETE");
  }

  static request(route, params, verb, hasUrl) {
    const localhost =
      Platform.OS === "android"
        ? "http://10.0.2.2:3000/"
        : "http://localhost:3000/";
    const url = !hasUrl ? `${host}${route}` : route;

    let options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null
    );
    options.headers = Api.headers();
    return fetch(url, options)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        return responseJson;
      })
      .then(responseJson => responseJson)
      .catch(error => {
        console.error(error);
      });
  }
}
