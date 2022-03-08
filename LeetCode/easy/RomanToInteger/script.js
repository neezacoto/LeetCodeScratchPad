// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, 2 is written as II in Roman numeral, just two one's added together.
// 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right. However,
// the numeral for four is not IIII. Instead, the number four is written as IV. Because
// the one is before the five we subtract it making four. The same principle applies to
// the number nine, which is written as IX. There are six instances where subtraction is used:

// I can be placed before V (5) and X (10) to make 4 and 9. 
// X can be placed before L (50) and C (100) to make 40 and 90. 
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given a roman numeral, convert it to an integer.

 

// Example 1:

// Input: s = "III"
// Output: 3
// Explanation: III = 3.
// Example 2:

// Input: s = "LVIII"
// Output: 58
// Explanation: L = 50, V= 5, III = 3.
// Example 3:

// Input: s = "MCMXCIV"
// Output: 1994
// Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
 

// Constraints:

// 1 <= s.length <= 15
// s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
// It is guaranteed that s is a valid roman numeral in the range [1, 3999].

/**
 * Thinking:
 * So what it sounds like is that I want to check for one of the 6 cases
 * If I is leading check for V or X 
 * If X is leading check for L or C
 * If C is leading check for D or M
 * I should also be aware of how many digits, because I may need to restart that check
 * for every 10s place to account for something like 944 (CMXLIV)
 * if C is leading and M follows it must be three digits 000
 * 9 is down check the next 10s place we see XL this is now 40
 * check the next 10s place it is IV which is 4
 * 920
 * would be 
 * CM 9, must be 000, no, it shouldn't check like that, It should just check if the next character
 * is I,X,C then if it follows a subsequent trigger make the subtraction, otherwise add
// I can be placed before V (5) and X (10) to make 4 and 9. 
// X can be placed before L (50) and C (100) to make 40 and 90. 
// C can be placed before D (500) and M (1000) to make 400 and 900.
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
 */

const romanToInteger = (numeral) => {

    //maybe I want to make a translation object
    let romanNum = {
        I: 1, //special case
        V: 5,
        X: 10,//special case
        L: 50,
        C: 100,//special case
        D: 500,
        M: 1000,
        special: [this.I,this.X,this.C]
        
    }

    //this converts numerals into an array of numerals then swaps them out with their integer counterpart
    const intConvert = [...numeral].map((n) => romanNum[n])

    let translation = [];

    let prev;
    let same = 0;
    let wasSpecial = false;
    //I want to iterate over the numerals and check the numeral after
    for(let i = 0; i < intConvert.length; i++) {

        //short curcuit with i > 0
        //same would have to be at least 1 through the first pass
        //but I'm not account for special case
        //maybe I check for that as well
        // was false short curcuit
        if( (i > 0) && ((!wasSpecial) && (intConvert[i] !== prev)) ) {
            translation.push(same * prev)
            same = 0;
        }

        //check for case, with that wording it sounds like I want to do a switch case
        //however maybe not, maybe I just want to check to see if it's a special case
        //maybe I want to convert the numeral into numbers first within an array?
        //no that'd be complicated, maybe I don't have to do, actually I have to
        //end up doing addition anyways so, yeah (line 92)

        //now I can use my specialCase in romanNum
        //but I also want to check if is in fact a special case
        //so the roman numerals that need to follow are 5x or 10x the special case
        //now is there another way that I can check for these at once? 
        //They are both divisable by 5, so I could check for a modulo
        //instead of checking for both 5 & 10
        //I should short circuit with the length property~
        if(i < intConvert.length && 
          ((romanNum.special.includes(intConvert[i])) && (intConvert[i+1] % 5 === 0 )) ) {
            //maybe I want to take this conversion and push it to a new array (line 94)
            //now subtract this with the next entry then I want to add to i 
            //because we want to skip the next entry 
            translation.push(intConvert[i+1]-intConvert[i]);
            i++;
            wasSpecial = true;
        }

        //now that I have a special case done how will I do the others?
        //if it's 933 that would be that would be CMXXXIII
        //maybe I loop over until the number changes then multiply by how many times that
        //number showed up 
        //maybe I have a same counter and once there is a contridiction compile the number

        //so if that if didn't work that implies it's a regular number
        //therefore count this as previous to be checked and up the same counter
        else{
            wasSpecial = false;
            prev = intConvert[i];
            same++
        }

        return translation.join("");
    }
}

console.log(romanToInteger("IV"));
