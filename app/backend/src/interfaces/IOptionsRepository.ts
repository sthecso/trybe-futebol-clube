import { ModelType } from 'sequelize';

interface IInclude {
  model?: ModelType;
  as?: string;
}

interface IOptionsRepository<U> {
  where?: U;
  include?: [] | IInclude[];
}

export default IOptionsRepository;
