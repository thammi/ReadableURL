const adjectives = require('./words/adjectives.json');
const nouns = require('./words/nouns.json');

function pick(words) {
  const index = Math.floor(Math.random() * words.length)
  return words[index];
}

/**
 * Initializes the object.
 * @param {boolean} [capitalize=true] - If set to true, returns string in CamelCase.
 * @param {number} [wordCount=3] - The number of words to use in the URL.
 * @param {string} [seperator=''] - The word seperator.
 */
function readable(capitalize=true, wordCount=3, seperator='') {
  if (wordCount < 1) {
    throw new Error('Minimum value expected: 2');
  }

  this.capitalize = capitalize;
  this.wordCount = wordCount;
  this.seperator = seperator

  this.adjectives = [...adjectives];
  this.nouns = [...nouns];
}

/**
 * Converts each word in list to title case.
 * @param {string[]} wordsList - The array of words to be capitalized.
 * @returns {string[]} - The array with each word capitalized.
 */
readable.prototype.convertToTitleCase = function (wordsList) {
  for (var i = 0; i < wordsList.length; i++) {
    wordsList[i] = wordsList[i].charAt(0).toUpperCase() + wordsList[i].slice(1).toLowerCase();
  }
  return wordsList;
}

/**
 * Generates the string.
 * @returns {string} - The randomly generated string.
 */
readable.prototype.generate = function () {
  wordsList = [];

  const oddWordCount = this.wordCount % 2 == 1;

  for(let i = 0; i < this.wordCount; i++) {
    const isOdd = i % 2 == 1;
    const isAdjective = oddWordCount ? (i == 0 || isOdd) : !isOdd;
    const wordChoices = isAdjective ? this.adjectives : this.nouns;
    wordsList.push(pick(wordChoices));
  }
  
  if (this.capitalize) {
    wordsList = this.convertToTitleCase(wordsList);
  }

  return wordsList.join(this.seperator);
}

module.exports = readable;
