import { ModelType } from 'sequelize';

interface IInclude {
  model?: ModelType;
  as?: string;
}

export default IInclude;
