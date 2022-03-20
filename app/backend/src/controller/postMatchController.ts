import PostMatch from '../services/postMatchService';
import { IMatch } from '../interface/Match';

export default class ControllerMatchPost {
  public static async createMatch(data:IMatch) {
    return PostMatch.postMatch(data);
  }
}
