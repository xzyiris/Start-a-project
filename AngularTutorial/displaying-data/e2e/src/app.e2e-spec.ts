import { AppPage } from './app.po';
import {by, element} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let _heroNames = ['Mr.IQ', 'Magneta', 'Bombasto'];
  let _masterName = 'Master';
  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
     let parent = element.all(by.tagName('app-hero-parent')).get(0);
     let heroes = parent.all(by.tagName('app-hero-children')).get(0);

     for(let i = 0;i < _heroNames.length; i++){
       let childTitle = heroes.get(i).element(by.tagName('h3')).getText();
       let childDetail = heroes.get(i).element(by.tagName('p')).getText();
       expect(childTitle).toEqual(_heroNames[i] + 'says');
       expect(childDetail).toContain(_masterName);
     }
  });
});
