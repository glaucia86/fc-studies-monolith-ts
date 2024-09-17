/**
 * file: src/modules/client-adm/facade/client-adm.facade.spec.ts
 * description: file responsible for the definition of the client admin facade.
 * data: 09/16/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client.model"
import ClientRepository from "../repository/client.repository"
import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import ClientAdmFacade from "./client-adm.facade";

describe('Client Adm Facade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a client", async () => {
    const clientRepository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const clientFacade = new ClientAdmFacade({
      addClientUseCase: addClientUseCase,
      findClientUseCase: undefined
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "email@email.com",
      address: "Client 1 address"
    }

    await clientFacade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });
});