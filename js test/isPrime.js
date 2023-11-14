import { isPrime, random } from "./utils";

export function generatesPrimes(maximum) {
  const MAX_PRIME = 1000000;

  const primes = [];

  while (primes.length < maximum) {
    const candidate = random(MAX_PRIME);

    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }

  return primes;
}

generatesPrimes(10000);
