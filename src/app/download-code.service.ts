import {Injectable} from '@angular/core';
import seedrandom from "seedrandom";
import 'firebase';

@Injectable()
export class DownloadCodeService {
    ValidCodes = [];
    seed;
    db;

    constructor() {
        this.seed = seedrandom('Spliss');
        this.db = firebase.database()
    }

    isCodeValid(code) {
        return this.db.ref('/' + code).once('value').then(snapshot => {
            if (!snapshot.val() || snapshot.val() < 1) {
                return false
            } else {
                // need to now update the value of the code to reflect a download
                return true;
            }
        })
    }

    oldIsCodeValid(title, code) {
        let titleCode = this.generateCodeFromTitle(title);
        if (code.slice(0, titleCode.length) === titleCode) {
            console.log(code.slice(titleCode.length, code.length))
            return this.ValidCodes.indexOf(code.slice(titleCode.length, code.length)) !== -1
        } else {
            return false;
        }
    }

    generateCodeFromTitle(title) {
        let titleArray = title.split('');
        // take the first three letters and last three letters
        let prefixLetters = titleArray.slice(0, 4);
        let suffixLetters = titleArray.slice(titleArray.length - 4, titleArray.length);
        let letterArray = [...suffixLetters, ...prefixLetters];
        let codeArray = letterArray.map(letter => {
            let num = letter.charCodeAt(0);
            return String.fromCharCode(num - 5);
        })
        let rotatedLetterArray = codeArray.filter((letter) => letter.match(/[a-z]/i))
        return rotatedLetterArray.join('')
    }

    generateCodes() {
        for (let i = 0; i < 500; i++) {
            this.ValidCodes.push(this.seed().toString(36).substring(9));
        }
    }

    getDownloadCodes() {
        return this.ValidCodes;
    }

}
