
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface UserProfileProps {
  user: {
    id: string;
    username: string;
    createdAt: Date;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card className="glass-card border-purple/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <User className="h-5 w-5 text-purple" />
          Your Profile
        </CardTitle>
        <CardDescription>
          Account details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-purple/20 border-2 border-purple flex items-center justify-center animate-glow">
            <span className="text-xl font-bold text-white">
              {user.username.substring(0, 1).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Username</p>
          <p className="text-purple font-medium">{user.username}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Member Since</p>
          <p className="text-white">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
