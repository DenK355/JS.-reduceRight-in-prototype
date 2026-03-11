'use strict';

/**
 * Конструктор собственного массива
 * @param  {...any} items
 */
function MyArray(...items) {
    this.length = 0;

    for (let i = 0; i < items.length; i++) {
        this[this.length] = items[i];
        this.length++;
    }
}

/**
 * Собственная реализация reduceRight
 * @param {Function} callback
 * @param {*} [initialValue]
 * @returns {*}
 */
MyArray.prototype.reduceRight = function (callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback должен быть функцией');
    }

    if (this.length === 0 && arguments.length < 2) {
        throw new TypeError('Reduce of empty MyArray with no initial value');
    }

    let accumulator;
    let i = this.length - 1;

    if (arguments.length >= 2) {
        accumulator = initialValue;
    } else {
        accumulator = this[i];
        i--;
    }

    for (; i >= 0; i--) {
        if (i in this) {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }

    return accumulator;
};


const arr = new MyArray(1, 2, 3, 4);

const sum = arr.reduceRight(function (acc, value) {
    return acc + value;
}, 0);

console.log(sum); // 10