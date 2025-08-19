import { z } from 'zod';

export interface FormValidationError {
  field: string;
  message: string;
  code: string;
}

export function announceFormError(message: string, fieldId?: string): void {
  // Create accessible error announcement
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'assertive');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Focus on the problematic field if specified
  if (fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.focus();
      field.setAttribute('aria-invalid', 'true');
    }
  }
  
  // Remove announcement after screen readers have processed it
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}

export function clearFormErrors(formId: string): void {
  const form = document.getElementById(formId);
  if (!form) return;
  
  // Remove all error states
  const invalidFields = form.querySelectorAll('[aria-invalid="true"]');
  invalidFields.forEach(field => {
    field.setAttribute('aria-invalid', 'false');
  });
  
  // Remove error messages
  const errorMessages = form.querySelectorAll('[role="alert"]');
  errorMessages.forEach(error => {
    error.remove();
  });
}

export function displayFieldError(fieldId: string, message: string): void {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  // Set field as invalid
  field.setAttribute('aria-invalid', 'true');
  
  // Create or update error message
  const errorId = `${fieldId}-error`;
  let errorElement = document.getElementById(errorId);
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = errorId;
    errorElement.setAttribute('role', 'alert');
    errorElement.className = 'text-sm text-red-600 mt-1';
    field.parentNode?.insertBefore(errorElement, field.nextSibling);
  }
  
  errorElement.textContent = message;
  
  // Associate error with field
  field.setAttribute('aria-describedby', errorId);
}

export function validateAccessibleForm(
  formData: Record<string, any>,
  schema: z.ZodSchema,
  formId: string
): { success: boolean; errors: FormValidationError[] } {
  try {
    schema.parse(formData);
    clearFormErrors(formId);
    return { success: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: FormValidationError[] = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code
      }));
      
      // Display errors accessibly
      errors.forEach(err => {
        displayFieldError(err.field, err.message);
      });
      
      // Announce general error
      announceFormError(
        `Form contains ${errors.length} error${errors.length > 1 ? 's' : ''}. Please check the highlighted fields.`,
        errors[0].field
      );
      
      return { success: false, errors };
    }
    
    return { success: false, errors: [{ field: 'general', message: 'Form validation failed', code: 'unknown' }] };
  }
}

export function enhanceFormAccessibility(formId: string): void {
  const form = document.getElementById(formId);
  if (!form) return;
  
  // Add required field indicators
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    field.setAttribute('aria-required', 'true');
    
    // Add visual required indicator
    const label = form.querySelector(`label[for="${field.id}"]`);
    if (label && !label.querySelector('.required-indicator')) {
      const indicator = document.createElement('span');
      indicator.className = 'required-indicator text-red-500 ml-1';
      indicator.textContent = '*';
      indicator.setAttribute('aria-hidden', 'true');
      label.appendChild(indicator);
    }
  });
  
  // Enhance submit button
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.addEventListener('click', (e) => {
      const invalidFields = form.querySelectorAll('[aria-invalid="true"]');
      if (invalidFields.length > 0) {
        e.preventDefault();
        announceFormError('Please fix the errors in the form before submitting.');
      }
    });
  }
  
  // Add form validation on blur
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      // Clear previous error state
      input.setAttribute('aria-invalid', 'false');
      
      // Remove associated error message
      const errorId = `${input.id}-error`;
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.remove();
      }
    });
  });
}