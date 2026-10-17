
import console from 'node:console';

/*
 * Module 04: Advanced Functions
 *
 * Task 1: Pure Function Memoizer
 */

export function memoize(fn) {
  // TODO: Cache evaluation results in a local object closure

  const cache = new Map();

  return function (...args) {
    // Convert the arguments into a cache key.
    const key = JSON.stringify(args);

    // Return the saved result if this key already exists.
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Execute the original function and save its result.
    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

/*
 * Task 2: Jeepney Fare Matrix Calculator
 */

export function createJeepneyFareCalculator(
  baseFare = 13,
  discountRate = 0.20
) {
  // TODO: Return closure (distanceKm, isStudentOrSenior)
  // calculating fare

  return function (distanceKm, isStudentOrSenior) {
    // Base fare covers up to 4 kilometers.
    const extraDistance = Math.max(0, distanceKm - 4);

    // Add ₱1.75 for every kilometer beyond 4 km.
    let total = baseFare + extraDistance * 1.75;

    // Apply the discount for students or senior citizens.
    if (isStudentOrSenior === true) {
      total *= (1 - discountRate);
    }

    // Return a Number rounded to 2 decimal places.
    return Number(total.toFixed(2));
  };
}

/*
 * Module 04: Advanced Functions Tests
 */

export function runAdvancedFunctionsTests() {
  let execCount = 0;

  const calc = memoize((a, b) => {
    execCount++;
    return a + b;
  });

  calc(2, 3);
  calc(2, 3);

  console.assert(
    execCount === 1,
    'Memoized function executed only once for same arguments'
  );

  const fareCalc = createJeepneyFareCalculator(13, 0.20);

  console.assert(
    fareCalc(2, false) === 13.00,
    '2km trip regular fare is base fare 13'
  );

  console.assert(
    fareCalc(6, false) === 16.50,
    '6km trip regular fare is 13 + (2 * 1.75) = 16.50'
  );

  console.assert(
    fareCalc(6, true) === 13.20,
    '6km trip senior fare is 16.50 * 0.8 = 13.20'
  );

  console.log('  └─ Module 04 assertions passed.');
}
