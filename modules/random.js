module.exports = {
    randomHexColour : function() {
        const n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    },
    randomInt : function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};
