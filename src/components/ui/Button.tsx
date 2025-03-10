'use client';

import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${props => props.theme.colors.primary.main};
        color: ${props => props.theme.colors.primary.contrastText};
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${props => props.theme.colors.primary.dark};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${props => props.theme.colors.secondary.main};
        color: ${props => props.theme.colors.secondary.contrastText};
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${props => props.theme.colors.secondary.dark};
        }
      `;
    case 'outlined':
      return css`
        background-color: transparent;
        color: ${props => props.theme.colors.primary.main};
        border: 1px solid ${props => props.theme.colors.primary.main};
        
        &:hover:not(:disabled) {
          background-color: rgba(63, 81, 181, 0.04);
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${props => props.theme.colors.primary.main};
        border: none;
        
        &:hover:not(:disabled) {
          background-color: rgba(63, 81, 181, 0.04);
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(2)};
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: ${props => props.theme.spacing(1.5)} ${props => props.theme.spacing(3)};
        font-size: 1rem;
      `;
    case 'large':
      return css`
        padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(4)};
        font-size: 1.125rem;
      `;
    default:
      return '';
  }
};

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-family: ${props => props.theme.typography.fontFamily};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  transition: background-color ${props => props.theme.transitions.medium}, 
              box-shadow ${props => props.theme.transitions.medium}, 
              border-color ${props => props.theme.transitions.medium}, 
              color ${props => props.theme.transitions.medium};
  cursor: pointer;
  
  ${props => getVariantStyles(props.variant || 'primary')}
  ${props => getSizeStyles(props.size || 'medium')}
  
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  &:disabled {
    color: rgba(0, 0, 0, 0.26);
    background-color: rgba(0, 0, 0, 0.12);
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: none;
  }
  
  &:focus {
    outline: none;
  }
`;

export default Button; 