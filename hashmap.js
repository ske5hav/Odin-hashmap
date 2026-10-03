class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.buckets = new Array(this.capacity);
    }

    // Convert key into a bucket index
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) %
                this.capacity;
        }

        return hashCode;
    }

    // Check whether bucket index is valid
    checkIndex(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    // Add or update key-value pair
    set(key, value) {
        const index = this.hash(key);
        this.checkIndex(index);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        // Check if key already exists
        for (let pair of this.buckets[index]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        // Add new key-value pair
        this.buckets[index].push([key, value]);

        // Grow if load factor is exceeded
        if (this.length() > this.capacity * this.loadFactor) {
            this.resize();
        }
    }

    // Get value associated with key
    get(key) {
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];

        if (!bucket) {
            return undefined;
        }

        for (let pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }

        return undefined;
    }

    // Check if key exists
    has(key) {
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }

        for (let pair of bucket) {
            if (pair[0] === key) {
                return true;
            }
        }

        return false;
    }

    // Remove key
    remove(key) {
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    // Return number of stored keys
    length() {
        let count = 0;

        for (let bucket of this.buckets) {
            if (bucket) {
                count += bucket.length;
            }
        }

        return count;
    }

    // Remove all entries
    clear() {
        this.buckets = new Array(this.capacity);
    }

    // Return all keys
    keys() {
        const keys = [];

        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    keys.push(pair[0]);
                }
            }
        }

        return keys;
    }

    // Return all values
    values() {
        const values = [];

        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    values.push(pair[1]);
                }
            }
        }

        return values;
    }

    // Return all key-value pairs
    entries() {
        const entries = [];

        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    entries.push([pair[0], pair[1]]);
                }
            }
        }

        return entries;
    }

    // Double capacity and re-hash all entries
    resize() {
        const oldEntries = this.entries();

        this.capacity *= 2;
        this.buckets = new Array(this.capacity);

        for (let [key, value] of oldEntries) {
            const index = this.hash(key);

            if (!this.buckets[index]) {
                this.buckets[index] = [];
            }

            this.buckets[index].push([key, value]);
        }
    }
}

export { HashMap };