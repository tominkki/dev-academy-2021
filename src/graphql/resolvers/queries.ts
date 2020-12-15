import { UserInputError } from 'apollo-server-express';
import getNames from '../../services/name-service';
import { graphqlArgs } from '../../types';

const totalAmount = async () : Promise<number> => {
  const nameList = await getNames();

  const totalAmount : number = nameList.reduce(
    (acc, name) => acc + name.amount
    , 0);

  return totalAmount;
};

const names = async (_ : void, args : graphqlArgs) : Promise<unknown> => {
  const nameList = await getNames();

  if (args.alphabetical) {
    const sorted = nameList.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );

    return sorted;
  }

  if (args.name) {
    const [ match ] = nameList.filter(obj => obj.name.toLowerCase() === String(args.name).toLowerCase()
    );

    if (!match) {
      throw new UserInputError('Could not find name.');
    }

    return match.amount;
  }

  const sorted = nameList.sort((a, b) => b.amount - a.amount
  );

  return sorted;
};

export {
  totalAmount,
  names
};
