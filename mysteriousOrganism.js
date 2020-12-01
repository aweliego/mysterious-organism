/* Context: You’re part of a research team that has found a new mysterious organism at the bottom of the ocean near hydrothermal vents. Your team names the organism, Pila aequor (P. aequor), and finds that it is only comprised of 15 DNA bases. The small DNA samples and frequency at which it mutates due to the hydrothermal vents make P. aequor an interesting specimen to study. However, P. aequor cannot survive above sea level and locating P. aequor in the deep sea is difficult and expensive. Your job is to create objects that simulate the DNA of P. aequor for your research team to study. */

/*There are two helper functions: returnRandBase() and mockUpStrand().

DNA is comprised of four bases (Adenine, Thymine, Cytosine, and Guanine). When returnRandBase() is called, it will randomly select a base and return the base ('A','T','C', or 'G').

mockUpStrand() is used to generate an array containing 15 bases to represent a single DNA strand with 15 bases.

You’ll use these helper functions later to create your objects that represent P. aequor. */

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/* Since you need to create multiple objects, create a factory function pAequorFactory() that has two parameters:
- The first parameter is number (no two organisms should have the same number).
- The second parameter is an array of 15 DNA bases.
pAequorFactor() should return an object that contains the properties specimenNum and dna that correspond to the parameters provided. */

/* Your team wants you to simulate P. aequor‘s high rate of mutation (change in its DNA).
To simulate a mutation, in pAequorFactory()‘s returned object, add the method .mutate(). */

const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,

    // Randomly select a base in the object's dna and change the current base to a different base.
    mutate() {
      let randomBase = Math.floor(Math.random() * 15); //selects a random number that will be our random index
      let excludedBases = this.dna.filter(
        (base) => base === this.dna[randomBase]
      ); //returns an array of the bases that match the base found at the random index of the dna array
      let substituteBase = returnRandBase(); //selects a random base
      while (excludedBases.includes(substituteBase)) {
        substituteBase = returnRandBase(); //while the value selected for the substitute base can be found in the array of bases to exclude, keep on randomly picking one
      }
      this.dna.splice(randomBase, 1, substituteBase); //removes the randomly chosen current base from the dna array and replaces it with the substitute base
      return this.dna;
    },

    /* Your research team wants to be able to compare the DNA sequences of different P. aequor. You’ll have to add a new method (.compareDNA()) to the returned object of the factory function.

.compareDNA() has one parameter, another pAequor object.

The behavior of .compareDNA() is to compare the current pAequor‘s .dna with the passed in pAequor‘s .dna and compute how many bases are identical and in the same locations. .compareDNA() does not return anything, but prints a message that states the percentage of DNA the two objects have in common — use the .specimenNum to identify which pAequor objects are being compared.

*/
    // Compute the percentage of identical bases (same value and index) between the current object's DNA and a passed in object's DNA
    compareDNA(comparedObj) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        for (let j = 0; j < comparedObj.dna.length; j++) {
          if (this.dna[i] === comparedObj.dna[j] && i === j) {
            identicalBases++;
          }
        }
      }
      console.log(this.dna);
      console.log(comparedObj.dna);
      //console.log(identicalBases);
      let percentage = ((identicalBases / 15) * 100).toFixed(2);
      console.log(
        `Specimen ${this.specimenNum} and Specimen ${comparedObj.specimenNum} have ${percentage}% DNA in common.`
      );
    },

    /* P. aequor have a likelier chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.

In the returned object of pAequorFactory(), add another method .willLikelySurvive().

.willLikelySurvive() returns true if the object’s .dna array contains at least 60% 'C' or 'G' bases. Otherwise, .willLikelySurvive() returns false. */

    // Check if the object's dna contains at least 60% 'C' or 'G' bases, which means it has a likelier chance of survival
    willLikelySurvive() {
      let totalCGBases = this.dna.filter(
        (base) => base === 'C' || base === 'G'
      );
      //console.log(totalCGBases);
      let percentageCGBases = ((totalCGBases.length / 15) * 100).toFixed();
      //console.log(percentageCGBases);
      if (percentageCGBases >= 60) {
        return true;
      } else {
        return false;
      }
    },

    /* Create a .complementStrand() method to the factory function’s object that returns the complementary DNA strand. The rules are that 'A's match with 'T's and vice versa. Also, 'C's match with 'G's and vice versa */

    //Return the complementary DNA strand
    complementStrand() {
      console.log(this.dna);
      let complementaryStrand = this.dna.map((base) => {
        switch (base) {
          case 'A':
            return 'T';
          case 'T':
            return 'A';
          case 'C':
            return 'G';
          case 'G':
            return 'C';
        }
      });
      return complementaryStrand;
    },
  };
};

// Creates a function to generate a random specimen number
const returnRandSpecimen = () => Math.floor(Math.random() * 1000);

/* With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment. Store these instances in an array for your team to study later. */

// Returns an array of 30 instances of pAequor that can survive in their natural environment (if .willLikelySurvive() returns true for that instance)
const survivalObj = () => {
  let results = [];
  for (let i = 0; i < 30; i++) {
    let newObj = pAequorFactory(returnRandSpecimen(), mockUpStrand());
    while (!newObj.willLikelySurvive()) {
      newObj = pAequorFactory(returnRandSpecimen(), mockUpStrand());
    }
    results.push([newObj.specimenNum, newObj.dna, newObj.willLikelySurvive()]);
  }
  return results;
};

// TESTING
let pAequorTest = pAequorFactory(1, mockUpStrand());

//console.log(pAequorTest.dna);
//console.log(pAequorTest.mutate());
//console.log(pAequorTest.compareDNA(pAequorFactory(2, mockUpStrand())));
//console.log(pAequorTest.willLikelySurvive());
//console.log(survivalObj());
//console.log(pAequorTest.complementStrand());
