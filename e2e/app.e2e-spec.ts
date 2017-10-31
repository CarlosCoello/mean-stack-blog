import { MeanStackBlogPage } from './app.po';

describe('mean-stack-blog App', () => {
  let page: MeanStackBlogPage;

  beforeEach(() => {
    page = new MeanStackBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
