
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Mail, Download, Calendar, Clock, BarChart3, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

const ReportingSettings = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const { toast } = useToast();
  
  const [reportTemplates, setReportTemplates] = useState([
    { id: 1, name: 'Daily Reconciliation Summary', type: 'summary', format: 'pdf', enabled: true },
    { id: 2, name: 'Exception Report', type: 'exception', format: 'excel', enabled: true },
    { id: 3, name: 'Monthly Analytics', type: 'analytics', format: 'pdf', enabled: true },
    { id: 4, name: 'Validation Failures', type: 'validation', format: 'excel', enabled: false },
  ]);

  const [scheduledReports, setScheduledReports] = useState([
    { 
      id: 1, 
      name: 'Daily Reconciliation Summary', 
      frequency: 'Daily', 
      recipients: 'finance@example.com', 
      time: '08:00',
      enabled: true 
    },
    { 
      id: 2, 
      name: 'Weekly Exception Report', 
      frequency: 'Weekly', 
      recipients: 'operations@example.com, finance@example.com', 
      time: '09:00',
      enabled: true 
    },
    { 
      id: 3, 
      name: 'Monthly Analytics', 
      frequency: 'Monthly', 
      recipients: 'management@example.com', 
      time: '07:00',
      enabled: true 
    },
  ]);

  const toggleTemplate = (id) => {
    setReportTemplates(reportTemplates.map(template => 
      template.id === id ? { ...template, enabled: !template.enabled } : template
    ));
  };

  const toggleSchedule = (id) => {
    setScheduledReports(scheduledReports.map(report => 
      report.id === id ? { ...report, enabled: !report.enabled } : report
    ));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your reporting settings have been updated.",
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Reporting Settings</h1>
          <p className="text-muted-foreground">
            Configure report templates and delivery options
          </p>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduling">Report Scheduling</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Options</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Report Templates Tab */}
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Manage your report templates and formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Available Templates</h3>
                    <Button size="sm" className="gradient-btn">
                      <FileText className="w-4 h-4 mr-2" />
                      Add Template
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Template Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead className="w-[100px] text-center">Enabled</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportTemplates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell className="capitalize">{template.type}</TableCell>
                          <TableCell className="uppercase">{template.format}</TableCell>
                          <TableCell className="text-center">
                            <Checkbox 
                              checked={template.enabled}
                              onCheckedChange={() => toggleTemplate(template.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Template Configuration</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="default-format">Default Format</Label>
                        <Select defaultValue="pdf">
                          <SelectTrigger id="default-format">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="retention-period">Report Retention Period (days)</Label>
                        <Input id="retention-period" type="number" defaultValue={90} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label>Default Sections</Label>
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="section-summary" defaultChecked />
                            <label htmlFor="section-summary" className="text-sm">Summary Statistics</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="section-exceptions" defaultChecked />
                            <label htmlFor="section-exceptions" className="text-sm">Exception Details</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="section-charts" defaultChecked />
                            <label htmlFor="section-charts" className="text-sm">Charts & Graphs</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="section-history" />
                            <label htmlFor="section-history" className="text-sm">Historical Comparison</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveSettings} className="gradient-btn mt-4">Save Template Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Scheduling Tab */}
        <TabsContent value="scheduling">
          <Card>
            <CardHeader>
              <CardTitle>Report Scheduling</CardTitle>
              <CardDescription>
                Configure when and how often reports are generated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Scheduled Reports</h3>
                    <Button size="sm" className="gradient-btn">
                      <Calendar className="w-4 h-4 mr-2" />
                      Add Schedule
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[280px]">Report Name</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="w-[100px] text-center">Enabled</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scheduledReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>{report.frequency}</TableCell>
                          <TableCell className="text-xs">{report.recipients}</TableCell>
                          <TableCell>{report.time}</TableCell>
                          <TableCell className="text-center">
                            <Checkbox 
                              checked={report.enabled}
                              onCheckedChange={() => toggleSchedule(report.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Schedule Configuration</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="report-template">Report Template</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="report-template">
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily Reconciliation Summary</SelectItem>
                            <SelectItem value="exception">Exception Report</SelectItem>
                            <SelectItem value="monthly">Monthly Analytics</SelectItem>
                            <SelectItem value="validation">Validation Failures</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="scheduled-time">Scheduled Time</Label>
                        <Input id="scheduled-time" type="time" defaultValue="08:00" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="recipients">Recipients</Label>
                        <Textarea 
                          id="recipients" 
                          placeholder="Enter email addresses separated by commas" 
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-4">
                        <Checkbox id="include-attachments" defaultChecked />
                        <Label htmlFor="include-attachments">Include Attachments</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-summary" defaultChecked />
                        <Label htmlFor="include-summary">Include Summary in Email Body</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveSettings} className="gradient-btn mt-4">Save Schedule Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delivery Options Tab */}
        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Options</CardTitle>
              <CardDescription>
                Configure how reports are delivered and accessed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Settings</h3>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="email-from">From Email Address</Label>
                      <Input id="email-from" type="email" defaultValue="reports@reconciliation.com" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email-subject">Default Email Subject</Label>
                      <Input id="email-subject" defaultValue="[Recon] {ReportName} - {Date}" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email-template">Email Template</Label>
                      <Select defaultValue="standard">
                        <SelectTrigger id="email-template">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="include-logo" defaultChecked />
                      <Label htmlFor="include-logo">Include Company Logo</Label>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6">SMTP Configuration</h3>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="smtp-server">SMTP Server</Label>
                      <Input id="smtp-server" defaultValue="smtp.company.com" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" type="number" defaultValue="587" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="smtp-username">Username</Label>
                      <Input id="smtp-username" defaultValue="reports@company.com" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="smtp-password">Password</Label>
                      <Input id="smtp-password" type="password" value="•••••••••••" />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="smtp-ssl" defaultChecked />
                      <Label htmlFor="smtp-ssl">Use SSL/TLS</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Storage & Access</h3>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="storage-location">Report Storage Location</Label>
                      <Select defaultValue="cloud">
                        <SelectTrigger id="storage-location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cloud">Cloud Storage</SelectItem>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="sharepoint">SharePoint</SelectItem>
                          <SelectItem value="s3">AWS S3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="cloud-path">Storage Path</Label>
                      <Input id="cloud-path" defaultValue="/reports/{WorkspaceName}/{YYYY-MM-DD}/" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="file-naming">File Naming Convention</Label>
                      <Input id="file-naming" defaultValue="{ReportType}_{Date}_{Time}.{Extension}" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <Label htmlFor="auto-archive">Auto-Archive Old Reports</Label>
                      <Switch id="auto-archive" defaultChecked />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="archive-days">Archive After (days)</Label>
                      <Input id="archive-days" type="number" defaultValue="90" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="access-control">Enable Access Control</Label>
                      <Switch id="access-control" defaultChecked />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6">Alternative Delivery Methods</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-api">API Access</Label>
                      <Switch id="enable-api" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-sftp">SFTP Delivery</Label>
                      <Switch id="enable-sftp" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-webhook">Webhook Notifications</Label>
                      <Switch id="enable-webhook" />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveSettings} className="gradient-btn mt-6">Save Delivery Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure alerts and notifications for key events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="notification-recipients">Default Recipients</Label>
                      <Textarea 
                        id="notification-recipients" 
                        placeholder="Enter email addresses separated by commas"
                        defaultValue="alerts@company.com, finance@company.com" 
                      />
                    </div>
                    
                    <h4 className="font-medium text-md mt-4">Notification Events</h4>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-failure" defaultChecked />
                          <Label htmlFor="notify-failure">Reconciliation Failure</Label>
                        </div>
                        <Select defaultValue="high" className="w-28">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-exceptions" defaultChecked />
                          <Label htmlFor="notify-exceptions">Exceptions Above Threshold</Label>
                        </div>
                        <Select defaultValue="medium" className="w-28">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-complete" defaultChecked />
                          <Label htmlFor="notify-complete">Reconciliation Complete</Label>
                        </div>
                        <Select defaultValue="low" className="w-28">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-system" defaultChecked />
                          <Label htmlFor="notify-system">System Errors</Label>
                        </div>
                        <Select defaultValue="high" className="w-28">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="slack-integration">Slack Integration</Label>
                        <Switch id="slack-integration" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="slack-webhook">Webhook URL</Label>
                        <Input id="slack-webhook" placeholder="https://hooks.slack.com/services/..." />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="slack-channel">Default Channel</Label>
                        <Input id="slack-channel" placeholder="#reconciliation-alerts" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="teams-integration">Microsoft Teams Integration</Label>
                        <Switch id="teams-integration" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="teams-webhook">Webhook URL</Label>
                        <Input id="teams-webhook" placeholder="https://outlook.office.com/webhook/..." />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-integration">SMS Notifications</Label>
                        <Switch id="sms-integration" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="sms-numbers">Phone Numbers</Label>
                        <Input id="sms-numbers" placeholder="+1234567890, +0987654321" />
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="sms-critical-only" defaultChecked />
                        <Label htmlFor="sms-critical-only">Send only for critical alerts</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveSettings} className="gradient-btn mt-6">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ReportingSettings;
