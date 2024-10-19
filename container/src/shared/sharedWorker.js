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
  
let ports = [];

self.onconnect = (event) => {
  const port = event.ports[0];
  ports.push(port);

  port.onmessage = (e) => {
    const { type, event: eventName, data } = e.data;

    if (type === 'publish' && eventName === 'cartUpdated') {
      publishCartUpdate(data);
    }
  };
};

const publishCartUpdate = (data) => {
  for (const port of ports) {
    port.postMessage({
      type: 'subscribe',
      event: 'cartUpdated',
      data,
    });
  }
};


self.addEventListener('message', (e) => {
  const { type, event, data } = e.data;
  if (type === 'publish') {
    pubSub.publish(event, data);
  }
});

// Example to log to console when subscribed
pubSub.subscribe('cartUpdated', (data) => {
  console.log('Cart updated with data:', data);
});

  