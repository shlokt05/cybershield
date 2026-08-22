import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          {mode === 'login' ? 'Sign In to CyberShield' : 'Create Student Account'}
        </span>
      }
    >
      {mode === 'login' ? (
        <LoginForm onSuccess={onClose} switchToRegister={() => setMode('register')} />
      ) : (
        <RegisterForm onSuccess={onClose} switchToLogin={() => setMode('login')} />
      )}
    </Modal>
  );
};
