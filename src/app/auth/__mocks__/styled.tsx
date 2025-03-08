import React from 'react';

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="page-container">{children}</div>
);

export const ImageSection = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="image-section">{children}</div>
);

export const ImageContent = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="image-content">{children}</div>
);

export const FormSection = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="form-section">{children}</div>
);

export const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="form-container">{children}</div>
);

export const Form = ({ children, onSubmit }: { children: React.ReactNode; onSubmit: (e: React.FormEvent) => void }) => (
  <form data-testid="login-form" onSubmit={onSubmit}>{children}</form>
);

export const FormGroup = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="form-group">{children}</div>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input ref={ref} {...props} />
));

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props}>{children}</button>
);

export const Error = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="error-message">{children}</div>
);

Input.displayName = 'Input'; 