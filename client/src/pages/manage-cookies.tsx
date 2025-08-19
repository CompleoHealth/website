import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import ScrollProgress from '@/components/common/scroll-progress';
import Breadcrumb from '@/components/common/breadcrumb';
import TrustSignals from '@/components/common/trust-signals';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Trash2, Eye, Shield, Settings, Clock, Database } from 'lucide-react';
import { BrandedIcon } from '@/components/ui/branded-icons';
import { useToast } from '@/hooks/use-toast';

interface StoredDataItem {
  key: string;
  value: string;
  created: string;
  size: number;
  category: 'essential' | 'functional' | 'preferences';
  description: string;
  expires?: string;
}

interface ConsentRecord {
  status: 'accepted' | 'rejected';
  timestamp: string;
  categories: string[];
  version: string;
  userAgent?: string;
}

export default function ManageCookies() {
  const { elementRef: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 });
  const [storedData, setStoredData] = useState<StoredDataItem[]>([]);
  const [consentHistory, setConsentHistory] = useState<ConsentRecord[]>([]);
  const [totalDataSize, setTotalDataSize] = useState(0);
  const { toast } = useToast();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Manage Cookies' }
  ];

  // Scan and categorize all stored data
  const scanStoredData = (): StoredDataItem[] => {
    const data: StoredDataItem[] = [];
    
    // Scan localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key) || '';
        const item: StoredDataItem = {
          key,
          value,
          created: getDataTimestamp(key),
          size: new Blob([value]).size,
          category: categorizeData(key),
          description: getDataDescription(key),
          expires: getDataExpiry(key)
        };
        data.push(item);
      }
    }

    // Scan sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        const value = sessionStorage.getItem(key) || '';
        const item: StoredDataItem = {
          key: `${key} (session)`,
          value,
          created: new Date().toISOString(),
          size: new Blob([value]).size,
          category: 'functional',
          description: `Session data: ${getDataDescription(key)}`,
          expires: 'End of session'
        };
        data.push(item);
      }
    }

    return data;
  };

  const categorizeData = (key: string): 'essential' | 'functional' | 'preferences' => {
    if (key.includes('cookie-consent') || key.includes('consent-log')) return 'essential';
    if (key.includes('theme')) return 'preferences';
    return 'functional';
  };

  const getDataDescription = (key: string): string => {
    const descriptions: Record<string, string> = {
      'cookie-consent': 'Your cookie consent preferences',
      'consent-log': 'Audit trail of consent decisions',
      'theme': 'Your preferred website theme',
      'form-data': 'Temporary form data for improved user experience'
    };
    
    for (const [pattern, desc] of Object.entries(descriptions)) {
      if (key.includes(pattern)) return desc;
    }
    
    return 'Website functionality data';
  };

  const getDataTimestamp = (key: string): string => {
    // Try to extract timestamp from consent log
    if (key === 'consent-log') {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        if (data.timestamp) return data.timestamp;
      } catch {
        // Fallback to current time
      }
    }
    
    // Default to current time for existing data
    return new Date().toISOString();
  };

  const getDataExpiry = (key: string): string | undefined => {
    if (key.includes('session')) return 'End of session';
    if (key === 'cookie-consent') return 'No expiry (until changed)';
    return 'No expiry';
  };

  const loadConsentHistory = (): ConsentRecord[] => {
    try {
      const consentLog = localStorage.getItem('consent-log');
      if (consentLog) {
        const record = JSON.parse(consentLog);
        return [record]; // Single record format, extend for multiple records
      }
    } catch (error) {
      console.error('Error loading consent history:', error);
    }
    return [];
  };

  const deleteDataItem = (key: string) => {
    const isSession = key.includes('(session)');
    const actualKey = isSession ? key.replace(' (session)', '') : key;
    
    if (key.includes('cookie-consent')) {
      toast({
        title: "Cannot Delete",
        description: "Essential cookies cannot be deleted while browsing the site.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (isSession) {
        sessionStorage.removeItem(actualKey);
      } else {
        localStorage.removeItem(actualKey);
      }
      
      // Refresh data
      setStoredData(scanStoredData());
      calculateTotalSize();
      
      toast({
        title: "Data Deleted",
        description: `Successfully removed ${key}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete data item",
        variant: "destructive"
      });
    }
  };

  const clearAllNonEssential = () => {
    const itemsToDelete = storedData.filter(item => 
      item.category !== 'essential' && !item.key.includes('cookie-consent')
    );
    
    itemsToDelete.forEach(item => {
      const isSession = item.key.includes('(session)');
      const actualKey = isSession ? item.key.replace(' (session)', '') : item.key;
      
      if (isSession) {
        sessionStorage.removeItem(actualKey);
      } else {
        localStorage.removeItem(actualKey);
      }
    });
    
    // Refresh data
    setStoredData(scanStoredData());
    calculateTotalSize();
    
    toast({
      title: "Data Cleared",
      description: `Removed ${itemsToDelete.length} non-essential data items`,
    });
  };



  const calculateTotalSize = () => {
    const total = storedData.reduce((sum, item) => sum + item.size, 0);
    setTotalDataSize(total);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essential': return 'bg-red-100 text-red-800';
      case 'functional': return 'bg-blue-100 text-blue-800';
      case 'preferences': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'essential': return Shield;
      case 'functional': return Settings;
      case 'preferences': return Eye;
      default: return Database;
    }
  };

  useEffect(() => {
    setStoredData(scanStoredData());
    setConsentHistory(loadConsentHistory());
  }, []);

  useEffect(() => {
    calculateTotalSize();
  }, [storedData]);

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="bg-compleo-deep-teal text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <BrandedIcon icon={Database} variant="primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Manage Your Data
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                View, manage, and control all data stored by our website. Complete transparency for your privacy.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Database className="h-8 w-8 text-compleo-teal mx-auto mb-2" />
                <div className="text-2xl font-bold text-compleo-deep-teal">{storedData.length}</div>
                <div className="text-sm text-gray-600">Data Items</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-compleo-deep-teal">
                  {storedData.filter(item => item.category === 'essential').length}
                </div>
                <div className="text-sm text-gray-600">Essential</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-compleo-deep-teal">
                  {storedData.filter(item => item.category === 'preferences').length}
                </div>
                <div className="text-sm text-gray-600">Preferences</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Database className="h-8 w-8 text-compleo-teal mx-auto mb-2" />
                <div className="text-2xl font-bold text-compleo-deep-teal">{formatBytes(totalDataSize)}</div>
                <div className="text-sm text-gray-600">Total Size</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              onClick={clearAllNonEssential}
              className="bg-gradient-to-br from-red-500 via-red-500 to-red-600 hover:bg-gradient-to-br hover:from-red-600 hover:via-red-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl border-2 border-red-400/40 hover:border-red-500/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Non-Essential Data
            </Button>
          </div>

          {/* Stored Data Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-compleo-deep-teal flex items-center gap-2">
                <Database className="h-6 w-6" />
                Your Stored Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              {storedData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No data currently stored</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-compleo-deep-teal">Data Item</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-compleo-deep-teal">Category</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-compleo-deep-teal">Size</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-compleo-deep-teal">Expires</th>
                        <th className="border border-gray-200 px-4 py-2 text-center text-sm font-semibold text-compleo-deep-teal">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storedData.map((item, index) => {
                        const CategoryIcon = getCategoryIcon(item.category);
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex items-center gap-2">
                                <CategoryIcon className="h-4 w-4 text-compleo-teal flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-compleo-deep-teal text-sm">{item.key}</div>
                                  <div className="text-xs text-gray-600 mt-1">{item.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <Badge className={getCategoryColor(item.category)}>
                                {item.category}
                              </Badge>
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
                              {formatBytes(item.size)}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
                              {item.expires || 'No expiry'}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex gap-1 justify-center">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    toast({
                                      title: "Data Content",
                                      description: `${item.key}: ${item.value.substring(0, 100)}${item.value.length > 100 ? '...' : ''}`,
                                    });
                                  }}
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                                
                                {item.category !== 'essential' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => deleteDataItem(item.key)}
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Consent History */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-compleo-deep-teal flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Consent History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {consentHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No consent records found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {consentHistory.map((record, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-compleo-teal" />
                          <span className="font-semibold text-compleo-deep-teal">
                            Consent {record.status}
                          </span>
                          <Badge className={record.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {record.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(record.timestamp).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p>Version: {record.version}</p>
                        {record.categories && record.categories.length > 0 && (
                          <p>Categories: {record.categories.join(', ')}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Essential cookies cannot be deleted as they're required for basic site functionality</li>
                    <li>• Deleting preference data will reset your theme and other customization settings</li>
                    <li>• This tool shows data stored locally in your browser - no server data is included</li>
                    <li>• For formal data access requests, please contact us via our <a href="/contact" className="underline hover:text-blue-900">contact page</a></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <TrustSignals />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}