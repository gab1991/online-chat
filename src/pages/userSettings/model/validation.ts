/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as Yup from 'yup';

import { validationRules } from 'shared/model/validation';

export const SettingsFormSchema = Yup.object().shape({
	displayedNameInput: validationRules.displayedName,
});
