const Lexical_analysis_Boiler = ``;
const  ICG_Boiler= ``;
const Triple_Boiler = ``;
const Quadruple_Boiler = ``;

export const boilerCodes = (languageId) => {
	switch (languageId) {
		case 1:
			return Lexical_analysis_Boiler;
		case 2:
			return ICG_Boiler;
		case 3:
			return Quadruple_Boiler;
		case 4:
			return Triple_Boiler;
		default:
			return '';
	}
};

