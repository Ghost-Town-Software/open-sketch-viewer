import {Injector} from '@angular/core';

let injector: Injector;

export const setInjector = (i: Injector) => {
  injector = i;
};

export const getService = (service) => {
  return injector.get(service);
};
