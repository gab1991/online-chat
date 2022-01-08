/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as Yup from 'yup';

import { validationRules } from 'shared/model/validation';

export const DispNameValidationSchema = Yup.object().shape({
	displayedName: validationRules.displayedName,
});
