import React from 'react';
import { User } from 'lucide-react';

interface UserIconProps {
  size?: number;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ 
  size = 24, 
  className = "" 
}) => {
  return (
    <div className={`rounded-full bg-gray-200 p-2 inline-flex items-center justify-center ${className}`}>
      <User 
        size={size} 
        className="text-gray-600"
      />
    </div>
  );
};

export default UserIcon;