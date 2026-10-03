import { HashMap } from "./hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Length:", test.length());
console.log("Capacity:", test.capacity);

console.log("Get apple:", test.get("apple"));
console.log("Has banana:", test.has("banana"));
console.log("Has mango:", test.has("mango"));

console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());

// This should trigger resize
test.set("moon", "silver");

console.log("After adding moon:");
console.log("Length:", test.length());
console.log("Capacity:", test.capacity);

console.log("Remove dog:", test.remove("dog"));
console.log("Has dog:", test.has("dog"));

console.log("Final entries:", test.entries());