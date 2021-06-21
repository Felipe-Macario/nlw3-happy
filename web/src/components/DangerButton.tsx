import React, { ButtonHTMLAttributes } from 'react';

import '../styles/components/danger-button.css';

interface DangerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function DangerButton({ children, ...props }: DangerButtonProps) {
  return (
    <button className="danger-button" {...props}>
      {children}
    </button>
  );
}