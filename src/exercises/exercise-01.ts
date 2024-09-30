/**
 *
 * Criar uma função que retorne a quantidade de vogais da palavra passada
 *
 */

export function findVowels(text: string) {
  const regex = /[aeiouáéíóúâêôàü]/gi;

  return text.match(regex)?.length || 0;
}
