import 'normalize.css';
import './styles/main.scss';
import './components/button/button.scss';
import './components/form/form.scss';

import { initI18n } from './i18n';
import { initCitySwitcher } from './components/city-switcher/city-switcher';
import { initLangSwitcher } from './components/lang-switcher/lang-switcher';

import { initHeader } from './sections/header/header';
import './sections/advantages/advantages';
import './sections/services/services';
import './sections/request/request';
import './sections/equipment/equipment';
import { initLeadForms } from './components/lead-form/lead-form';
import { initGallery } from './sections/gallery/gallery';
import { initPartners } from './sections/partners/partners';
import { initFaq } from './sections/faq/faq';
import { initQuiz } from './sections/quiz/quiz';
import { initHero } from './sections/hero/hero';

await initI18n();

initLangSwitcher();
initCitySwitcher();
initHeader();
initHero();
initQuiz();
initGallery();
initPartners();
initFaq();
initLeadForms();
