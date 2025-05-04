
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, AlertCircle, CheckCircle2, BarChart, Factory, Percent } from 'lucide-react';
import { WorkspaceCard } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from '@/components/FileUpload';

// Simulate file processing and column detection
const processFile = (file: File) => {
  // Simulate column detection - in a real app, we'd parse the CSV/Excel
  return {
    headers: [
      'item_date', 'purchase_date', 'order_reference', 
      'invoice_number', 'amount', 'emi'
    ],
    rowCount: Math.floor(Math.random() * 1000) + 200,
    detectFormat: file.name.endsWith('.csv') ? 'CSV' : 'Excel',
    sampleData: [
      { item_date: '2023-04-15', amount: '₹24,500', order_reference: 'ORD-12345' },
      { item_date: '2023-04-16', amount: '₹32,100', order_reference: 'ORD-12346' }
    ]
  };
};

// Mock data for workspace cards
const initialWorkspaces: WorkspaceCard[] = [
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
  // State variables
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [workspaces, setWorkspaces] = useState<WorkspaceCard[]>(initialWorkspaces);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [columnsDetected, setColumnsDetected] = useState<{file1: string[], file2: string[]}>({ file1: [], file2: [] });
  const [isAutoMatching, setIsAutoMatching] = useState(false);
  const [matchedFields, setMatchedFields] = useState<{field1: string, field2: string}[]>([]);
  const [brandLogo, setBrandLogo] = useState<string>('/placeholder.svg');
  const [modalPage, setModalPage] = useState<'initial' | 'mapping'>('initial');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Process uploaded files to detect columns
  useEffect(() => {
    if (file1 && file2) {
      // Process files to extract headers
      const file1Results = processFile(file1);
      const file2Results = processFile(file2);
      
      setColumnsDetected({
        file1: file1Results.headers,
        file2: file2Results.headers
      });
      
      // Auto-suggest some field matches based on similar column names
      const suggestedMatches = file1Results.headers
        .filter(header => file2Results.headers.includes(header))
        .map(header => ({ field1: header, field2: header }));
      
      setMatchedFields(suggestedMatches);
      setModalPage('mapping');
    }
  }, [file1, file2]);

  const handleCreateWorkspace = () => {
    if (!newWorkspaceName || !file1 || !file2) {
      toast({
        title: "Missing information",
        description: "Please provide a workspace name and upload both files",
        variant: "destructive",
      });
      return;
    }

    // Set processing state
    setIsProcessingFiles(true);
    
    // In a real app, you would send these files to your backend
    console.log('Creating workspace:', newWorkspaceName);
    console.log('File 1:', file1);
    console.log('File 2:', file2);
    console.log('Matched fields:', matchedFields);

    // Simulate processing delay
    toast({
      title: "Processing",
      description: "Analyzing files and creating workspace...",
    });

    // Simulate Intelligence Engine processing
    setTimeout(() => {
      setIsProcessingFiles(false);
      
      // Generate a random match percentage between 85-100
      const totalRecords = Math.floor(Math.random() * 1000) + 200;
      const matchPercentage = Math.random() * 15 + 85; // 85-100%
      const matchedRecords = Math.floor(totalRecords * (matchPercentage / 100));
      const pendingExceptions = totalRecords - matchedRecords;
      
      // Create new workspace
      const newWorkspace: WorkspaceCard = {
        id: crypto.randomUUID(),
        name: newWorkspaceName,
        description: `Reconciliation workspace for ${newWorkspaceName}`,
        lastUpdated: new Date().toISOString().split('T')[0],
        pendingExceptions: pendingExceptions,
        totalRecords: totalRecords,
        matchedRecords: matchedRecords,
        brand: {
          name: newWorkspaceName.split(' ')[0], // Use first word as brand name
          logo: brandLogo
        }
      };
      
      // Add to workspaces
      setWorkspaces([newWorkspace, ...workspaces]);
      
      // Reset form
      setIsCreatingWorkspace(false);
      setNewWorkspaceName('');
      setFile1(null);
      setFile2(null);
      setMatchedFields([]);
      setBrandLogo('/placeholder.svg');
      setModalPage('initial');
      
      toast({
        title: "Workspace created",
        description: `Successfully created "${newWorkspaceName}" workspace`,
      });
    }, 2500);
  };

  const handleAutoMatch = () => {
    if (!file1 || !file2) return;
    
    setIsAutoMatching(true);
    
    toast({
      title: "Auto-matching columns",
      description: "Intelligence Engine is analyzing and matching columns...",
    });
    
    // Simulate auto-matching process
    setTimeout(() => {
      // Create matched fields based on similar column names
      const automaticMatches = [
        { field1: 'item_date', field2: 'purchase_date' },
        { field1: 'order_reference', field2: 'order_reference' },
        { field1: 'amount', field2: 'amount' },
        { field1: 'emi', field2: 'emi' }
      ];
      
      setMatchedFields(automaticMatches);
      setIsAutoMatching(false);
      
      toast({
        title: "Auto-match complete",
        description: `Successfully matched ${automaticMatches.length} columns`,
      });
    }, 1500);
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
  const totalWorkspaces = workspaces.length;
  const avgMatchPercentage = Math.round(
    workspaces.reduce((sum, workspace) => sum + getMatchPercentage(workspace), 0) / workspaces.length
  );

  // Helper function to get dynamic logo URL from Clearbit (fallback to placeholder)
  const getBrandLogoUrl = (brandName: string) => {
    // Use Clearbit Logo API for demonstration, fallback to placeholder.svg if fetch fails
    return `https://logo.clearbit.com/${encodeURIComponent(brandName.replace(/\s+/g, '') + ".com")}`;
  };

  // Generate a random brand logo for new workspace
  useEffect(() => {
    if (newWorkspaceName) {
      const brandName = newWorkspaceName.split(' ')[0];
      // Try to get a logo from Clearbit
      const logoUrl = getBrandLogoUrl(brandName);
      setBrandLogo(logoUrl);
    }
  }, [newWorkspaceName]);

  const resetNewWorkspaceState = () => {
    setNewWorkspaceName('');
    setFile1(null);
    setFile2(null);
    setMatchedFields([]);
    setModalPage('initial');
  };

  const handleCloseModal = () => {
    setIsCreatingWorkspace(false);
    resetNewWorkspaceState();
  };

  return (
    <Layout>
      {/* Header section with search bar and create button */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">Manage and monitor your reconciliation workspaces</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchBar />
        <Dialog open={isCreatingWorkspace} onOpenChange={(open) => {
          setIsCreatingWorkspace(open);
          if (!open) resetNewWorkspaceState();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              <span>New Workspace</span>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="workspace-modal bg-[#1F1D2E] border-0 p-6 max-w-md">
            {modalPage === 'initial' ? (
              <>
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-xl">Create new reconciliation workspace</DialogTitle>
                  <DialogDescription>
                    Upload sample files to automatically configure the workspace
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="workspace-name">Workspace Name</Label>
                    <Input
                      id="workspace-name"
                      value={newWorkspaceName}
                      onChange={(e) => setNewWorkspaceName(e.target.value)}
                      placeholder="e.g., Samsung Brand EMI"
                      className="bg-black/30 border-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block mb-2">Source 1 File</Label>
                      <FileUpload
                        label="Source 1"
                        onFileChange={(file) => setFile1(file)}
                      />
                    </div>
                    <div>
                      <Label className="block mb-2">Source 2 File</Label>  
                      <FileUpload
                        label="Source 2"
                        onFileChange={(file) => setFile2(file)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" onClick={handleCloseModal}
                    className="hover:bg-white/10 border-white/20">
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      if (file1 && file2 && newWorkspaceName) {
                        setModalPage('mapping');
                      } else {
                        toast({
                          title: "Missing information",
                          description: "Please provide a workspace name and upload both files",
                          variant: "destructive",
                        });
                      }
                    }}
                    disabled={!newWorkspaceName || !file1 || !file2}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9]"
                  >
                    Next
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl">Detected Columns</DialogTitle>
                  <DialogDescription>
                    Review and confirm field mappings between your data sources
                  </DialogDescription>
                </DialogHeader>

                <div className="detected-columns">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xs uppercase text-white/70 mb-2">Source 1</h3>
                      <div className="column-list max-h-[120px] overflow-y-auto">
                        {columnsDetected.file1.map((column, idx) => (
                          <div key={`src1-${idx}`} className="column-item">
                            {column}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase text-white/70 mb-2">Source 2</h3>
                      <div className="column-list max-h-[120px] overflow-y-auto">
                        {columnsDetected.file2.map((column, idx) => (
                          <div key={`src2-${idx}`} className="column-item">
                            {column}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mapped fields section */}
                <div className="my-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Mapped Fields</h3>
                    <Button 
                      size="sm" 
                      onClick={handleAutoMatch}
                      disabled={isAutoMatching}
                      className="text-xs h-8 bg-[#7C3AED] hover:bg-[#6D28D9]"
                    >
                      Auto-Match
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-[180px] overflow-y-auto">
                    {matchedFields.map((match, idx) => (
                      <div key={`match-${idx}`} className="field-mapping">
                        <div className="text-sm">{match.field1}</div>
                        <div className="arrow">↔</div>
                        <div className="text-sm">{match.field2}</div>
                      </div>
                    ))}
                    
                    {matchedFields.length === 0 && (
                      <div className="text-center py-4 text-white/50 text-sm">
                        No fields mapped yet. Click "Auto-Match" to automatically map similar fields.
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <Button variant="outline" onClick={() => setModalPage('initial')}
                    className="hover:bg-white/10 border-white/20">
                    Back
                  </Button>
                  <Button 
                    onClick={handleCreateWorkspace} 
                    disabled={isProcessingFiles || matchedFields.length === 0}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9]"
                  >
                    {isProcessingFiles ? "Creating..." : "Create Workspace"}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
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

      {/* Workspace Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((workspace) => (
          <Card
            key={workspace.id}
            className="glass-card card-hover cursor-pointer"
            onClick={() => handleWorkspaceClick(workspace.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center overflow-hidden">
                  <img 
                    src={workspace.brand.logo || getBrandLogoUrl(workspace.brand.name)} 
                    alt={workspace.brand.name}
                    className="w-6 h-6"
                    onError={(e) => {
                      // Fallback to placeholder if logo fails to load
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
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
