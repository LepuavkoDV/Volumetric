/* eslint-disable */
module.exports = function(data) {
    const pi = 3.1415;
    let radius = (data.diameter / 2) / 100;
    let r2 = Math.pow(radius, 2);
    let vol = pi * r2 * data.length;
    if (data.deflectionFactor > 0) {
        vol = vol * data.deflectionFactor;
    }
    return vol * data.amount;
}