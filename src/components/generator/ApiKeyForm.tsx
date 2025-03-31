
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, KeyRound } from "lucide-react";

const ApiKeyForm = () => {
  const { user, updateApiKey } = useAuth();
  const [apiKey, setApiKey] = useState(user?.apiKey || "");
  const [isEditing, setIsEditing] = useState(!user?.apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateApiKey(apiKey);
    setIsEditing(false);
  };

  return (
    <Card className="glass-card border-purple/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <KeyRound className="h-5 w-5 text-purple" />
          Hugging Face API Key
        </CardTitle>
        <CardDescription>
          {user?.apiKey 
            ? "Your API key is securely stored for generating logos" 
            : "Add your Hugging Face API key to start generating logos"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="hf_..."
                className="font-mono bg-dark-lighter border-purple/30 focus:border-purple"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Your API key is stored locally and never sent to our servers
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="purple-gradient hover:opacity-90">
                Save API Key
              </Button>
              {user?.apiKey && (
                <Button
                  type="button"
                  variant="outline"
                  className="border-purple/30 text-white hover:bg-purple/10"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-dark-lighter rounded p-3 font-mono text-sm flex items-center justify-between">
              <span>{user?.apiKey?.substring(0, 8)}•••••••••••••••••••</span>
              <Button
                variant="ghost"
                className="h-auto p-1 hover:text-purple hover:bg-transparent"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyForm;
