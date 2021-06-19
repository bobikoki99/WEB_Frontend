import { route, template } from './router/router.js';

import { frontPage } from './views/frontPage.js';
import { creditPage } from './views/creditPage.js';

template('frontPage', frontPage);
template('creditPage', creditPage);

route('/', 'frontPage');
route('/credit', 'creditPage');
