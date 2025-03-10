'use client';

import styled from 'styled-components';

interface CardProps {
  elevation?: 'small' | 'medium' | 'large';
  padding?: boolean;
}

const Card = styled.div<CardProps>`
  background-color: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => {
    switch (props.elevation) {
      case 'small':
        return props.theme.shadows.small;
      case 'large':
        return props.theme.shadows.large;
      default:
        return props.theme.shadows.medium;
    }
  }};
  overflow: hidden;
  padding: ${props => props.padding ? props.theme.spacing(3) : '0'};
`;

export const CardHeader = styled.div`
  padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(3)};
  border-bottom: 1px solid ${props => props.theme.colors.background.dark};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize.h5};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
`;

export const CardContent = styled.div`
  padding: ${props => props.theme.spacing(3)};
`;

export const CardFooter = styled.div`
  padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(3)};
  border-top: 1px solid ${props => props.theme.colors.background.dark};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing(2)};
`;

export default Card; 