import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          duration: 3000,
          theme: {
            primary: "#4aed88",
          },
        },
        error: {
          duration: 3000,
          theme: {
            primary: "#ff0000",
          },
        },
      }}
    />
  );
}
