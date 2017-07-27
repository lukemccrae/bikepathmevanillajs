var array = [5, 5, 6, 7, 9, 0, 0]

function simplify(arr) {
    var sortedArr = arr.sort()
    var result = []
    for (var i = 0; i < arr.length; i++) {
        var number = sortedArr[i]
        console.log(number);
        for (var j = 0; j < result.length + 1; j++) {
            if (result[j] === number) {}
            result.push(number)
        }
    }
    return result
}

console.log(simplify(array));
