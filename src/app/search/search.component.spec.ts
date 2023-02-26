import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {

  class Page {
    get searchText() { return this.query<HTMLInputElement>('input'); }
    get submitButton() { return this.query<HTMLButtonElement>('button'); }
    private query<T>(selector: string): T {
      return fixture.nativeElement.querySelector(selector);
    }
  }

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let page: Page;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new Page();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the search Text', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = "Angular";
    input.dispatchEvent(new CustomEvent('input'));
    expect(component.searchText.value).toBe('Angular');
  });

  it('should disable search button', () => {
    component.searchText.setValue('');
    expect(page.submitButton.disabled).toBeTrue();
  });

  it('should log to the console', () => {
    const spy = spyOn(console, 'log');
    component.searchText.setValue('Angular');
    fixture.detectChanges();
    page.submitButton.click();
    expect(spy).toHaveBeenCalledWith('You searched for: Angular');
  });


});


