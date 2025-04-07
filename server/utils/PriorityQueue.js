class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    enqueue(value, priority) {
        const node = { value, priority };
        this.heap.push(node);
        this.heap.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.heap.shift();
    }
    peek() {
        return this.heap[0];
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}
module.exports = PriorityQueue;