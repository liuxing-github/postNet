"use strict";

const temp = require("../src/postNet.js");

describe("isLegalBarcode", function () {
    it("To determine whether there is an illegal character", function () {
        let barcode = '| 222:| |';
        let result = temp.isLegalBarcode(barcode);
        expect(result).toEqual(false);
    });
});

describe("isLegalFrame", function () {
    it("To judge whether the Frame is legal", function () {
        let barcode = '| :::|| |';
        let result = temp.isLegalFrame(barcode);
        expect(result).toEqual(true);
    });
});

describe("formatBarcode", function () {
    it("Remove Frame and neighbouring spaces", function () {
        let barcode = '| |||:: |';
        let result = temp.formatBarcode(barcode);
        expect(result).toEqual('|||::');
    });
});

describe("changeBarcode", function () {
    it(" Change barcode", function () {
        let formattedBarcode = ":::|| ::|:| ::||:";
        let allBarcode = [
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
        let result = temp.changeBarcode(formattedBarcode, allBarcode);
        expect(result).toEqual('123');
    });
});

describe("getCheckDigit", function () {
    it("Get check digit", function () {
        let changedBarcode = "957135";
        let result = temp.getCheckDigit(changedBarcode);
        expect(result).toEqual(5);
    });
});

describe("getZipCode", function () {
    it("Get zip code", function () {
        let changedBarcode = "957135";
        let checkDigit = 5;
        let result = temp.getZipCode(changedBarcode, checkDigit);
        expect(result).toEqual("95713");
    });
});

describe("changeBarcode", function () {
    it("should return zipCode from barcode", function () {
        let barcode = "| |:|:: :|:|: |:::| :::|| ::||: :|:|: |";
        let result = temp.changeToZipCode(barcode);
        expect(result).toEqual("95713");
    });
});

describe("isLegalZipCode", function () {
    it("To determine the legality of the zip code", function () {
        let zipCode = '21450-1234';
        let result = temp.isLegalZipCode(zipCode);
        expect(result).toEqual(true);
    });
});

describe("calculateCheckDigit", function () {
    it("Calculate check digit", function () {
        let zipCode = "45056-1234";
        let result = temp.calculateCheckDigit(zipCode);
        expect(result).toEqual(0);
    });
});

describe("getBarcode", function () {
    it("Get barcode", function () {
        let zipCode = "450561234";
        let checkDigit = 0;
        let allBarcode = [
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
        let result = temp.getBarcode(zipCode, checkDigit, allBarcode);
        expect(result).toEqual("|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|");
    });
});

describe("changeToBarcode", function () {
    it("should return barcode from zip code", function () {
        let zipBarcode = "450561234";
        let result = temp.changeToBarcode(zipBarcode);
        expect(result).toEqual("|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|");
    });
});
