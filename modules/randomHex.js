module.exports = {
    randomHexNumber : function(length) {
        const hexNumbers = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        let output;
        for (let i = 0; i < length; i++) {
            output += Math.floor(Math.random() * hexNumbers.length);
        }
        return output;
    },
};
