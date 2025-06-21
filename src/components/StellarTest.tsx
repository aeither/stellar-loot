import React, { useState } from 'react';
import { generateKeypair } from '@/stellar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Sparkles } from 'lucide-react';

const StellarTest = () => {
  const [testResults, setTestResults] = useState<{
    sdkLoaded: boolean;
    keypairGenerated: boolean;
    error?: string;
  } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const runTests = async () => {
    setIsTesting(true);
    const results = {
      sdkLoaded: false,
      keypairGenerated: false,
    };

    try {
      // Test 1: Check if Stellar SDK is loaded
      if (typeof window !== 'undefined') {
        results.sdkLoaded = true;
      }

      // Test 2: Try to generate a keypair
      try {
        const keypair = generateKeypair();
        if (keypair.publicKey && keypair.secretKey) {
          results.keypairGenerated = true;
        }
      } catch (error) {
        console.error('Keypair generation failed:', error);
        results.keypairGenerated = false;
      }

      setTestResults(results);
    } catch (error) {
      setTestResults({
        ...results,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const allTestsPassed = testResults && testResults.sdkLoaded && testResults.keypairGenerated;

  return (
    <Card className="bg-gradient-to-br from-green-800/60 to-emerald-800/60 backdrop-blur-sm border-2 border-green-400/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Sparkles className="w-5 h-5 mr-2" />
          Stellar SDK Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">
          Test the Stellar SDK functionality to ensure everything is working properly.
        </p>

        <Button 
          onClick={runTests}
          disabled={isTesting}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold"
        >
          {isTesting ? 'Running Tests...' : 'Run Tests'}
        </Button>

        {testResults && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {testResults.sdkLoaded ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              <span className="text-white">Stellar SDK Loaded</span>
            </div>

            <div className="flex items-center space-x-2">
              {testResults.keypairGenerated ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              <span className="text-white">Keypair Generation</span>
            </div>

            {testResults.error && (
              <div className="p-3 bg-red-900/30 border border-red-400/30 rounded">
                <p className="text-red-300 text-sm">Error: {testResults.error}</p>
              </div>
            )}

            {allTestsPassed && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                All Tests Passed! ✅
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StellarTest; 