export const changeDiacriticToStandard = stringTocheck => {
    return stringTocheck
        .toLowerCase()
        .split('')
        .reduce((sum, current) => {
            const regexp = /[ąćęłńóśźż]/gi;
            const isDiacritic = current.match(regexp);
            if (isDiacritic) {
                let unicodeIndex = current.charCodeAt(current);
                if (unicodeIndex === 261) {
                    current = String.fromCharCode(97);
                }
                if (unicodeIndex === 263) {
                    current = String.fromCharCode(99);
                }
                if (unicodeIndex === 281) {
                    current = String.fromCharCode(101);
                }
                if (unicodeIndex === 322) {
                    current = String.fromCharCode(108);
                }
                if (unicodeIndex === 324) {
                    current = String.fromCharCode(110);
                }
                if (unicodeIndex === 243) {
                    current = String.fromCharCode(111);
                }
                if (unicodeIndex === 347) {
                    current = String.fromCharCode(115);
                }
                if (unicodeIndex === 378) {
                    current = String.fromCharCode(122);
                }
                if (unicodeIndex === 380) {
                    current = String.fromCharCode(122);
                }
            }
            return sum + current;
        }, '');
};