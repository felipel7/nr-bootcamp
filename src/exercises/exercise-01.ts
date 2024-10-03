// 1- Criar uma função que retorne a quantidade de vogais da palavra passada

/**
 * countVowels
 *
 * Retorna a quantidade de vogais em um texto fornecido.
 *
 * @param text - A string onde as vogais serão contadas.
 * @returns O número de vogais no texto.
 *
 * @example
 * Retorna um número 2 para `Hello` e 0 para `Rhythm`
 *
 * ```ts
 * console.log(countVowels('Hello')); // 2
 * console.log(countVowels('Rhythm')); // 0
 * ```
 */
export function countVowels(text: string): number {
  const pattern = /[aeiouáéíóúâêôàüãẽõ]/gi;

  return text.match(pattern)?.length || 0;
}
