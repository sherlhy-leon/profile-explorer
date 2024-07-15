import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfileExplorerComponent } from './profile-explorer.component';
import { RESPONSE_API_MOCK } from '../../../assets/mocks/response-api';
import { ProfileExplorerFacade } from './facade/profile-explorer.facade';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('ProfileExplorerComponent', () => {
  let component: ProfileExplorerComponent;
  let fixture: ComponentFixture<ProfileExplorerComponent>;
  let route;
  beforeEach(async () => {
    const activatedRouteMock =  jasmine.createSpyObj('ActivatedRoute', ['']);
    const profileExplorerFacadeSpy = jasmine.createSpyObj('ProfileExplorerFacade', 
    ['searchProfilesByLogin', 'getSearchValue'],
    {
      searchValue$: of('pep'),
      userResponse$: of(RESPONSE_API_MOCK),
      loading$: of(false),
      pageIndex$: of(1)
    });

    await TestBed.configureTestingModule({
    imports: [ProfileExplorerComponent],
      providers: [
        provideAnimations(),
        { provide: ProfileExplorerFacade, useValue: profileExplorerFacadeSpy }, 
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();

    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(ProfileExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
