import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ACTIVE_THEME } from './features/shared/themes/active-theme';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'wedding-invitation-tmp' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('wedding-invitation-tmp');
  });

  it('should apply the active theme to the document root', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(document.documentElement.style.getPropertyValue('--theme-primary')).toBe(ACTIVE_THEME.palette.primary);
    expect(document.documentElement.dataset['theme']).toBe(ACTIVE_THEME.name);
  });
});
