
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Layout from '@/components/Layout';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { UserPlus, UserMinus, UserCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock users data
  const mockUsers: User[] = [
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'Admin', 
      status: 'active', 
      lastLogin: '2025-04-01 14:30:00' 
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'Manager', 
      status: 'active',
      lastLogin: '2025-04-02 09:15:00' 
    },
    { 
      id: '3', 
      name: 'Alice Johnson', 
      email: 'alice@example.com', 
      role: 'Analyst', 
      status: 'active',
      lastLogin: '2025-03-30 16:45:00'
    },
    { 
      id: '4', 
      name: 'Bob Williams', 
      email: 'bob@example.com', 
      role: 'Analyst', 
      status: 'inactive',
      lastLogin: '2025-03-25 11:20:00'
    },
    { 
      id: '5', 
      name: 'Carol Martinez', 
      email: 'carol@example.com', 
      role: 'Manager', 
      status: 'active',
      lastLogin: '2025-04-01 08:50:00'
    }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInviteUser = () => {
    toast({
      title: "Invitation sent",
      description: "New user invitation has been sent successfully."
    });
  };

  const handleDeactivateUser = (userId: string, userName: string) => {
    toast({
      title: "User deactivated",
      description: `${userName} has been deactivated.`
    });
  };

  const handleActivateUser = (userId: string, userName: string) => {
    toast({
      title: "User activated",
      description: `${userName} has been activated.`
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button onClick={handleInviteUser} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Invite User</span>
          </Button>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage users and their permissions in your organization.
            </CardDescription>
            <div className="mt-4">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>List of users in your organization</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      {user.status === 'active' ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeactivateUser(user.id, user.name)}
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleActivateUser(user.id, user.name)}
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserManagement;
