import notification from "antd/lib/notification";

import "./index.css";

export const successToast = (msg: string) => {
  notification.open({
    message: null,
    duration: 3,
    description: msg,
    style: {
      backgroundColor: "green",
      color: "white",
      borderRadius: "4px",
    },
  });
};

export const errorToast = (msg: string) => {
  notification.open({
    message: null,
    duration: 3,
    description: msg,
    style: {
      backgroundColor: "red",
      color: "white",
      borderRadius: "4px",
    },
  });
};
