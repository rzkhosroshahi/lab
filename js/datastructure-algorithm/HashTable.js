class HashTable {
    constructor(size = 7) {
        this.dataMap = new Array(size);
    }

    _hash(key) {
        let hash = 0;

        for(let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
        }

        return hash;
    }
    set(key, value) {
        let index = this._hash(key);
        if(!this.dataMap[index]) {
            this.dataMap[index] = [];
        }
        this.dataMap[index].push([key, value]);
        return this;
    }

    get(key) {
        let index = this._hash(key);

        if (this.dataMap[index]) {
            for (let i = 0; i < this.dataMap[index].length; i++) {
                if (this.dataMap[index][i][0] === key) {
                    return this.dataMap[index][i][1];
                }
            }
        }
        return undefined;
    }
    keys() {
        let keys = [];
        for (let i = 0; i < this.dataMap.length; i++) {
            if (this.dataMap[i]) {
                for (let j = 0; j < this.dataMap[i].length; j++) {
                    keys.push(this.dataMap[i][j][0]);
                }
            }
        }
        return keys;
    }
    keysGroup() {
        let keys = [];
        for (let i = 0; i < this.dataMap.length; i++) {
            if (this.dataMap[i]) {
                // for (let j = 0; j < this.dataMap[i].length; j++) {
                //     keys.push(this.dataMap[i][j][0]);
                // }
                const groupKeys = this.dataMap[i].map(([key]) => key);
                keys.push(groupKeys);
            }
        }
        return keys;
    }
}
const hashTable = new HashTable();
hashTable.set('gholi', 222);
hashTable.set('fateme', 4444);
hashTable.get('fateme');
hashTable.keys();

function findDuplicates(array) {
    const hashTable = {};
    const duplicates = [];
    for (let i = 0; i < array.length; i++) {
        if (hashTable.hasOwnProperty(array[i])) {
            duplicates.push(array[i])
        }
        hashTable[array[i]] = true;
    }
    return duplicates;
}
// const test = findDuplicates([1, 2, 3, 4, 4, 5, 6, 6])
// console.log('test >>', test);
// function firstNonRepeatingChar(string) {
//     const hashTable = new Map();
//     for (let word of string) {
//         if (hashTable.has(word)) {
//             hashTable.delete(word);
//         } else {
//             hashTable.set(word, true);
//         }
//     }
//     if (hashTable.size) {
//         return hashTable.keys().toArray()[0];
//     } else {
//         return null;
//     }
// }
function firstNonRepeatingChar(str) {
    if (str.length === 0) {
        return null;
    }

    const charCount = {};

    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    for (let char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }

    return null;
}
const test1 = firstNonRepeatingChar('aabbcc') // null
const test2 = firstNonRepeatingChar('aabbcde') // c
console.log('test >>', test1);
console.log('test >>', test2);
console.log('test 3 >>');

function groupAnagrams(array) {
    const hashTable = new HashTable();

    for (let item of array) {
        hashTable.set(item, true);
    }
    return hashTable.groupKeys();
}

function twoSum(nums, target) {
    const numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;

        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(num, i);
    }

    return [];
}
twoSum([5,3,2, 5], 7)
function subarraySum(nums, target) {
    const sumIndex = new Map();
    //sumIndex.set(0, -1);
    let currentSum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];
        
        if (sumIndex.has(currentSum - target)) {
            return [sumIndex.get(currentSum - target) + 1, i];
        }
        sumIndex.set(currentSum, i);
    }
    
    return [];
}
subarraySum([2, 4, 6, 3], 10)
subarraySum([1, 2, 2, 6, 3], 10)

// ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] -> [ ['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat'] ]
// twoSum([], 10); // []
// twoSum([2, 7, 11, 15], 9) // [0, 1]
// twoSum([-1, 2, -3, 4], 1); // [0, 1]


function hasUniqueChars(string) {
    const charSet = new Set();

    for (const ch of string) {
        if (charSet.has(ch)) {
            return false;
        }
        charSet.add(ch);
    }

    return true;
}

function findPairs(array1, array2, target) {
    const arraySet1 = new Set(array1);
    const pairs = [];

    for (const num of array2) {
        const complement = target - num;
        debugger;
        if(arraySet1.has(complement)) {
            pairs.push([complement, num]);
        }
    }
    return pairs;
}


function longestConsecutiveSequence(nums) {

}

var nearestValidPoint = function(x, y, points) {
    const pointsSet = new Set();

    for (let i = 0; i <= points.length; i++) {
        const [pointX, pointY] = points[i];

        if (pointX - x >= 1 && pointX - x <= x) {
            if (pointY - y >= 1 && pointY - y <= y) {
                pointsSet.add(i);
            }
        }
    }
};

var digitCount = function(num) {
    const arr = Array(num.length).fill(0)
    for (let elem of num) {
        arr[elem]++
    }
    return arr.join('') == num
};
// 1202
// 86
// 
function lengthOfLongestSubstring(str) {
    const strSet = new Set();
    let index = 0;
    for (let i = 0; i <= str.length; i++) {
        if (strSet.has(str[i])) {
            index = i;
            debugger;
            return str.substr(0, index).length;
        } else {
            strSet.add(str[i]);
        }
    }
    return str.substr(0, index).length;
}

const test = lengthOfLongestSubstring
test('pwwkew')