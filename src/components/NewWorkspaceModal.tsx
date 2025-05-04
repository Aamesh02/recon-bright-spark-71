
import React, { useState, useEffect } from 'react';
import { Dialog, DialogClose, DialogTrigger, WorkspaceDialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, ArrowRight } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import { useToast } from '@/hooks/use-toast';

interface NewWorkspaceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkspaceCreated: (workspace: any) => void;
}

const NewWorkspaceModal: React.FC<NewWorkspaceModalProps> = ({ 
  isOpen, 
  onOpenChange,
  onWorkspaceCreated 
}) => {
  // State variables
  const [step, setStep] = useState<'details' | 'mapping'>('details');
  const [workspaceName, setWorkspaceName] = useState('');
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [columnsDetected, setColumnsDetected] = useState<{file1: string[], file2: string[]}>({ file1: [], file2: [] });
  const [matchedFields, setMatchedFields] = useState<{field1: string, field2: string}[]>([]);
  
  const { toast } = useToast();

  // Process uploaded files to detect columns
  useEffect(() => {
    if (file1 && file2) {
      // Simulate column detection
      setColumnsDetected({
        file1: ['item_date', 'purchase_date', 'order_reference', 'invoice_number', 'amount', 'emi'],
        file2: ['purchase_date', 'order_reference', 'invoice_number', 'amount', 'emi', 'dealer_code']
      });
      
      // Auto-suggest some field matches
      setMatchedFields([
        { field1: 'purchase_date', field2: 'purchase_date' },
        { field1: 'order_reference', field2: 'order_reference' },
        { field1: 'amount', field2: 'amount' },
        { field1: 'emi', field2: 'emi' }
      ]);
    }
  }, [file1, file2]);

  const handleNextStep = () => {
    if (!workspaceName || !file1 || !file2) {
      toast({
        title: "Missing information",
        description: "Please provide a workspace name and upload both files",
        variant: "destructive",
      });
      return;
    }
    
    setStep('mapping');
  };

  const handleCreateWorkspace = () => {
    if (!workspaceName || !file1 || !file2) {
      toast({
        title: "Missing information",
        description: "Please provide a workspace name and upload both files",
        variant: "destructive",
      });
      return;
    }

    // Set processing state
    setIsProcessingFiles(true);
    
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
      const newWorkspace = {
        id: crypto.randomUUID(),
        name: workspaceName,
        description: `Reconciliation workspace for ${workspaceName}`,
        lastUpdated: new Date().toISOString().split('T')[0],
        pendingExceptions: pendingExceptions,
        totalRecords: totalRecords,
        matchedRecords: matchedRecords,
        brand: {
          name: workspaceName.split(' ')[0], // Use first word as brand name
          logo: '/placeholder.svg'
        }
      };
      
      // Reset form
      setStep('details');
      setWorkspaceName('');
      setFile1(null);
      setFile2(null);
      setMatchedFields([]);
      
      // Close modal
      onOpenChange(false);
      
      // Add to workspaces
      onWorkspaceCreated(newWorkspace);
      
      toast({
        title: "Workspace created",
        description: `Successfully created "${workspaceName}" workspace`,
      });
    }, 2000);
  };

  const handleAutoMatch = () => {
    if (!file1 || !file2) return;
    
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
        { field1: 'invoice_number', field2: 'invoice_number' },
        { field1: 'amount', field2: 'amount' },
        { field1: 'emi', field2: 'emi' }
      ];
      
      setMatchedFields(automaticMatches);
      
      toast({
        title: "Auto-match complete",
        description: `Successfully matched ${automaticMatches.length} columns`,
      });
    }, 1500);
  };

  const resetState = () => {
    setStep('details');
    setWorkspaceName('');
    setFile1(null);
    setFile2(null);
    setMatchedFields([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetState();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Workspace
        </Button>
      </DialogTrigger>
      
      <WorkspaceDialogContent>
        {/* Step indicator */}
        <div className="step-indicator">
          <div className={`step ${step === 'details' ? 'active' : ''}`}></div>
          <div className={`step ${step === 'mapping' ? 'active' : ''}`}></div>
        </div>
        
        {step === 'details' ? (
          <>
            <div className="workspace-dialog-header">
              <h2 className="workspace-title">Create new reconciliation workspace</h2>
              <p className="workspace-subtitle">Upload sample files to automatically configure the workspace</p>
            </div>
            
            <div className="workspace-dialog-content">
              <div className="mb-6">
                <label htmlFor="workspace-name" className="source-label">Workspace Name</label>
                <Input
                  id="workspace-name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="e.g., Samsung Brand EMI Reconciliation"
                  className="workspace-name-input"
                />
              </div>
              
              <div className="source-upload-container">
                <div>
                  <label className="source-label">Source 1 File</label>
                  <FileUpload 
                    label="Source 1"
                    onFileChange={(file) => setFile1(file)}
                    source="Source 1"
                  />
                </div>
                <div>
                  <label className="source-label">Source 2 File</label>
                  <FileUpload 
                    label="Source 2"
                    onFileChange={(file) => setFile2(file)}
                    source="Source 2"
                  />
                </div>
              </div>
            </div>
            
            <div className="workspace-dialog-footer">
              <DialogClose asChild>
                <Button variant="outline" className="workspace-button border-gray-700 hover:bg-gray-800">
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                className="workspace-button bg-[#7C3AED] hover:bg-[#6D28D9]"
                onClick={handleNextStep}
                disabled={!workspaceName || !file1 || !file2}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="workspace-dialog-header">
              <h2 className="workspace-title">Column Mapping</h2>
              <p className="workspace-subtitle">Review and confirm field mappings between your data sources</p>
            </div>
            
            <div className="workspace-dialog-content">
              <div className="mapping-container">
                <h3 className="mapping-title">Detected Fields</h3>
                <p className="mapping-subtitle">The system has detected the following fields in your uploaded files</p>
                
                <div className="mapping-columns">
                  <div className="font-medium text-sm">Source 1</div>
                  <div></div>
                  <div className="font-medium text-sm">Source 2</div>
                </div>
                
                {/* Display some sample detected columns */}
                {columnsDetected.file1.slice(0, 5).map((col, idx) => (
                  <div className="mapping-columns" key={idx}>
                    <div className="mapping-field">{col}</div>
                    <div className="mapping-arrow">
                      {columnsDetected.file2.includes(col) && "→"}
                    </div>
                    <div className="mapping-field">
                      {columnsDetected.file2.includes(col) ? col : ""}
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-400">
                      {matchedFields.length} of {Math.max(columnsDetected.file1.length, columnsDetected.file2.length)} fields auto-matched
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAutoMatch}
                    className="text-xs border-white/20 hover:bg-white/10"
                  >
                    Auto-Match
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="workspace-dialog-footer">
              <Button 
                variant="outline"
                onClick={() => setStep('details')} 
                className="workspace-button border-gray-700 hover:bg-gray-800"
              >
                Back
              </Button>
              <Button 
                onClick={handleCreateWorkspace}
                disabled={isProcessingFiles || matchedFields.length === 0}
                className="workspace-button bg-[#7C3AED] hover:bg-[#6D28D9]"
              >
                {isProcessingFiles ? "Creating..." : "Create Workspace"}
              </Button>
            </div>
          </>
        )}
      </WorkspaceDialogContent>
    </Dialog>
  );
};

export default NewWorkspaceModal;
