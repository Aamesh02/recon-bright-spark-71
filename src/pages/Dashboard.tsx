
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { WorkspaceCard } from '@/types';
import { useToast } from '@/components/ui/use-toast';

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
  const [isDraggingOver1, setIsDraggingOver1] = useState(false);
  const [isDraggingOver2, setIsDraggingOver2] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileNumber: 1 | 2
  ) => {
    if (e.target.files && e.target.files[0]) {
      if (fileNumber === 1) {
        setFile1(e.target.files[0]);
      } else {
        setFile2(e.target.files[0]);
      }
    }
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    fileNumber: 1 | 2
  ) => {
    e.preventDefault();
    if (fileNumber === 1) {
      setIsDraggingOver1(true);
    } else {
      setIsDraggingOver2(true);
    }
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement>,
    fileNumber: 1 | 2
  ) => {
    e.preventDefault();
    if (fileNumber === 1) {
      setIsDraggingOver1(false);
    } else {
      setIsDraggingOver2(false);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    fileNumber: 1 | 2
  ) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (fileNumber === 1) {
        setFile1(e.dataTransfer.files[0]);
        setIsDraggingOver1(false);
      } else {
        setFile2(e.dataTransfer.files[0]);
        setIsDraggingOver2(false);
      }
    }
  };

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

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reconciliation Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your reconciliation workspaces
          </p>
        </div>
        <Dialog open={isCreatingWorkspace} onOpenChange={setIsCreatingWorkspace}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              <span>New Workspace</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
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
                />
              </div>
              
              <div className="space-y-2">
                <Label>Source 1 File</Label>
                <div
                  className={`file-upload-area ${isDraggingOver1 ? 'active' : ''} ${file1 ? 'border-green-500 bg-green-50' : ''}`}
                  onDragOver={(e) => handleDragOver(e, 1)}
                  onDragLeave={(e) => handleDragLeave(e, 1)}
                  onDrop={(e) => handleDrop(e, 1)}
                >
                  {file1 ? (
                    <div className="flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
                      <span className="font-medium">{file1.name}</span>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        id="file-upload-1"
                        className="hidden"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => handleFileChange(e, 1)}
                      />
                      <label htmlFor="file-upload-1" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <PlusCircle className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Click to upload or drag & drop</p>
                          <p className="text-xs text-gray-500">Excel or CSV file</p>
                        </div>
                      </label>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Source 2 File</Label>
                <div
                  className={`file-upload-area ${isDraggingOver2 ? 'active' : ''} ${file2 ? 'border-green-500 bg-green-50' : ''}`}
                  onDragOver={(e) => handleDragOver(e, 2)}
                  onDragLeave={(e) => handleDragLeave(e, 2)}
                  onDrop={(e) => handleDrop(e, 2)}
                >
                  {file2 ? (
                    <div className="flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
                      <span className="font-medium">{file2.name}</span>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        id="file-upload-2"
                        className="hidden"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => handleFileChange(e, 2)}
                      />
                      <label htmlFor="file-upload-2" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <PlusCircle className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Click to upload or drag & drop</p>
                          <p className="text-xs text-gray-500">Excel or CSV file</p>
                        </div>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsCreatingWorkspace(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateWorkspace}>
                Create Workspace
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockWorkspaces.map((workspace) => (
          <Card 
            key={workspace.id} 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => handleWorkspaceClick(workspace.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img src={workspace.brand.logo} alt={workspace.brand.name} className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{workspace.brand.name}</CardTitle>
              </div>
              {workspace.pendingExceptions > 0 ? (
                <div className="flex items-center text-amber-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{workspace.pendingExceptions}</span>
                </div>
              ) : (
                <div className="flex items-center text-green-600">
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
            <CardFooter className="flex justify-between text-xs text-muted-foreground">
              <div>Last updated: {workspace.lastUpdated}</div>
              <div className="font-medium">
                <span className={workspace.pendingExceptions > 0 ? "text-amber-600" : "text-green-600"}>
                  {getMatchPercentage(workspace)}%
                </span> matched
              </div>
            </CardFooter>
            {/* Progress bar for matched records */}
            <div className="h-1 w-full bg-gray-200">
              <div 
                className={`h-full ${workspace.pendingExceptions > 0 ? "bg-amber-500" : "bg-green-500"}`}
                style={{width: `${getMatchPercentage(workspace)}%`}}
              ></div>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
