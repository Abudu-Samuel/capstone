import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div>
    <h1 className="text-center">Page not found</h1>
    <p className="text-center">
      <Link to="/">Home</Link>
    </p>
  </div>
);

export default NotFoundPage;
