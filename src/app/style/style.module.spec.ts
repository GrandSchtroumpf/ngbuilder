import { StyleModule } from './style.module';

describe('StyleModule', () => {
  let styleModule: StyleModule;

  beforeEach(() => {
    styleModule = new StyleModule();
  });

  it('should create an instance', () => {
    expect(styleModule).toBeTruthy();
  });
});
