import * as Client from "expo-contacts";
import { ExpoContactRepository } from "./Repositories";
import { GetContactsUseCase, GetContactUseCase } from "./UseCases";

type Commands = {};

type Queries = {
  GetContact: GetContactUseCase;
  GetContacts: GetContactsUseCase;
};

type Module = Commands & Queries;

let modules: Module | undefined = undefined;

export function useContactsModule(): Module {
  if (modules !== undefined) {
    return modules;
  }

  const repository = new ExpoContactRepository(Client);

  modules = {
    GetContact: GetContactUseCase(repository),
    GetContacts: GetContactsUseCase(repository),
  };

  return modules;
}
