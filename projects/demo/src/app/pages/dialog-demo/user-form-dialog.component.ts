import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DIALOG_DATA, DIALOG_REF, DialogRef } from '@perfectui/dialog';

export interface UserFormData {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-form-dialog">
      <div class="dialog-header">
        <h2>{{ isEdit ? 'Edit User' : 'Create User' }}</h2>
        <button class="close-btn" (click)="cancel()">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="dialog-body">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" type="text" [(ngModel)]="formData.name" placeholder="Enter name" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" [(ngModel)]="formData.email" placeholder="Enter email" />
        </div>

        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" [(ngModel)]="formData.role">
            <option value="">Select role...</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      <div class="dialog-footer">
        <button class="btn btn-secondary" (click)="cancel()">Cancel</button>
        <button class="btn btn-primary" (click)="save()" [disabled]="!isValid">Save</button>
      </div>
    </div>
  `,
  styles: [`
    .user-form-dialog {
      width: 100%;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }

    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: #6b7280;
      border-radius: 6px;
      cursor: pointer;
    }

    .close-btn:hover {
      background: #f3f4f6;
      color: #111827;
    }

    .dialog-body {
      padding: 20px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group:last-child {
      margin-bottom: 0;
    }

    .form-group label {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 10px 14px;
      font-size: 15px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: #fff;
      color: #111827;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 16px 20px;
      border-top: 1px solid #e5e7eb;
    }

    .btn {
      padding: 10px 18px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
    }

    .btn-primary {
      background: #3b82f6;
      color: #fff;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-primary:disabled {
      background: #93c5fd;
      cursor: not-allowed;
    }
  `]
})
export class UserFormDialogComponent {
  private dialogRef = inject<DialogRef<UserFormData, UserFormData>>(DIALOG_REF);
  private data = inject<UserFormData>(DIALOG_DATA, { optional: true });

  formData: UserFormData = {
    name: this.data?.name || '',
    email: this.data?.email || '',
    role: this.data?.role || ''
  };

  get isEdit(): boolean {
    return !!(this.data?.name || this.data?.email);
  }

  get isValid(): boolean {
    return !!(this.formData.name && this.formData.email && this.formData.role);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.isValid) {
      this.dialogRef.close(this.formData);
    }
  }
}

