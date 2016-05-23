import zone from 'zone';
import {bootstrap} from 'angular2/platform-browser-dynamic';
import {HTTP_PROVIDERS} from 'angular2/http';
import App from './app.component';

import {provide} from 'angular2/core';
import {XHRBackend} from 'angular2/http';
import {InMemoryBackendService, SEED_DATA} from 'angular2-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

console.log(provide, XHRBackend, InMemoryBackendService, SEED_DATA);

bootstrap(App, [
    HTTP_PROVIDERS,
    provide(XHRBackend, {useClass: InMemoryBackendService}),
    provide(SEED_DATA, {useClass: InMemoryDataService})
]);
