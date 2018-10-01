
function Deque(size) {
    this.bufferSize = size || 100;
    this.array = new Array(this.bufferSize);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
}

//insert element at back
Deque.prototype.push = function (item) {
    if(arguments.length > 1){
        for (let index = 0; index < arguments.length; ++index) {
            this.push(arguments[index]);
        }
        return;
    }
    if(this.count > 0){
        let newtail = this.increment(this.tail);
        if(this.head === newtail){
            this.increaseSize();
            newtail = this.increment(this.tail);
        }
        this.tail = newtail;
    }
    this.count++;
    this.array[this.tail] = item;
};

//insert element at front
Deque.prototype.unshift = function (item) {
    if(arguments.length > 1){
        for (let index = 0; index < arguments.length; ++index) {
            this.unshift(arguments[index]);
        }
        return;
    }
    if(this.count > 0){
        let newhead = this.decrement(this.head);
        if(this.tail === newhead){
            this.increaseSize();
            newhead = this.decrement(this.head);
        }
        this.head = newhead;
    }
    this.count++;
    this.array[this.head] = item;
};

//remove last element
Deque.prototype.pop = function () {
    if(this.count === 0){
        return null;
    }
    let item = this.array[this.tail];
    this.tail = this.decrement(this.tail);
    this.count--;
    return item;
};

//remove first element
Deque.prototype.shift = function () {
    if(this.count === 0){
        return null;
    }
    let item = this.array[this.head];
    this.head = this.increment(this.head);
    this.count--;
    return item;
};

Deque.prototype.increaseSize = function () {
    let newArray = this.toArray(this.bufferSize*2);
    this.bufferSize = newArray.length;
    this.head = 0;
    this.tail = this.count-1;
    this.array = newArray;
}

Deque.prototype.increment = function (number) {
    return (number + 1) % this.bufferSize;
};

Deque.prototype.decrement = function (number) {
    return (number + this.bufferSize - 1) % this.bufferSize;
};

Deque.prototype.toArray = function (size) {
    let len = size !== undefined
        ? size
        : this.count;
    let newArray = new Array(len);
    let c = this.head;
    for(let i=0; i < this.count; i++){
        newArray[i] = this.array[c];
        c = this.increment(c);
    }
    return newArray
};

module.exports = Deque;
