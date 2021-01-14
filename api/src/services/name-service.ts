import axios from 'axios';
import { NAMES_URI } from '../utils/config';
import { Name } from '../types';

export default async () : Promise<Name[]> => {
  return (await axios.get(NAMES_URI)).data.names;
};
