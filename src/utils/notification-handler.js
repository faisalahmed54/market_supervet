import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timerProgressBar: true,
  timer: 3000,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const renderNotification = (type, title, msg) => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

// import { store } from 'react-notifications-component';
// import 'react-notifications-component/dist/theme.css';
// const renderNotification = (type, title, message) => {
//   store.addNotification({
//     title: `${title}!`,
//     message,
//     type,
//     insert: "top",
//     container: "top-center",
//     animationIn: ["animate__animated", "animate__fadeIn"],
//     animationOut: ["animate__animated", "animate__fadeOut"],
//     dismiss: {
//       duration: 3500,
//       onScreen: true
//     }
//   });
// };

export default renderNotification;
