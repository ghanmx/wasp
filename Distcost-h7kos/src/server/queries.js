import HttpError from '@wasp/core/HttpError.js'

export const createUser = async (args, context) => {
  const newUser = await context.entities.User.create({
    data: {
      username: args.username,
      password: args.password
    }
  });

  return newUser;
}

export const createVehicle = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { description, type, userId } = args;

  return context.entities.Vehicle.create({
    data: {
      description,
      type,
      userId
    }
  });
}

export const createRequest = async (args, context) => {
  const { mechanicalFault, location, destination, towType, userId, vehicleId } = args;

  let costPerKm, flagdownRate;

  switch (towType) {
    case 'A':
      costPerKm = 18.82;
      flagdownRate = 528.69;
      break;
    case 'B':
      costPerKm = 20.62;
      flagdownRate = 607.43;
      break;
    case 'C':
      costPerKm = 23.47;
      flagdownRate = 721.79;
      break;
    case 'D':
      costPerKm = 32.35;
      flagdownRate = 885.84;
      break;
    default:
      throw new Error('Invalid tow type');
  }

  const createdRequest = await context.entities.Request.create({
    data: {
      mechanicalFault,
      location,
      destination,
      towType,
      costPerKm,
      flagdownRate,
      userId,
      vehicleId
    }
  });

  return createdRequest;
}

export const updateRequest = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { id, mechanicalFault, location, destination, costPerKm, flagdownRate, towType } = args;

  const request = await context.entities.Request.findUnique({ where: { id } });

  if (!request) {
    throw new HttpError(404)
  };

  return context.entities.Request.update({
    where: { id },
    data: {
      mechanicalFault,
      location,
      destination,
      costPerKm,
      flagdownRate,
      towType
    }
  });
}

export const completeRequest = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { id } = args;

  const request = await context.entities.Request.findUnique({ where: { id } });

  const updatedRequest = await context.entities.Request.update({
    where: { id },
    data: { isCompleted: true }
  });

  return updatedRequest;
}