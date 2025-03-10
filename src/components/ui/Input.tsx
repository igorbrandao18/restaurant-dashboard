'use client';

import styled, { css } from 'styled-components';
import { forwardRef } from 'react';

interface InputStyleProps {
  hasError?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  inputSize?: 'small' | 'medium' | 'large';
}

const InputWrapper = styled.div<{ isFullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: ${props => props.isFullWidth ? '100%' : 'auto'};
  margin-bottom: ${props => props.theme.spacing(2)};
`;

const Label = styled.label<{ hasError?: boolean }>`
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing(1)};
  color: ${props => props.hasError 
    ? props.theme.colors.error.main 
    : props.theme.colors.text.secondary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const StyledInput = styled.input<InputStyleProps>`
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: 1rem;
  line-height: 1.5;
  padding: ${props => {
    switch (props.inputSize) {
      case 'small':
        return `${props.theme.spacing(1)} ${props.theme.spacing(2)}`;
      case 'large':
        return `${props.theme.spacing(2)} ${props.theme.spacing(3)}`;
      default:
        return `${props.theme.spacing(1.5)} ${props.theme.spacing(2)}`;
    }
  }};
  border: 1px solid ${props => props.hasError 
    ? props.theme.colors.error.main 
    : props.theme.colors.background.dark};
  border-radius: ${props => props.theme.borderRadius.small};
  background-color: ${props => props.theme.colors.background.paper};
  color: ${props => props.theme.colors.text.primary};
  width: 100%;
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError 
      ? props.theme.colors.error.main 
      : props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${props => props.hasError 
      ? `${props.theme.colors.error.main}33` 
      : `${props.theme.colors.primary.main}33`};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.background.dark};
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
    opacity: 0.7;
  }
`;

const HelperText = styled.span<{ hasError?: boolean }>`
  font-size: 0.75rem;
  margin-top: ${props => props.theme.spacing(0.5)};
  color: ${props => props.hasError 
    ? props.theme.colors.error.main 
    : props.theme.colors.text.secondary};
`;

interface InputComponentProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Input = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ label, helperText, error, fullWidth, size = 'medium', ...props }, ref) => {
    return (
      <InputWrapper isFullWidth={fullWidth}>
        {label && <Label hasError={error}>{label}</Label>}
        <StyledInput 
          ref={ref}
          hasError={error}
          isFullWidth={fullWidth}
          isDisabled={props.disabled}
          inputSize={size}
          {...props}
        />
        {helperText && <HelperText hasError={error}>{helperText}</HelperText>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input; 