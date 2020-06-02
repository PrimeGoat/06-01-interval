// create a Clock class that inherits from the EventEmitter Class
// Inside the Class:
// class includes variables for count and string for the word second or seconds
// class includes a method tick that runs the event dipslaying the count and string second or seconds

// Outside of the Class:
// there will be 2 events.
// 1 event, countSeconds, will count and display the number of seconds up to 10 seconds like the video
// the other event, done,  will display a message, 'Your time is up!', when 10 seconds have passed
// hint: look up setInterval and clearInterval.
// refer to the video to see the output incrementation


// OUTPUT:
// 11:07:24 1 second
// 11:07:25 2 seconds
// 11:07:26 3 seconds
// 11:07:27 4 seconds
// 11:07:28 5 seconds
// 11:07:29 6 seconds
// 11:07:30 7 seconds
// 11:07:31 8 seconds
// 11:07:32 9 seconds
// 11:07:33 10 seconds
// Your time is up!

const events = require('events');
//const emitter = new events.EventEmitter();

class Clock extends events {
    constructor(span) {
        super();
        this.count = 0;
        this.span = span;

        //this.emitter = this.emit.bind(this);
        this.intervalID = setInterval(tick, 1000);
    }

    tick() {
        this.count++;
        this.emit('countSeconds', this.count);
        
        if(this.count >= this.span) {
            this.emit('done');
            clearInterval(this.intervalID);
        }
    }
}

const myTimer = new Clock(10);

function tick() {
    myTimer.tick();
}


myTimer.on('countSeconds', (count) => {
    let now = new Date();
    console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${count} ${pluralize(count, "second", "seconds")}`);
});

myTimer.on('done', () => {
    console.log('Your time is up!');
});

const pluralize = function(value, singular, plural) {
    return (value == 1) ? singular : plural;
}
