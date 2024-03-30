import { toast } from "react-toastify";

export const errorToast = (message) => {
  toast.error(message);
};

export const successToast = (message) => {
  toast.success(message);
};

export const infoToast = (message) => {
  toast(message, {
    autoClose: 3000,
    position: "bottom-left",
  });
};
