import LocalizedStrings from 'react-localization';
import en from '../locales/en.json';

const strings = new LocalizedStrings({
  en,
});

strings.fallback = true;

export default strings;
