import 'reflect-metadata';
import { Container } from 'inversify';
import Application from './app/application.js';
import { applicationContainer } from './app/application.container.js';
import { Component } from './types/component.type.js';
import { productContainer } from './modules/product/product.container.js';
import { userContainer } from './modules/user/user.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  productContainer,
  userContainer
);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
