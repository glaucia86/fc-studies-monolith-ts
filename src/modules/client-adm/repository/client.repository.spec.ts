/**
 * file: src/modules/client-adm/repository/client.repository.spec.ts
 * description: file responsible for the implementation of the client repository tests.
 * data: 09/02/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";

describe('ClientRepository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  it('should create a client', async () => {
    const clientProps = {
      id: new Id("1"),
      name: "Client 1",
      email: "client@email.com",
      address: "Client 1 address",
    };

    const client = new Client(clientProps);
    const clientRepository = new ClientRepository();
    await clientRepository.add(client);

    const clientDb = await ClientModel.findOne({
      where: { id: clientProps.id.id },
    });


    expect(clientProps.id.id).toEqual(clientDb.id);
    expect(clientProps.name).toEqual(clientDb.name);
    expect(clientProps.email).toEqual(clientDb.email);
    expect(clientProps.address).toEqual(clientDb.address);
  });

  it('should find a client', async () => {
    const clientRepository = new ClientRepository();

    ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client@email.com",
      address: "Client 1 address",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const client = await clientRepository.findById("1");

    expect(client.id.id).toEqual("1");
    expect(client.name).toEqual("Client 1");
    expect(client.email).toEqual("client@email.com");
    expect(client.address).toEqual("Client 1 address");
  });
});