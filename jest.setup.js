import '@testing-library/jest-dom';
import React from 'react';

// Mock do next/navigation
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '',
}));

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub';
  },
}));

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock completo do styled-components
const createStyledComponent = (tag) => {
  const component = (props) => {
    const { children, ...rest } = props;
    return React.createElement(tag, rest, children);
  };
  component.attrs = (attrs) => createStyledComponent(tag);
  component.withConfig = () => component;
  return component;
};

const styled = new Proxy({}, {
  get: (target, property) => {
    if (property === 'default') return styled;
    return createStyledComponent(property);
  }
});

jest.mock('styled-components', () => ({
  __esModule: true,
  default: styled,
  createGlobalStyle: () => () => null,
  css: () => [],
  keyframes: () => '',
  ThemeProvider: ({ children }) => children,
})); 