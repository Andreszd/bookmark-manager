import { Group } from '../../models/group.model';
import { OmitGenData, OmitIds } from '../../types';

export type IUpdateGroupDto = OmitIds<OmitGenData<Group>>;
