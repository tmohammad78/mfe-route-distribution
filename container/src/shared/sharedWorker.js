class UserManager {
  constructor() {
    this.auth = null;
    this.userData = {};
    this.message = {};
    this.cartTotal = 0;
  }

  setAuth(authData) {
    this.auth = authData;
    this.message = {
      type: "success",
      message: "Data is update"
    }
  }

  getAuth() {
    return this.auth;
  }

  setUserData(data) {
    this.userData = { ...this.userData, ...data };
  }

  getUserData() {
    return this.userData;
  }

  setCartTotal(total) {
    console.log(total,'ddddd total')
    this.cartTotal = total;
    this.message = {
      type: "success",
      message: "item is added"
    }
  }

  getCartTotal() {
    return this.cartTotal
  }
}

const userManager = new UserManager();

self.onmessage = function (e) {
  const workerData = e.data;
  postMessage("[WORKER] Web worker onmessage established");
  switch (workerData.connectionStatus) {
    case "init":
      console.log("This is init one")
      // socketInstance = userManager();
      // socketManagement();
      break;

    case "stop":
      // socketInstance.close();
      break;

    default:
      postMessage("dadaddda")
  }
}