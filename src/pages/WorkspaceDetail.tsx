
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PlusCircle, 
  Download, 
  Upload, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { ReconciliationRecord } from '@/types';
import { useToast } from '@/components/ui/use-toast';

// Mock data for reconciliation records
const mockReconciliations: ReconciliationRecord[] = [
  {
    id: '1',
    date: '2023-10-15',
    status: 'exception',
    totalRecords: 450,
    matchedRecords: 445,
    exceptionRecords: 5
  },
  {
    id: '2',
    date: '2023-10-14',
    status: 'complete',
    totalRecords: 423,
    matchedRecords: 423,
    exceptionRecords: 0
  },
  {
    id: '3',
    date: '2023-10-13',
    status: 'complete',
    totalRecords: 435,
    matchedRecords: 435,
    exceptionRecords: 0
  },
  {
    id: '4',
    date: '2023-10-12',
    status: 'exception',
    totalRecords: 442,
    matchedRecords: 439,
    exceptionRecords: 3
  },
  {
    id: '5',
    date: '2023-10-11',
    status: 'pending',
    totalRecords: 465,
    matchedRecords: 0,
    exceptionRecords: 0
  }
];

// Mock brand data
const mockBrand = {
  name: 'Samsung',
  description: 'Samsung Brand EMI Program',
  logo: '/placeholder.svg'
};

const WorkspaceDetail = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [activeTab, setActiveTab] = useState('reconciliations');
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
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

  const handleNewReconciliation = () => {
    if (!file1 || !file2) {
      toast({
        title: "Missing files",
        description: "Please upload both source files for reconciliation",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Processing",
      description: "Starting reconciliation process...",
    });

    // In a real app, you would send these files to your backend
    console.log('Starting reconciliation for workspace:', workspaceId);
    console.log('File 1:', file1);
    console.log('File 2:', file2);

    // Reset file inputs
    setFile1(null);
    setFile2(null);
    
    // Show success toast after "processing"
    setTimeout(() => {
      toast({
        title: "Reconciliation complete",
        description: "Files have been processed successfully",
      });
    }, 2000);
  };

  const handleDownloadReconciliation = (reconId: string) => {
    toast({
      title: "Downloading",
      description: `Preparing reconciliation report ${reconId}...`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Reconciliation report has been downloaded",
      });
    }, 1500);
  };
  
  const handleViewExceptions = (reconId: string) => {
    // In a real app, navigate to the exceptions page with the reconciliation ID
    toast({
      title: "Viewing exceptions",
      description: `Showing exceptions for reconciliation ${reconId}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'exception':
        return <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-medium">Exception</span>;
      case 'complete':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">Complete</span>;
      case 'pending':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">Pending</span>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exception':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="mr-4" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
            <img src={mockBrand.logo} alt={mockBrand.name} className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{mockBrand.name}</h1>
            <p className="text-muted-foreground">{mockBrand.description}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="reconciliations">Reconciliations</TabsTrigger>
          <TabsTrigger value="validation">Validation Rules</TabsTrigger>
          <TabsTrigger value="settings">Workspace Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="reconciliations" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>New Reconciliation</CardTitle>
                <CardDescription>
                  Upload files to start a new reconciliation process
                </CardDescription>
              </div>
              <Button onClick={handleNewReconciliation} disabled={!file1 || !file2}>
                <Upload className="h-4 w-4 mr-2" />
                Start Reconciliation
              </Button>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="font-medium">Source 1 File</div>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => handleFileChange(e, 1)}
                    className="cursor-pointer"
                  />
                  {file1 && (
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {file1.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Source 2 File</div>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="file" 
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => handleFileChange(e, 2)}
                    className="cursor-pointer"
                  />
                  {file2 && (
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {file2.name}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reconciliations</CardTitle>
              <CardDescription>
                History of reconciliation processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 text-left font-medium">Date</th>
                      <th className="pb-3 text-left font-medium">Status</th>
                      <th className="pb-3 text-right font-medium">Total Records</th>
                      <th className="pb-3 text-right font-medium">Matched</th>
                      <th className="pb-3 text-right font-medium">Exceptions</th>
                      <th className="pb-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReconciliations.map((recon) => (
                      <tr key={recon.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {recon.date}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center">
                            {getStatusIcon(recon.status)}
                            <span className="ml-2">{getStatusBadge(recon.status)}</span>
                          </div>
                        </td>
                        <td className="py-3 text-right">{recon.totalRecords}</td>
                        <td className="py-3 text-right">{recon.matchedRecords}</td>
                        <td className="py-3 text-right font-medium">
                          <span className={recon.exceptionRecords > 0 ? "text-red-600" : ""}>
                            {recon.exceptionRecords}
                          </span>
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDownloadReconciliation(recon.id)}
                            title="Download report"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {recon.status === 'exception' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-amber-600"
                              onClick={() => handleViewExceptions(recon.id)}
                              title="View exceptions"
                            >
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation">
          <Card>
            <CardHeader>
              <CardTitle>Validation Rules</CardTitle>
              <CardDescription>
                Configure rules to validate reconciliation data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                <p>Validation rules will be implemented in the next phase</p>
                <p className="text-sm mt-2">
                  This section will include options to define min-max rules, ratio-based rules, 
                  and other validation logic for this workspace.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Settings</CardTitle>
              <CardDescription>
                Configure workspace preferences and options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                <p>Workspace settings will be implemented in the next phase</p>
                <p className="text-sm mt-2">
                  This section will include options to manage workspace access, 
                  notification preferences, and other configuration settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default WorkspaceDetail;
