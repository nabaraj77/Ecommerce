import React from "react";
import toast, { Toaster } from "react-hot-toast";

// const Notify = () => {
//   const notify = () =>
//     toast.success("Successfully Added", {
//       position: "top - right",
//     });
//   return (
//     <div>
//       <button onClick={notify}>Make me a toast</button>
//       <Toaster />
//     </div>
//   );
// };

// export default Notify;
const notifyMsg = () => {
  return (
    <div>
      <Toaster />
      {toast.success("Successfully")}
    </div>
  );
};
export default notifyMsg;
