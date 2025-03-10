'use client';

import styled from 'styled-components';

type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
type GridJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type GridAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | true;

interface GridContainerProps {
  spacing?: GridSpacing;
  justifyContent?: GridJustify;
  alignItems?: GridAlign;
  direction?: GridDirection;
  wrap?: GridWrap;
}

interface GridItemProps {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
}

const getSpacing = (spacing: GridSpacing) => {
  return `${spacing * 8}px`;
};

const getItemSize = (size: GridSize) => {
  if (size === true) return '100%';
  if (size === 'auto') return 'auto';
  return `${(size / 12) * 100}%`;
};

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${props => props.theme.spacing(2)};
  padding-right: ${props => props.theme.spacing(2)};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 540px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 720px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 960px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    max-width: 1140px;
  }
`;

export const Row = styled.div<GridContainerProps>`
  display: flex;
  flex-wrap: ${props => props.wrap || 'wrap'};
  margin-left: ${props => props.spacing ? `-${getSpacing(props.spacing)}` : '0'};
  margin-right: ${props => props.spacing ? `-${getSpacing(props.spacing)}` : '0'};
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'stretch'};
`;

export const Col = styled.div<GridItemProps>`
  padding-left: ${props => props.theme.spacing(2)};
  padding-right: ${props => props.theme.spacing(2)};
  flex-grow: 0;
  
  ${props => props.xs && `
    flex-basis: ${getItemSize(props.xs)};
    max-width: ${getItemSize(props.xs)};
  `}
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    ${props => props.sm && `
      flex-basis: ${getItemSize(props.sm)};
      max-width: ${getItemSize(props.sm)};
    `}
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    ${props => props.md && `
      flex-basis: ${getItemSize(props.md)};
      max-width: ${getItemSize(props.md)};
    `}
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    ${props => props.lg && `
      flex-basis: ${getItemSize(props.lg)};
      max-width: ${getItemSize(props.lg)};
    `}
  }
  
  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    ${props => props.xl && `
      flex-basis: ${getItemSize(props.xl)};
      max-width: ${getItemSize(props.xl)};
    `}
  }
`;

export const Flex = styled.div<{
  direction?: GridDirection;
  justify?: GridJustify;
  align?: GridAlign;
  wrap?: GridWrap;
  gap?: number;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  gap: ${props => props.gap ? props.theme.spacing(props.gap) : '0'};
`; 