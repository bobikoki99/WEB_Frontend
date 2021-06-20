import { route, template } from './router/router.js';

import { frontPage } from './views/frontPage.js';
import { creditPage } from './views/creditPage.js';
import { sharedCreditsPage } from './views/sharedCreditsPage.js';

template('frontPage', frontPage);
template('creditPage', creditPage);
template('sharedCreditsPage', sharedCreditsPage);

route('/', 'frontPage');
route('/credit', 'creditPage');
route('/credit/shared', 'sharedCreditsPage');
