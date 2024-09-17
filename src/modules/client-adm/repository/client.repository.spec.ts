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
    const clientProps = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "client@email.com",
      address: "Client 1 address",
    });

    const clientRepository = new ClientRepository();
    await clientRepository.add(clientProps);

    const clientDb = await ClientModel.findOne({
      where: { id: clientProps.id.id },
    });

    expect(clientDb).toBeDefined();
    expect(clientDb.name).toEqual(clientProps.name);
    expect(clientDb.email).toEqual(clientProps.email);
    expect(clientDb.address).toEqual(clientProps.address);
    expect(clientDb.createdAt).toStrictEqual(clientProps.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(clientProps.updatedAt);
  });

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client@email.com",
      address: "Client 1 address",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const clientRepository = new ClientRepository();
    const clientResult = await clientRepository.findById(client.id);

    expect(clientResult.id.id).toEqual(client.id);
    expect(clientResult.name).toEqual(client.name);
    expect(clientResult.email).toEqual(client.email);
    expect(clientResult.address).toEqual(client.address);
    expect(clientResult.createdAt).toEqual(client.createdAt);
    expect(clientResult.updatedAt).toEqual(client.updatedAt);
  });
});