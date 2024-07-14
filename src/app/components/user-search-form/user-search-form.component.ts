import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrl: './user-search-form.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIcon,
    MatIconButton,
  ]
})
export class UserSearchFormComponent {
  searchForm: FormGroup;
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>()

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  onSubmit(): void {
    if(this.searchForm.valid){
      this.searchValue.emit(this.searchForm.get('query')?.value);
    }
  }
}
