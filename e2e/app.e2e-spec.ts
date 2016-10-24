import { AnimationWorkshopPage } from './app.po';

describe('animation-workshop App', function() {
  let page: AnimationWorkshopPage;

  beforeEach(() => {
    page = new AnimationWorkshopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
