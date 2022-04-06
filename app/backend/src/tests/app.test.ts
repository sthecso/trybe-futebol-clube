import * as chai from 'chai';
import { App } from '../app';

const { expect } = chai;

describe('Testing app', () => {
  it('App is a class', () => {
    expect(new App()).to.be.an('object');
  });

  it('App has start method', () => {
    const app = new App();

    expect(app.start).to.be.a('function');
    expect(app.start(3000)).to.be.undefined;
  });

  it('The app has a config method', () => {
    const app = new App();

    expect(app['config']).to.be.a('function');
    expect(app['config']()).to.be.undefined;
  })

  it('The app has a routes method', () => {
    const app = new App();

    expect(app['routes']).to.be.a('function');
  })
});