import constants from './constants';
import { versionControlService } from '../../services';

export const getVersion = () => {
  return {
    type: constants.GET_VERSION,
    payload: versionControlService.get(),
  };
};
