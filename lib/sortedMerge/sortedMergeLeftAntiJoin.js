var _ = require('lodash'),
    sortBy = _.sortBy,
    undef = require('../util/undefined');

/**
 * Sorted merge left semi join.  Returns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeLeftAntiJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
    var r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum);
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            r.unshift(aDatum);
            aVal = undef(aDatum = a.pop(), aAccessor);
        } else if (aVal < bVal) {
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            aVal = undef(aDatum = a.pop(), aAccessor);
        }
    }
    if (aDatum) {
        r.unshift(aDatum);
    }
    return a.concat(r);
};

module.exports = sortedMergeLeftAntiJoin;
