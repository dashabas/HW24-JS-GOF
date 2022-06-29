class PubSub {
    constructor() {
        this.handlers = [];
    }
    subscribe(event, handler, context) {
        if (typeof context === 'undefined') { context = handler; }
        this.handlers.push({ event: event, handler: handler.bind(context) });
    }
    publish(event, msg, author) {
        this.handlers.forEach((topic) => {
            if (topic.event === event) {
                topic.handler(msg, author)
            }
        })
    }
}

class Jack {
    constructor(el) {
        this.pubsub = el;
        this.name = 'Jack';
        this.pubsub.subscribe('message to Jack', this.emitMessage, this);
    }
    emitMessage() {
        console.log(`${this.name} get upset and run away`);
    }
    sendMessage() {
        console.log(`${this.name} loves Rose!`);
        this.pubsub.publish('message to Rose', `${this.name} loves Rose!`, this.name);
    }
}

class Billy {
    constructor(el) {
        this.pubsub = el;
        this.name = 'Billy';
        this.pubsub.subscribe('message to Billy', this.emitMessage, this);
    }
    emitMessage() {
        console.log(`${this.name} get upset and run away`);
    }
    sendMessage() {
        console.log(`${this.name} loves Rose!`);
        this.pubsub.publish('message to Rose', `${this.name} loves Rose!`, this.name);
    }
}

class Rose {
    constructor(el) {
        this.pubsub = el;
        this.name = 'Rose';
        this.pubsub.subscribe('message to Rose', this.emitMessage, this);
    }
    emitMessage(event, author) {
        if (author === 'Jack') {
            console.log(`${this.name} is happy with Jack!`);
            this.sendMessage('message to Billy', 'I am happy with Jack!');
        } else if (author === 'Billy') {
            console.log(`${this.name} is happy with Billy!`);
            this.sendMessage('message to Jack', 'I am happy with Billy!');
        }
    }
    sendMessage(event, msg) {
        this.pubsub.publish(event, msg, this.name);
    }
}

const pubSub = new PubSub();
const jack = new Jack(pubSub);
const billy = new Billy(pubSub);
const rose = new Rose(pubSub);

jack.sendMessage();