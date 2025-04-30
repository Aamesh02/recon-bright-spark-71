
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Download, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { ReconciliationRecord } from '@/types';

interface ReconciliationsTabProps {
  workspaceId: string;
}

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

const ReconciliationsTab: React.FC<ReconciliationsTabProps> = ({ workspaceId }) => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const { toast } = useToast();

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

    console.log('Starting reconciliation for workspace:', workspaceId);
    console.log('File 1:', file1);
    console.log('File 2:', file2);

    setFile1(null);
    setFile2(null);
    
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
    
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Reconciliation report has been downloaded",
      });
    }, 1500);
  };
  
  const handleViewExceptions = (reconId: string) => {
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
    <div className="space-y-4">
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
    </div>
  );
};

export default ReconciliationsTab;
