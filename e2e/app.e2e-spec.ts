import { Angular4ItemPage } from './app.po';

describe('angular4-item App', () => {
  let page: Angular4ItemPage;

  beforeEach(() => {
    page = new Angular4ItemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
