import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleCoupleComponent } from './title-couple.component';

describe('TitleCoupleComponent', () => {
  let fixture: ComponentFixture<TitleCoupleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCoupleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleCoupleComponent);
    fixture.detectChanges();
  });

  it('uses a theme-aware background for the couple separator', () => {
    const separator = fixture.nativeElement.querySelector('span') as HTMLElement;

    expect(separator.classList).toContain('text-couple-separator');
    expect(separator.classList).not.toContain('text-primary');
    expect(separator.classList).toContain('bg-primary-light');
    expect(separator.classList).not.toContain('bg-primary-soft');
    expect(separator.classList).not.toContain('bg-mint');
  });
});
