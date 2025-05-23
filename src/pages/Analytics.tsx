
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

// Single blue shade for all charts
const BLUE_COLOR = '#38BDF8';
const LIGHTER_BLUE_COLOR = '#60C8F9';
const DARKER_BLUE_COLOR = '#0EA5E9';
const BLUE_SHADES = [BLUE_COLOR, LIGHTER_BLUE_COLOR, DARKER_BLUE_COLOR, '#90D8FA', '#0096E6'];

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

const workspaceActivityData = [
  { name: 'Samsung', activity: 78 },
  { name: 'Godrej', activity: 45 },
  { name: 'HP', activity: 92 },
  { name: 'Vivo', activity: 65 },
  { name: 'LG', activity: 53 },
];

const chartConfig = {
  completed: { label: 'Completed', color: BLUE_COLOR },
  exceptions: { label: 'Exceptions', color: LIGHTER_BLUE_COLOR },
  activity: { label: 'Activity', color: DARKER_BLUE_COLOR },
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
              <Card className="bg-muted border border-white/10 shadow-lg card-hover">
                <CardHeader>
                  <CardTitle>Total Reconciliations</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">293</div>
                  <p className="text-sm text-green-400 mt-2">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-muted border border-white/10 shadow-lg card-hover">
                <CardHeader>
                  <CardTitle>Exceptions Rate</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">8.3%</div>
                  <p className="text-sm text-green-400 mt-2">-2.1% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-muted border border-white/10 shadow-lg card-hover">
                <CardHeader>
                  <CardTitle>Average Resolution Time</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">3.2h</div>
                  <p className="text-sm text-green-400 mt-2">-0.5h from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="border-none bg-transparent shadow-none">
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
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip 
                          content={<ChartTooltipContent />}
                          cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        />
                        <Legend wrapperStyle={{paddingTop: 10}} />
                        <Bar 
                          dataKey="completed" 
                          name="Completed" 
                          fill={BLUE_COLOR}
                          radius={[4, 4, 0, 0]} 
                          barSize={30} 
                        />
                        <Bar 
                          dataKey="exceptions" 
                          name="Exceptions" 
                          fill={LIGHTER_BLUE_COLOR}
                          radius={[4, 4, 0, 0]} 
                          barSize={30} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exceptions">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-muted border border-white/10 shadow-lg">
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
                          stroke="#111111"
                          strokeWidth={1}
                          fill={BLUE_COLOR}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {exceptionTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={BLUE_SHADES[index % BLUE_SHADES.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-muted border border-white/10 shadow-lg">
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
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                        <XAxis type="number" stroke="rgba(255,255,255,0.7)" />
                        <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.7)" />
                        <Tooltip 
                          cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                          content={<ChartTooltipContent />}
                        />
                        <Legend />
                        <Bar 
                          dataKey="hours" 
                          name="Hours" 
                          fill={BLUE_COLOR}
                          radius={[0, 4, 4, 0]}
                          barSize={20}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workspaces">
            <Card className="border-none bg-transparent shadow-none mt-6">
              <CardHeader>
                <CardTitle>Workspace Activity</CardTitle>
                <CardDescription>
                  Reconciliation activity by workspace
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] mb-8">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={workspaceActivityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        content={<ChartTooltipContent />} 
                        position={{y: -50}}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="activity"
                        name="Activity"
                        stroke={BLUE_COLOR}
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, fill: "#0f172a" }}
                        activeDot={{ r: 8, stroke: BLUE_COLOR, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Company cards have been removed as requested */}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
