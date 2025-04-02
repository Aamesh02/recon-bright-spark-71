
import React from 'react';
import Layout from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltipContent 
} from '@/components/ui/chart';

// Mock data for the charts
const reconciliationData = [
  { name: 'Jan', completed: 45, exceptions: 15 },
  { name: 'Feb', completed: 50, exceptions: 12 },
  { name: 'Mar', completed: 35, exceptions: 8 },
  { name: 'Apr', completed: 55, exceptions: 10 },
  { name: 'May', completed: 60, exceptions: 5 },
  { name: 'Jun', completed: 48, exceptions: 7 },
];

const exceptionTypeData = [
  { name: 'Amount Mismatch', value: 35 },
  { name: 'Missing Records', value: 25 },
  { name: 'Duplicate Entries', value: 15 },
  { name: 'Invalid Data', value: 10 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const workspaceActivityData = [
  { name: 'Samsung', activity: 78 },
  { name: 'Godrej', activity: 45 },
  { name: 'HP', activity: 92 },
  { name: 'Vivo', activity: 65 },
  { name: 'LG', activity: 53 },
];

const chartConfig = {
  completed: { label: 'Completed', color: '#4CAF50' },
  exceptions: { label: 'Exceptions', color: '#FF5722' },
  activity: { label: 'Activity', color: '#2196F3' },
};

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Gain insights into your reconciliation processes and performance.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Total Reconciliations</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">293</div>
                  <p className="text-sm text-muted-foreground mt-2">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exceptions Rate</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">8.3%</div>
                  <p className="text-sm text-muted-foreground mt-2">-2.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Resolution Time</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">3.2h</div>
                  <p className="text-sm text-muted-foreground mt-2">-0.5h from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Reconciliation Performance</CardTitle>
                  <CardDescription>
                    Completed reconciliations vs exceptions over the past 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={reconciliationData} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="completed" name="Completed" fill="#4CAF50" />
                        <Bar dataKey="exceptions" name="Exceptions" fill="#FF5722" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exceptions">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Exception Types</CardTitle>
                  <CardDescription>
                    Distribution of exceptions by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={exceptionTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {exceptionTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exception Resolution Time</CardTitle>
                  <CardDescription>
                    Average time to resolve by exception type (hours)
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { name: 'Amount Mismatch', hours: 4.2 },
                          { name: 'Missing Records', hours: 6.5 },
                          { name: 'Duplicate Entries', hours: 2.1 },
                          { name: 'Invalid Data', hours: 3.8 },
                          { name: 'Other', hours: 5.3 },
                        ]}
                        margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="hours" name="Hours" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workspaces">
            <Card>
              <CardHeader>
                <CardTitle>Workspace Activity</CardTitle>
                <CardDescription>
                  Reconciliation activity by workspace
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={workspaceActivityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="activity"
                        name="Activity"
                        stroke="#2196F3"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Samsung</CardTitle>
                  <CardDescription>Brand EMI program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78</div>
                  <p className="text-sm text-muted-foreground mt-2">32 exceptions</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Godrej</CardTitle>
                  <CardDescription>Brand EMI program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-sm text-muted-foreground mt-2">18 exceptions</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>HP</CardTitle>
                  <CardDescription>Brand EMI program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92</div>
                  <p className="text-sm text-muted-foreground mt-2">15 exceptions</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Vivo</CardTitle>
                  <CardDescription>Brand EMI program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">65</div>
                  <p className="text-sm text-muted-foreground mt-2">24 exceptions</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
