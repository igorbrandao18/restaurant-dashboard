# Restaurant Dashboard Project Overview

## Project Description
A Next.js dashboard application for restaurant management, allowing restaurants to manage their menus, orders, and profile information.

## Tech Stack
- **Framework**: Next.js 14.1.0
- **Language**: TypeScript
- **Styling**: 
  - Styled Components
  - TailwindCSS (currently having integration issues)
- **State Management**: React Hooks
- **API Integration**: Axios

## Core Features

### 1. Authentication
- Login system for restaurants
- Token-based authentication
- Protected routes
- Automatic redirection to login

### 2. Menu Management
- CRUD operations for menu items
- Menu categorization
- Price management
- Menu item details (name, description, price, category)

### 3. Order Management
- Order tracking system
- Order status management:
  - PENDING
  - PREPARING
  - READY
  - DELIVERED
  - CANCELLED
- Order filtering by status
- Order details with items and total

### 4. Dashboard Overview
- Restaurant profile information
- Key statistics:
  - Total orders
  - Active menus
  - Pending orders
- Recent orders display

## Project Structure

### API Services
- `auth.service`: Authentication and token management
- `restaurant.service`: Restaurant profile management
- `menu.service`: Menu CRUD operations
- `order.service`: Order management and status updates

### Components
1. **Layout Components**:
   - Navbar with navigation links
   - Layout wrapper with theme provider
   - Container for consistent spacing

2. **UI Components**:
   - Button with multiple variants
   - Container for layout structure

### Data Types
- Restaurant
- Menu
- Order
- OrderItem
- Address
- OrderStatus (enum)

## Current Issues
1. Missing dependencies:
   - TailwindCSS configuration
   - Registry setup for styled-components

2. Build Errors:
   - Missing `@/lib/registry` module
   - Styled-components server component integration
   - Global CSS configuration

## Environment Configuration
- API URL configuration through environment variables
- Default API URL: http://localhost:3000

## Styling Theme
Comprehensive theme system with:
- Colors (primary, secondary, success, etc.)
- Spacing scales
- Typography settings
- Border radius values
- Breakpoints for responsive design
- Shadow configurations

## Security Features
- Token-based authentication
- Protected API routes
- Automatic token injection in requests
- Session management
- Automatic logout on token expiration

## Navigation Structure
- `/` - Root redirect to dashboard or login
- `/auth/login` - Login page
- `/dashboard` - Main dashboard
- `/dashboard/menus` - Menu management
- `/dashboard/orders` - Order management