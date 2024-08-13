/**
 * file: src/modules/@shared/usecase/use-case.interface.ts
 * description: file responsible for the definition of the use case interface.
 * data: 08/13/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

export default interface UseCaseInterface {
  execute(input: any): Promise<any>;
}