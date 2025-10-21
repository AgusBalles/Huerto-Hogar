// src/atoms/Badge.jsx
import React from 'react';
import { Badge as BootstrapBadge } from 'react-bootstrap';

export default function Badge({ children, variant = 'organic' }) {
  return (
    <BootstrapBadge className="badge-organico">
      {children}
    </BootstrapBadge>
  );
}