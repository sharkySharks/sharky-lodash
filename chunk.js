const chunk = (array, size=1) => {
    const result = [];
    // parameter validation
    if (!Array.isArray(array)) {
        throw new TypeError('A valid array needs to be the first argument.')
    }
    if (size < 1 || !Number.isInteger(size) ) {
        throw new Error('The size parameter should be an integer greater than 0 and less than the length of the array.')
    }
    for (let i = 0, len = array.length; i < len; i+=size) {
        if (len < size) return result
        result.push(array.slice(i,i+size))
    }
    return result;
}

module.exports = chunk;
