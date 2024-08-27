/**
 * file: src/modules/client-adm/gateway/client.gateway.ts
 * description: file responsible for the definition of the client gateway interface.
 * data: 08/27/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Client from "../domain/client.entity";

export default interface ClientGateway {
  add(client: Client): Promise<void>;
  findById(id: string): Promise<Client>;
}