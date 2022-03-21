import { WhereOptions } from 'sequelize';

import IInclude from './IInclude';

interface IOptionsRepository<T> {
  where?: WhereOptions<T>;
  include?: [] | IInclude[];
}

export default IOptionsRepository;
