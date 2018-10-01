var assert = require('assert');
var Deque = require('../src/Deque');

describe('Test Deque', () => {
    beforeEach((done) => {
        done();
    });
    afterEach((done) => {
        done();
    });

    it('deque push', () => {
        let deque = new Deque();
        deque.push(1);
        deque.push(2);
        deque.push(3);
        deque.push(4, 5);
        assert.deepEqual(deque.toArray(), [1, 2, 3, 4, 5]);
    });

    it('deque unshift', () => {
        let deque = new Deque();
        deque.unshift(4, 5, 6);
        deque.unshift(3);
        deque.unshift(2);
        deque.unshift(1);
        assert.deepEqual(deque.toArray(), [1, 2, 3, 6, 5, 4]);
    });

    it('deque unshift & push mix', () => {
        let deque = new Deque();
        deque.unshift(3);
        deque.unshift(2);
        deque.unshift(1);
        deque.push(5);
        deque.push(6);
        deque.push(7);
        assert.deepEqual(deque.toArray(), [1, 2, 3, 5, 6, 7]);
    });

    it('deque pop after unshifting', () => {
        let deque = new Deque();
        deque.unshift(3);
        deque.unshift(2);
        deque.unshift(1);
        deque.pop();
        assert.deepEqual(deque.toArray(), [1, 2]);

        deque.pop();
        assert.deepEqual(deque.toArray(), [1]);

        deque.pop();
        deque.pop();
        assert.deepEqual(deque.toArray(), []);
    });

    it('deque pop after pushing', () => {
        let deque = new Deque();
        deque.push(1);
        deque.push(2);
        deque.push(3);
        deque.pop();
        assert.deepEqual(deque.toArray(), [1, 2]);

        deque.pop();
        assert.deepEqual(deque.toArray(), [1]);

        deque.pop();
        deque.pop();
        assert.deepEqual(deque.toArray(), []);
    });

    it('deque shift after unshifting', () => {
        let deque = new Deque();
        deque.unshift(3);
        deque.unshift(2);
        deque.unshift(1);
        assert.equal(deque.shift(), 1);
        assert.deepEqual(deque.toArray(), [2, 3]);

        deque.shift();
        assert.deepEqual(deque.toArray(), [3]);

        deque.shift();
        deque.shift();
        assert.deepEqual(deque.toArray(), []);
    });

    it('deque shift after pushing', () => {
        let deque = new Deque();
        deque.push(1);
        deque.push(2);
        deque.push(3);
        deque.shift();
        assert.deepEqual(deque.toArray(), [2, 3]);

        deque.shift();
        assert.deepEqual(deque.toArray(), [3]);

        assert.deepEqual(deque.shift(), 3);
        assert.deepEqual(deque.shift(), null);
        assert.deepEqual(deque.toArray(), []);
    });

    it('deque mixing commands', () => {
        let deque = new Deque();
        deque.push(1);
        deque.unshift(2);
        deque.push(3);
        assert.deepEqual(deque.toArray(), [2, 1, 3]);

        deque.shift();
        assert.deepEqual(deque.toArray(), [1, 3]);

        deque.unshift(10);
        assert.deepEqual(deque.toArray(), [10, 1, 3]);

        assert.deepEqual(deque.pop(), 3);
        assert.deepEqual(deque.toArray(), [10, 1]);
    });

    it('deque increase size when pushing & unshifting over limit', () => {
        let deque = new Deque(3);
        deque.push(1);
        deque.push(2);
        deque.push(3);
        assert.equal(deque.bufferSize, 3);
        deque.push(4);
        assert.equal(deque.bufferSize, 6);
        assert.deepEqual(deque.toArray(), [1, 2, 3, 4]);

        deque.shift();
        assert.deepEqual(deque.toArray(), [2, 3, 4]);

        deque.unshift(10);
        deque.unshift(11);
        deque.unshift(12);
        deque.unshift(13);
        assert.deepEqual(deque.toArray(), [13, 12, 11, 10, 2, 3, 4]);
        assert.equal(deque.bufferSize, 12);
    });
});
