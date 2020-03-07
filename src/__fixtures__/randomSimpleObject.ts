import * as faker from 'faker';

export default {
  number: faker.random.number(),
  boolean: faker.random.boolean(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
};
