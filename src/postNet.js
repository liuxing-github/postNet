"use strict";

function isLegalBarcode(barcode) {
    let barcode_array = barcode.split("");
    return barcode_array.every(function (item) {
        return item === "|" || item === " " || item === ":";
    });

}

function isLegalFrame(barcode) {
    return barcode.startsWith("| ") && barcode.endsWith(" |");
}

function loadAllBarcode() {
    return [
        '||:::',
        ':::||',
        '::|:|',
        '::||:',
        ':|::|',
        ':|:|:',
        ':||::',
        '|:::|',
        '|::|:',
        '|:|::'
    ];
}

function formatBarcode(barcode) {
    return barcode.slice(2, barcode.length - 2);

}

function changeBarcode(formattedBarcode, allBarcode) {
    let temp_array = formattedBarcode.split(' ');
    let changedBarcode = temp_array.map(function (item) {
        return allBarcode.indexOf(item);
    });
    
    return changedBarcode.join("");
}

function getCheckDigit(changedBarcode) {
    let temp = changedBarcode.slice(0, changedBarcode.length).split("");
    let sum = temp.reduce(function (first, second) {
        return first + second;
    }, 0);

    return (10 - sum % 10) % 10;
}

function getZipCode(changedBarcode, checkDigit) {
    if (parseInt(changedBarcode[changedBarcode.length - 1]) !== checkDigit) {
        return false;
    }
    return changedBarcode.slice(0, changedBarcode.length - 1);
}
function changeToZipCode(barcode) {
    let resultOne = isLegalBarcode(barcode);
    let resultTwo = isLegalFrame(barcode);
    if (!(resultOne && resultTwo)) {
        return false;
    }
    let formattedBarcode = formatBarcode(barcode);
    let allBarcode = loadAllBarcode();
    let changedBarcode = changeBarcode(formattedBarcode, allBarcode);
    let checkDigit = getCheckDigit(changedBarcode);
    return getZipCode(changedBarcode, checkDigit);
}

function isLegalZipCode(zipCode) {
    let code1 = /^\d{5}$/;
    let code2 = /^\d{9}$/;
    let code3 = /^\d{5}[-]\d{4}$/;

    return (code1.test(zipCode) || code2.test(zipCode) || code3.test(zipCode));
}

function calculateCheckDigit(zipCode) {
    let code = /^\d{5}[-]\d{4}$/;
    let zip_code = code.test(zipCode) ? zipCode.replace("-", "") : zipCode;
    let temp = zip_code.split("");
    let sum = temp.reduce(function (first, second) {
        return parseInt(first) + parseInt(second);
    }, 0);

    return (10 - sum % 10) % 10;
}

function getBarcode(zipCode, checkDigit, allBarcode) {
    let mergedZipCode = zipCode.concat(checkDigit).split("");
    let temp = mergedZipCode.map(function (item) {
        return allBarcode[parseInt(item)];
    });

    return "|" + temp.join("") + "|";
}

function changeToBarcode(zipCode) {
    let result = isLegalZipCode(zipCode);
    let allBarcode = loadAllBarcode();
    if (!result) {
        return false;
    }
    let checkDigit = calculateCheckDigit(zipCode);

    return (getBarcode(zipCode, checkDigit, allBarcode));
}

module.exports = {
    isLegalBarcode, isLegalFrame, formatBarcode, changeBarcode, getCheckDigit, getZipCode, changeToZipCode,
    isLegalZipCode, calculateCheckDigit, getBarcode, changeToBarcode
};
