import WalletManager from "@/components/WalletManager";
import StellarTest from "@/components/StellarTest";
import BottomNav from "@/components/BottomNav";
import ErrorBoundary from "@/components/ErrorBoundary";

const Wallet = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="relative z-10 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-black/40 via-purple-900/40 to-black/40 backdrop-blur-lg border-b border-purple-500/30 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-2xl border-3 border-blue-300 transform hover:scale-110 transition-transform duration-200">
              💎
            </div>
            <div>
              <h2 className="font-bold text-white text-lg drop-shadow-lg">Wallet</h2>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="px-6 py-6 space-y-6">
          <ErrorBoundary>
            <StellarTest />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <WalletManager />
          </ErrorBoundary>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Wallet; 