import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, AlertCircle, CheckCircle2, BarChart, Factory, Percent } from 'lucide-react';
import { WorkspaceCard } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from '@/components/FileUpload';

// Mock data for workspace cards
const mockWorkspaces: WorkspaceCard[] = [
  {
    id: '1',
    name: 'Samsung Brand EMI Program',
    description: 'Daily reconciliation for Samsung Brand EMI transactions',
    lastUpdated: '2023-10-15',
    pendingExceptions: 5,
    totalRecords: 1250,
    matchedRecords: 1245,
    brand: {
      name: 'Samsung',
      logo: '/placeholder.svg'
    }
  },
  {
    id: '2',
    name: 'Godrej Appliances Recon',
    description: 'Payment reconciliation for Godrej appliance program',
    lastUpdated: '2023-10-14',
    pendingExceptions: 0,
    totalRecords: 832,
    matchedRecords: 832,
    brand: {
      name: 'Godrej',
      logo: '/placeholder.svg'
    }
  },
  {
    id: '3',
    name: 'HP India EMI',
    description: 'HP laptop and computer EMI program reconciliation',
    lastUpdated: '2023-10-12',
    pendingExceptions: 12,
    totalRecords: 428,
    matchedRecords: 416,
    brand: {
      name: 'HP',
      logo: '/placeholder.svg'
    }
  },
  {
    id: '4',
    name: 'Vivo Mobile Payments',
    description: 'Mobile payment reconciliation for Vivo partnership',
    lastUpdated: '2023-10-10',
    pendingExceptions: 3,
    totalRecords: 725,
    matchedRecords: 722,
    brand: {
      name: 'Vivo',
      logo: '/placeholder.svg'
    }
  },
];

const Dashboard = () => {
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateWorkspace = () => {
    if (!newWorkspaceName || !file1 || !file2) {
      toast({
        title: "Missing information",
        description: "Please provide a workspace name and upload both files",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send these files to your backend
    console.log('Creating workspace:', newWorkspaceName);
    console.log('File 1:', file1);
    console.log('File 2:', file2);

    // Simulate processing delay
    toast({
      title: "Processing",
      description: "Analyzing files and creating workspace...",
    });

    setTimeout(() => {
      setIsCreatingWorkspace(false);
      setNewWorkspaceName('');
      setFile1(null);
      setFile2(null);
      
      toast({
        title: "Workspace created",
        description: `Successfully created "${newWorkspaceName}" workspace`,
      });
      
      // In a real app, navigate to the new workspace
      // navigate(`/workspace/new-id`);
    }, 2000);
  };

  const handleWorkspaceClick = (workspaceId: string) => {
    // Navigate to specific workspace 
    navigate(`/workspace/${workspaceId}`);
  };

  const getMatchPercentage = (workspace: WorkspaceCard) => {
    return Math.round((workspace.matchedRecords / workspace.totalRecords) * 100);
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage === 100) return 'progress-success';
    if (percentage >= 95) return 'progress-warning';
    return 'progress-alert';
  };

  // Calculate total stats for KPI tiles
  const totalGMV = "₹143.8M";
  const totalWorkspaces = mockWorkspaces.length;
  const avgMatchPercentage = Math.round(
    mockWorkspaces.reduce((sum, workspace) => sum + getMatchPercentage(workspace), 0) / mockWorkspaces.length
  );

    // Helper function to get dynamic logo URL from Clearbit (fallback to placeholder)
    const getBrandLogoUrl = (brandName: string) => {
      // Use Clearbit Logo API for demonstration, fallback to placeholder.svg if fetch fails
      return `https://logo.clearbit.com/${encodeURIComponent(brandName.replace(/\s+/g, '') + ".com")}`;
    };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Reconciliation Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and monitor your reconciliation workspaces
          </p>
        </div>
        <Dialog open={isCreatingWorkspace} onOpenChange={setIsCreatingWorkspace}>
          <DialogTrigger asChild>
            <Button className="gradient-btn flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              <span>New Workspace</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-[410px] rounded-2xl glass-card border border-white/20" // less width, more rounding
            style={{
              minWidth: 0,
              boxShadow: "0 8px 32px 0 rgba(80,40,192,0.26), 0 1.5px 7.5px 0 #7e69ab22",
              background: "rgba(23, 22, 39, 0.96)"
            }}
          >
            <DialogHeader>
              <DialogTitle>Create new reconciliation workspace</DialogTitle>
              <DialogDescription>
                Upload sample files to automatically configure the workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input
                  id="workspace-name"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  placeholder="e.g., Samsung Brand EMI Reconciliation"
                  className="bg-black/30 border-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Source 1 File</Label>
                <FileUpload
                  label="Source 1"
                  onFileChange={(file) => setFile1(file)}
                />
              </div>

              <div className="space-y-2">
                <Label>Source 2 File</Label>
                <FileUpload
                  label="Source 2"
                  onFileChange={(file) => setFile2(file)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsCreatingWorkspace(false)}
                className="hover:bg-white/10 border-white/20">
                Cancel
              </Button>
              <Button onClick={handleCreateWorkspace} className="gradient-btn">
                Create Workspace
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="kpi-tile">
          <BarChart className="h-6 w-6 text-warning mb-2" />
          <div className="kpi-tile-value text-warning">{totalGMV}</div>
          <div className="kpi-tile-label">YTD GMV</div>
        </div>
        <div className="kpi-tile">
          <Factory className="h-6 w-6 text-cyan-blue mb-2" />
          <div className="kpi-tile-value text-cyan-blue">{totalWorkspaces}</div>
          <div className="kpi-tile-label">Workspaces</div>
        </div>
        <div className="kpi-tile">
          <Percent className="h-6 w-6 mb-2" 
            style={{ color: avgMatchPercentage === 100 ? '#10F17E' : avgMatchPercentage >= 95 ? '#F97316' : '#D946EF' }} 
          />
          <div className="kpi-tile-value" 
            style={{ color: avgMatchPercentage === 100 ? '#10F17E' : avgMatchPercentage >= 95 ? '#F97316' : '#D946EF' }}
          >{avgMatchPercentage}%</div>
          <div className="kpi-tile-label">Avg Match %</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockWorkspaces.map((workspace) => (
          <Card
            key={workspace.id}
            className="glass-card card-hover cursor-pointer"
            onClick={() => handleWorkspaceClick(workspace.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center overflow-hidden">
                  <img src={workspace.brand.logo} alt={workspace.brand.name} className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{workspace.brand.name}</CardTitle>
              </div>
              {workspace.pendingExceptions > 0 ? (
                <div className="flex items-center text-alert">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{workspace.pendingExceptions}</span>
                </div>
              ) : (
                <div className="flex items-center text-success">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{workspace.name}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {workspace.description}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="flex justify-between w-full text-xs text-muted-foreground">
                <div>Last updated: {workspace.lastUpdated}</div>
                <div className="font-medium">
                  <span 
                    className={getMatchPercentage(workspace) === 100 ? "text-success" : 
                      getMatchPercentage(workspace) >= 95 ? "text-warning" : "text-alert"}
                  >
                    {getMatchPercentage(workspace)}%
                  </span> matched
                </div>
              </div>
              {/* Progress bar */}
              <div className="progress-bar">
                <div 
                  className={`progress-value ${getProgressBarColor(getMatchPercentage(workspace))}`}
                  style={{width: `${getMatchPercentage(workspace)}%`}}
                ></div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
