
import console from 'node:console';

/*
 * Module 05: Async Mechanics
 *
 * Task 1: Resilient GCash Payment Gateway
 */

export async function retryGcashPayment(
  paymentFn,
  retries = 3,
  delayMs = 50
) {
  // TODO: Execute paymentFn with retry loop and delay

  let attempts = 0;

  while (true) {
    try {
      // Attempt the payment and wait for its result.
      const result = await paymentFn();

      // Return immediately if payment succeeds.
      return result;
    } catch (error) {
      // Stop if all retries have been used.
      if (attempts >= retries) {
        throw error;
      }

      attempts++;

      // Wait before making the next attempt.
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

/*
 * Module 05: Async Mechanics Tests
 */

export async function runAsyncTests() {
  let attempts = 0;

  const failingFn = async () => {
    attempts++;

    if (attempts < 3) {
      throw new Error('Network Timeout');
    }

    return 'SUCCESS';
  };

  const result = await retryGcashPayment(failingFn, 3, 10);

  console.assert(
    result === 'SUCCESS',
    'Payment eventually succeeds on attempt 3'
  );

  console.assert(
    attempts === 3,
    'Took 3 attempts to succeed'
  );

  console.log('  └─ Module 05 assertions passed.');
}
