
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, BarChart, Factory, Percent } from 'lucide-react';
import { WorkspaceCard } from '@/types';
import { useToast } from '@/hooks/use-toast';
import NewWorkspaceModal from '@/components/NewWorkspaceModal';

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
  const [workspaces, setWorkspaces] = useState<WorkspaceCard[]>(initialWorkspaces);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleWorkspaceCreated = (newWorkspace: WorkspaceCard) => {
    setWorkspaces([newWorkspace, ...workspaces]);
    
    toast({
      title: "Workspace created",
      description: `Successfully created "${newWorkspace.name}" workspace`,
    });
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

  return (
    <Layout>
      {/* Header section with search bar and create button */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">Manage and monitor your reconciliation workspaces</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchBar />
        <NewWorkspaceModal 
          isOpen={isCreatingWorkspace} 
          onOpenChange={setIsCreatingWorkspace}
          onWorkspaceCreated={handleWorkspaceCreated}
        />
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
