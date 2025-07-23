// Security utilities for dashboard access
export function isAuthorizedRequest(req: any): boolean {
  // Additional security checks could be implemented here
  // For example: IP whitelist, user agent checks, etc.
  return true;
}

export function obfuscateEndpoint(endpoint: string): string {
  // Simple endpoint obfuscation
  const obfuscationMap: { [key: string]: string } = {
    'analytics': 'sys',
    'overview': 'data',
    'visitors': 'logs',
    'funnel': 'flow',
    'live': 'status',
    'campaigns': 'projects'
  };
  
  return endpoint.split('/').map(part => obfuscationMap[part] || part).join('/');
}