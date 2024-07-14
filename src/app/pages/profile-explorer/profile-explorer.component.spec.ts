import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExplorerComponent } from './profile-explorer.component';

describe('ProfileExplorerComponent', () => {
  let component: ProfileExplorerComponent;
  let fixture: ComponentFixture<ProfileExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileExplorerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
