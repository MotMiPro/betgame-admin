import { notification } from "antd";
import React from "react";

export const openNotification = ({ description, title }) => {
  notification.open({
    message: title,
    description: description,
    icon: <i className="fas fa-smile-beam"></i>,
  });
};
