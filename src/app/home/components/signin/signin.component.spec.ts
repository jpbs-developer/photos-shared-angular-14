import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    fixture.detectChanges();
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('#login-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toEqual('Login');
    expect(button.getAttribute('type')).toEqual('submit');
  });

  it('should display loginButton', () => {
    fixture.detectChanges();
    const loginFormGroup = component.loginForm.value;
    const loginFormValues = {
      email: '',
      password: '',
    };
    expect(loginFormGroup).toEqual(loginFormValues);
  });

  it('check formControl validations for input email', () => {
    fixture.detectChanges();
    const loginFormGroup: FormGroup = component.loginForm;
    const emailControl = loginFormGroup.get('email');
    const inputEmail: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-ps="input-email"]'
    );

    expect(emailControl?.value).toEqual(inputEmail.value);
    expect(emailControl?.errors).not.toBeNull();
    expect(emailControl?.hasError('required')).toBeTruthy();
  });

  it('check formControl validations for input password', () => {
    fixture.detectChanges();
    const loginFormGroup: FormGroup = component.loginForm;
    const emailControl = loginFormGroup.get('password');
    const inputEmail: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-ps="input-password"]'
    );

    expect(emailControl?.value).toEqual(inputEmail.value);
    expect(emailControl?.errors).not.toBeNull();
    expect(emailControl?.hasError('required')).toBeTruthy();
  });

  it('check loginFormGroup when validatiors are fufilled ', (done) => {
    fixture.detectChanges();

    const inputEmailElement: HTMLInputElement =
      fixture.nativeElement.querySelector('[data-ps="input-email"]');

    const inputPasswordElement: HTMLInputElement =
      fixture.nativeElement.querySelector('[data-ps="input-password"]');

    inputEmailElement.value = 'teste@teste.com';
    inputPasswordElement.value = '123456';

    inputEmailElement.dispatchEvent(new Event('input'));
    inputPasswordElement.dispatchEvent(new Event('input'));
  

    const isLoginFormValid = component.loginForm.valid;

    fixture.whenStable().then(() => {
      expect(isLoginFormValid).withContext('FormGroup is VALID').toBeTruthy();
      done()
    });
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
