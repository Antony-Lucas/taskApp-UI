import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SuccessToastMessage = (message, position) => {
  toast.success(message, {
    position: position,
    autoClose: 3000,
  });
};

export const ErrorToastMessage = (message, position) => {
  toast.error(message, {
    position: position,
    autoClose: 3000,
  });
};
