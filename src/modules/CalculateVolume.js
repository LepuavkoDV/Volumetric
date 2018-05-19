/* eslint-disable */
/**
 * Calculate volume of roundwood
 * @param  {[array]} data [diameter, length, amount, deflectionFactor]
 * @return {[number]}
 */
export default function (data) {
    // validate data
    if (!data.diameter) {
        throw new Error('Calcualtions require diameter');
    }
    if (!data.length) {
        throw new Error('Calcualtions require length');
    }
    // fallback values for not required data
    if (!data.amount) {
        data.amount = 1;
    }
    if (!data.deflectionFactor) {
        data.deflectionFactor = 1;
    }
    // pi
    const pi = 3.1415;
    // calculate radius
    let radius = (data.diameter / 2) / 100;
    // r*r
    let r2 = Math.pow(radius, 2);
    // v = pi*(r*r)*h
    let vol = pi * r2 * data.length;
    // deflection factor from documentation i.e http://vsegost.com/Catalog/41/4110.shtml
    vol = vol * data.deflectionFactor;
    return vol * data.amount;
}