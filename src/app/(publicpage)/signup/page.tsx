'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';  // Import icons for password visibility toggle

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupDialog: React.FC<SignupDialogProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const handleSubmit = async () => {
    // Reset previous messages
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Basic validation checks
    if (!username || !email || !phone || !password) {
      setLoading(false);
      setError('All fields are required.');
      alert('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phone, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.message || 'Failed to register. Please try again.');
        alert(errorResponse.message || 'Failed to register. Please try again.');
        throw new Error(errorResponse.message || 'Failed to register.');
      }

      const data = await response.json();  // This is the data being fetched
      setSuccess('User registered successfully!');
      alert('User registered successfully!');
      
      console.log('Registered User Data:', data);  // Log the data to see the result

      // Reset fields and close dialog
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      alert(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Sign Up</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h2 className="text-center text-xl font-semibold mb-6 text-gray-700">
            Welcome to SmartCity
          </h2>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}

          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4"
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4"
          />

          <Input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-4"
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
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#FF385C]'} hover:bg-[#FF385C]/90 text-white`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
