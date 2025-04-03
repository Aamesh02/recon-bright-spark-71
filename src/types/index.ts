
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'analyst';
  organization: string;
}

export interface WorkspaceCard {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  pendingExceptions: number;
  totalRecords: number;
  matchedRecords: number;
  brand: {
    name: string;
    logo?: string;
  };
}

export interface ReconciliationRecord {
  id: string;
  date: string;
  status: 'pending' | 'complete' | 'exception';
  totalRecords: number;
  matchedRecords: number;
  exceptionRecords: number;
}

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  type: 'min-max' | 'ratio' | 'equality' | 'presence' | 'custom';
  field1?: string;
  field2?: string;
  condition?: string;
  value?: string | number;
}

export interface ExceptionRecord {
  id: string;
  recordId: string;
  rule: string;
  source1Value: string;
  source2Value: string;
  status: 'open' | 'resolved' | 'in-suspense';
  notes?: string;
}

export interface ValidationResult {
  ruleId: string;
  ruleName: string;
  recordId: string;
  passed: boolean;
  field1?: string;
  field2?: string;
  value1?: string | number;
  value2?: string | number;
  expectedValue?: string | number;
  message?: string;
}

