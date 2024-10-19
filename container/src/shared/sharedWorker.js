// sharedWorker.js
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

// Create a single instance of UserManager
const userManager = new UserManager();

self.onconnect = (event) => {
  const port = event.ports[0];

  port.onmessage = (event) => {
    const { type, data, event:EventName } = event.data;

    if (type === 'publish' && EventName === 'cartUpdated') {
      port.postMessage({
        type: 'subscribe',
        event: 'cartUpdated',
        data,
      });
    }

    if (type === 'setAuth') {
      userManager.setAuth(data);
      port.postMessage(userManager.message);
    } else if (type === 'getAuth') {
      port.postMessage(userManager.getAuth());
    } else if (type === 'setUserData') {
      userManager.setUserData(data);
      port.postMessage('User data set');
    } else if (type === 'getUserData') {
      port.postMessage(userManager.getUserData());
    } else if (type === "setCartTotal") {
      userManager.setCartTotal(data);
      port.postMessage({
        data: userManager.getCartTotal(),
        event: "cartUpdated",
        type: "subscribe"
      });
    } else if(type === "getCartTotal") {
      port.postMessage(userManager.getCartTotal());
    }
  };

  port.start();
};



class PubSub {
  constructor() {
    this.subscribers = new Map();
  }

  publish(event, data) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event).forEach((callback) => callback(data));
    }
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(callback);
  }
}

const pubSub = new PubSub();



self.addEventListener('message', (e) => {
  const { type, event, data } = e.data;
  console.log(e,'eeeee')
  if (type === 'publish') {
    pubSub.publish(event, data);
  }
});

// Example to log to console when subscribed
pubSub.subscribe('cartUpdated', (data) => {
  console.log('Cart updated with data:', data);
});