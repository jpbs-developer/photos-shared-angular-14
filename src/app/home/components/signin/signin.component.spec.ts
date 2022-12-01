import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from '../../home.module';

import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display two inputs', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toEqual(2);
  });

  it('should display loginButton', () => {
    fixture.detectChanges()
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('#login-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toEqual('Login');
    expect(button.getAttribute('type')).toEqual('submit');
  });

  it('should change type input password when clicked button', () => {
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-ps="input-password"]'
    );
    const iconButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('#visible-password');
    expect(input.getAttribute('type'))
      .withContext('Password type is password')
      .toBe('password');
    iconButton.click();
    fixture.detectChanges();
    expect(input.getAttribute('type'))
      .withContext('Password type is text')
      .toBe('text');
  });
});
