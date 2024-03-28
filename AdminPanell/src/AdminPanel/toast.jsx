import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMe = () => {
  
  const [name, setName] = useState("");

  const Toast = (res, message) => {
    if (res === "success") {
      toast.success(message);
    } else if (res === "error") {
      toast.error(message);
    } else if ( res === "info") {
      toast.info(message);
    }
  };

  function notify(e) {
    e.preventDefault();

    if (name === "") {
      Toast("error", "Please enter a name");
    } else {
      Toast("success", "Login Successfully");
    }
    setName("");
  }
  return (
    <div className="flex flex-col bg-blue-300 w-full h-screen justify-center items-center">
      <form onClick={notify}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Notify</button>
        <ToastContainer />
      </form>

    </div>
  );
};
export default ToastMe;
