
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ExceptionRecord } from '@/types';

interface ExceptionDetailProps {
  exception: ExceptionRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (id: string, notes: string) => void;
}

const ExceptionDetail = ({ exception, isOpen, onClose, onResolve }: ExceptionDetailProps) => {
  const [notes, setNotes] = useState('');

  const handleResolve = () => {
    if (exception) {
      onResolve(exception.id, notes);
      onClose();
    }
  };

  if (!exception) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Exception Details</DialogTitle>
          <DialogDescription>
            Review and resolve the reconciliation exception
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Record ID</h3>
              <p className="text-sm text-muted-foreground">{exception.recordId}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Status</h3>
              <p className={`text-sm ${exception.status === 'open' ? 'text-amber-600' : exception.status === 'resolved' ? 'text-green-600' : 'text-blue-600'}`}>
                {exception.status.charAt(0).toUpperCase() + exception.status.slice(1)}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Validation Rule</h3>
            <p className="text-sm text-muted-foreground">{exception.rule}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Source 1 Value</h3>
              <p className="text-sm font-mono bg-muted p-2 rounded">{exception.source1Value}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Source 2 Value</h3>
              <p className="text-sm font-mono bg-muted p-2 rounded">{exception.source2Value}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Notes</h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this exception and how it was resolved..."
              className="h-24"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleResolve}>Resolve Exception</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExceptionDetail;
