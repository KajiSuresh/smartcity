'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';  // Import icons for password visibility toggle
import { useRouter } from 'next/navigation'; // For navigation to dashboard

// Define Props Type
interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const router = useRouter(); // Hook for navigating to the dashboard

  const handleSubmit = async () => {
    setError(null); // Reset previous errors

    // Check credentials (you can replace this with actual API call)
    if (email === 'admin@gmail.com' && password === 'admin') {
      // If credentials match admin, redirect to dashboard
      console.log('Login successful');
      router.push('/dashboard'); // Navigate to the dashboard
      onClose(); // Close the dialog
    } else {
      try {
        // If not admin, validate using an API endpoint (replace with actual backend API)
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // If credentials are correct (but not admin), close the modal
          console.log('Login successful for a regular user');
          onClose(); // Close the dialog
        } else {
          const errorMessage = await response.text();
          setError(errorMessage); // Set error message if credentials are incorrect
        }
      } catch (err) {
        setError('An error occurred. Please try again later.');
        console.error(err);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Log In</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-6">Welcome Back to SmartCity</h2>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2"
          />

          <div className="relative mb-6">
            <Input
              type={passwordVisible ? 'text' : 'password'}  // Toggle between text and password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}  // Toggle password visibility
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}  {/* Show eye icon */}
            </button>
          </div>

          <Button
            className="w-full bg-[#FF385C] hover:bg-[#FF385C]/90 text-white"
            onClick={handleSubmit}
          >
            Log In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
