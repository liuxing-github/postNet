/**
 * Created by liuxing on 7/28/16.
 */
for (let i = 0; i < temp_array.length; i++) {
    let exist = allBarcode.find(function (item) {
        return item === temp_array[i];
    });
    if (exist) {
        changedBarcode += (allBarcode.indexOf(exist));

    }
}
return changedBarcode;




let mergedZipCode = zipCode.concat(checkDigit).split("");
let barcode = "|";
for (let i = 0; i < mergedZipCode.length; i++) {
    let exist = allBarcode.find(function (item) {
        return allBarcode[parseInt(mergedZipCode[i])] === item;
    });
    if (exist) {
        barcode += allBarcode[parseInt(mergedZipCode[i])];
    }
}
//noinspection JSUnusedAssignment
return barcode += "|";