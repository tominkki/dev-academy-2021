import axios from 'axios';
import { Names } from '../types';
import { parseResponseData } from '../utils';

const getNames = async () : Promise<Names> => {
  const { data: names } = await axios.get<Names>('https://raw.githubusercontent.com/solita/dev-academy-2021/main/names.json');

  return parseResponseData(names);
};

export default { getNames };
