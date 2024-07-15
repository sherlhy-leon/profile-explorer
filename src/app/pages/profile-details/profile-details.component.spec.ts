import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProfileDetailsComponent } from './profile-details.component';
import { ProfileService } from '../../services/profile.service';
import { PROFILE_DETAILS_MOCK } from '../../../assets/mocks/profile-details';

describe('ProfileDetailsComponent', () => {
  let component: ProfileDetailsComponent;
  let fixture: ComponentFixture<ProfileDetailsComponent>;
  let profileService: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfileDetails']);
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [ProfileDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {snapshot: { paramMap: convertToParamMap({ userlogin: 'usuario123' }) } }},
        { provide: ProfileService, useValue: profileServiceSpy},
        { provide: Router, useValue: routeSpy}
      ]
    })
    .compileComponents();

    profileService = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    profileService.getProfileDetails.and.returnValue(of(PROFILE_DETAILS_MOCK));
    fixture = TestBed.createComponent(ProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
