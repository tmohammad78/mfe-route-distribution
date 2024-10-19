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
class Sample {
  constructor() {
    this.base = 10;
  }

  calculate(num1, num2) {
    return num1 + num2 + this.base;
  }
}

const sample = new Sample();


const pubSub = new PubSub();
  
let ports = [];

const dataStore = {
  count: 0,
  inc() {
    this.counter++;
  },
};

self.onconnect = (event) => {
  const port = event.ports[0];
  ports.push(port);
  console.log(event,'this in ');

  port.onmessage = (e) => {
    const {type, event: eventName, data } = e.data
    console.log(data,' this is data')
    const result = sample(10,23)
    port.postMessage(result)
    if(eventName === 'init') {
      
    }
    // const { type, event: eventName, data } = e.data;
    // console.log(e,'this in e ');

    // if (type === 'publish' && eventName === 'cartUpdated') {
    //   publishCartUpdate({...data, test:"DFSDFDF"});
    // }
  };
};

function validateUUID() {
  return true
}
function uuid() {
  return "3"
}
class NewPubSub {
    constructor({ persistedTopics } = {}) {
        this.topics = {};
        this.subscriberTopics = {};
        this.persistedMessages = {};
        this.subscriberOnMsg = {};

        if (persistedTopics && !Array.isArray(persistedTopics)) {
            throw new Error("Persisted topics must be an array of topics.");
        }
        if (persistedTopics) {
            this.persistedMessages = persistedTopics.reduce((acc, cur) => {
                acc[cur] = {};
                return acc;
            }, {});
        }
    }

    /**
     * Subscribe to messages being published in the given topic.
     * @param {string} topic - Name of the channel/topic where messages are published.
     * @param {function} onMessage - Function called whenever new messages on the topic are published.
     * @returns {string} - ID of this subscription.
     */
    subscribe(topic, onMessage) {
        // Validate inputs
        if (typeof topic !== "string") throw new Error("Topic must be a string.");
        if (typeof onMessage !== "function") throw new Error("onMessage must be a function.");

        const subID = uuid();

        if (!(topic in this.topics)) {
            this.topics[topic] = [subID];
        } else {
            this.topics[topic].push(subID);
        }

        // Store onMessage and topic separately for faster lookup
        this.subscriberOnMsg[subID] = onMessage;
        this.subscriberTopics[subID] = topic;

        // If the topic is persisted and there are existing messages, trigger the onMessage handler immediately
        if (topic in this.persistedMessages) {
            onMessage(this.persistedMessages[topic]);
        }
        return subID;
    }

    /**
     * Publish messages on a topic for all subscribers to receive.
     * @param {string} topic - The topic where the message is sent.
     * @param {object} message - The message to send. Only object format is supported.
     */
    publish(topic, message) {
        if (typeof topic !== "string") throw new Error("Topic must be a string.");
        if (typeof message !== "object") throw new Error("Message must be an object.");

        // If topic exists, post messages
        if (topic in this.topics) {
            const subIDs = this.topics[topic];
            subIDs.forEach((id) => {
                if (id in this.subscriberOnMsg) {
                    this.subscriberOnMsg[id](message);
                }
            });
        }
        if (topic in this.persistedMessages) {
            this.persistedMessages[topic] = message;
        }
    }

    /**
     * Unsusbscribe for a given subscription id.
     * @param {string} id - Subscription id
     */
    unsubscribe(id) {
        // Validate inputs
        if (typeof id !== "string" || !validateUUID(id)) {
            throw new Error("ID must be a valid UUID.");
        }

        // If the id exists in our subscriptions then clear it.
        if (id in this.subscriberOnMsg && id in this.subscriberTopics) {
            // Delete message listener
            delete this.subscriberOnMsg[id];
            // Remove id from the topics tracker
            const topic = this.subscriberTopics[id];
            // Cleanup topics
            if (topic && topic in this.topics) {
                const idx = this.topics[topic].findIndex((tID) => tID === id);
                if (idx > -1) {
                    this.topics[topic].splice(idx, 1);
                }
                // If there are no more listeners, clean up the topic as well
                if (this.topics[topic].length === 0) {
                    delete this.topics[topic];
                }
            }
            // Delete the topic for this id
            delete this.subscriberTopics[id];
        }
    }
}


const test = new NewPubSub()

const publishCartUpdate = (data) => {
  for (const port of ports) {
    port.postMessage({
      type: 'subscribe',
      event: 'cartUpdated',
      data,
    });
  }
};


// self.addEventListener('message', (e) => {
//   console.log(e,'this wtf ');
  
//   const { type, event, data } = e.data;
//   if (type === 'publish') {
//     pubSub.publish(event, data);
//   }
// });

// // Example to log to console when subscribed
// pubSub.subscribe('cartUpdated', (data) => {
//   console.log('Cart updated with data:', data);
// });

  