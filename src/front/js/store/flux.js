import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      login: async (email, password) => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
          });
          const data = await resp.json();
          console.log(`token --> ${data}`);
          // localStorage.setItem("jwt-token", data);
          return data;
        } catch (error) {
          console.log("Error logging user in", error);
          return "error";
        }
      },

      signUp: async (email, password) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
              is_active: true,
            }),
          });
          const data = await resp.json();
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error saving user", error);
          return "error";
        }
      },
      showToast: (msg) => {
        toast(msg);
      },
      setToken: (token) => {
        localStorage.setItem("token", token);
      },
      getToken: () => {
        return localStorage.getItem("token");
      },
      getProtectedUser: async (token) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/protected", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });
          const data = await resp.json();
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error saving user", error);
          return "error";
        }
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
