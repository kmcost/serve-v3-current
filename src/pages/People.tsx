import { Users } from "lucide-react";

export default function People() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">People</h1>
        <p className="text-muted-foreground">
          Manage and view your constituent database
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="bg-card rounded-lg border p-8 text-center">
        <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          People Management Coming Soon
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          This section will allow you to manage your constituent database, 
          track engagement, and analyze demographic data.
        </p>
      </div>
    </div>
  );
}