import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatIconButton,
  ]
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;
  @Input() searchValue: string;
  @Output() searchValueEmitter: EventEmitter<string> = new EventEmitter<string>()
  isExpanded = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: [this.searchValue, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });
    this.isExpanded = !!this.searchValue;
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.searchValueEmitter.emit(this.searchForm.get('query')?.value);
      this.isExpanded = true;
    }
    else {
      this.searchForm.markAllAsTouched();
    }
  }
}
