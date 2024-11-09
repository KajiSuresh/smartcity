import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Facebook, Mail } from 'lucide-react';

const LoginDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Log in or sign up</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-6">Welcome to SmartCity</h2>
          
          <Select defaultValue="LK">
            <SelectTrigger className="w-full mb-2">
              <SelectValue placeholder="Country/Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LK">Sri Lanka (+94)</SelectItem>
              <SelectItem value="US">United States (+1)</SelectItem>
              <SelectItem value="UK">United Kingdom (+44)</SelectItem>
              {/* Add more countries as needed */}
            </SelectContent>
          </Select>

          <div className="relative mb-6">
            <Input 
              type="tel" 
              placeholder="Phone number"
              className="w-full pl-12"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              +94
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-6">
            We will call or text you to confirm your number. Standard message and data rates apply. Privacy Policy
          </p>

          <Button className="w-full bg-[#FF385C] hover:bg-[#FF385C]/90 text-white">
            Continue
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full">
              <Facebook className="mr-2 h-4 w-4" />
              Continue with Facebook
            </Button>
            <Button variant="outline" className="w-full">
              <img src="/google.svg" alt="Google" className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              <img src="/apple.svg" alt="Apple" className="mr-2 h-4 w-4" />
              Continue with Apple
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Continue with email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;