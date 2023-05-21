export const alertHelper = (vm, msg, alertType) => {
  if (alertType === "success") {
    vm.notifsuccess = true;
  } else {
    vm.notifdanger = true;
  }
  vm.textNotif = msg;
  setTimeout(() => {
    vm.notifsuccess = false;
    vm.notifdanger = false;
  }, 3000);
};
