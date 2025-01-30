# Bosta Store - Frontend Technical Assessment

A modern React e-commerce application built with TypeScript, Redux Toolkit, and TailwindCSS. This project demonstrates component architecture, API integration, state management, and responsive design.

## Features

### Core Features
- ✅ **Product Listing Page**
  - Fetch and display products from Fake Store API
  - Sort by price (ascending/descending) and category
  - Pagination (10 products per page)
  - Loading states and error handling
  - Empty state handling

- ✅ **Product Details Page**
  - Display detailed product information
  - Add to cart functionality
  - Navigation back to product listing

- ✅ **Create Product Page**
  - Form to create new products
  - Field validation (required fields, positive price, valid URL)
  - Category dropdown fetched from API
  - Success/error handling

### Bonus Features
- ✅ **Shopping Cart**
  - Add products from listing or details page
  - Update quantities
  - Remove items
  - Total price calculation
  - Persistent cart (localStorage)

- ✅ **Authentication**
  - Login functionality
  - Protected routes (Create Product, Cart)
  - User name display in header
  - Persistent authentication (localStorage)
  - Logout functionality

## Tech Stack

- **Framework**: React 19 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: TailwindCSS v4
- **API Client**: Axios
- **Form Validation**: React Hook Form + Zod
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Bosta-Store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with header and navigation
│   ├── ProductCard.tsx # Product card component
│   ├── Loading.tsx     # Loading spinner
│   ├── ErrorMessage.tsx # Error display component
│   └── ProtectedRoute.tsx # Route protection wrapper
├── pages/              # Page components
│   ├── ProductListing.tsx
│   ├── ProductDetails.tsx
│   ├── CreateProduct.tsx
│   ├── Cart.tsx
│   └── Login.tsx
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup
│   ├── hooks.ts        # Typed Redux hooks
│   └── slices/         # Redux slices
│       ├── productsSlice.ts
│       ├── cartSlice.ts
│       └── authSlice.ts
├── services/           # API services
│   └── api.ts          # Axios API client
├── types/              # TypeScript type definitions
│   └── index.ts
└── lib/                # Utility functions
    └── utils.ts
```

## API Integration

This project uses the [Fake Store API](https://fakestoreapi.com/) for:
- Product data (`/products`)
- Product categories (`/products/categories`)
- Product creation (`POST /products`)
- Authentication (`POST /auth/login`)

## State Management

The application uses Redux Toolkit for state management with three main slices:

1. **Products Slice**: Manages product data, categories, sorting, filtering, and pagination
2. **Cart Slice**: Handles cart items, quantities, and total calculation
3. **Auth Slice**: Manages user authentication state

All slices persist relevant data to localStorage for better UX.

## Features in Detail

### Product Listing
- Displays products in a responsive grid
- Sorting options: Price (asc/desc), Category, None
- Category filtering
- Pagination with page numbers
- Loading and error states

### Product Details
- Full product information display
- Add to cart button (requires authentication)
- Responsive image display
- Navigation back to listing

### Create Product
- Form validation using Zod schema
- Real-time error messages
- Category selection from API
- Success notifications
- Redirects to product listing on success

### Shopping Cart
- View all cart items
- Update quantities with +/- buttons
- Remove items
- Calculate total price
- Empty cart state with call-to-action

### Authentication
- Simple login form
- Token-based authentication
- Protected routes for authenticated users
- User name display in header
- Logout functionality

## Responsive Design

The application is fully responsive and works seamlessly on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## Error Handling

- API error handling with user-friendly messages
- Form validation errors
- Loading states for async operations
- Empty states for no data scenarios

## Development Notes

- All components are written in TypeScript for type safety
- Redux Toolkit provides efficient state management
- TailwindCSS ensures consistent styling
- React Router handles client-side routing
- LocalStorage persistence for cart and auth state

## License

This project is part of a technical assessment for Bosta.
