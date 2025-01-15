import { toast, ToastOptions } from "react-toastify";

export const showToast = (
  type: "success" | "error" | "info",
  message: string,
  options: ToastOptions = {}
) => {
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      borderRadius: "6px",
      padding: "8px 18px",
    },
    ...options,
  };

  if (type === "success") {
    toast.success(message, {
      ...defaultOptions,
      style: { ...defaultOptions.style, backgroundColor: "#9575CD", color: "#fff" },
    });
  } else if (type === "error") {
    toast.error(message, {
      ...defaultOptions,
      style: { ...defaultOptions.style, backgroundColor: "#D32F2F", color: "#fff" },
    });
  } else if (type === "info") { 
    toast.info(message, {
      ...defaultOptions,
      style: { ...defaultOptions.style, backgroundColor: "#0288D1", color: "#fff" },
    });
  }
};
