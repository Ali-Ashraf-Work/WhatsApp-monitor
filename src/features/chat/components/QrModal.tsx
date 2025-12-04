import { RiLoader2Fill } from "react-icons/ri";
import { BiQrScan } from "react-icons/bi";

export default function QrModal({ qrCode }: { qrCode?: string }) {
  return (
    <div className="space-y-6">
      {/* QR Code Display */}
      <div className="text-center">
        <div className="inline-block p-6 bg-white rounded-2xl shadow-elegant-xl border-4 border-accent-teal">
          {qrCode ? (
            <img src={qrCode} alt="QR Code" className="w-64 h-64" />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center">
              <RiLoader2Fill className="w-12 h-12 animate-spin text-accent-purple" />
            </div>
          )}
        </div>
      </div>

      {/* Instructions Card */}
      <div className="bg-elegant-card border border-accent-teal rounded-xl p-5 shadow-elegant">
        <div className="flex items-center gap-2 mb-3">
          <BiQrScan className="w-5 h-5 text-accent-teal" />
          <h3 className="font-semibold text-text-primary">How to Scan</h3>
        </div>
        <ol className="text-sm text-text-secondary space-y-2 list-decimal list-inside">
          <li>Open <span className="text-text-primary font-medium">WhatsApp</span> on your phone</li>
          <li>
            Tap <span className="text-text-primary font-medium">Menu</span> or <span className="text-text-primary font-medium">Settings</span>
          </li>
          <li>
            Tap <span className="text-text-primary font-medium">Linked Devices</span>
          </li>
          <li>
            Tap <span className="text-text-primary font-medium">Link a Device</span>
          </li>
          <li>Point your phone at this screen to scan the QR code</li>
        </ol>
      </div>

      {/* Waiting Status */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-sm text-text-muted bg-elegant-elevated px-4 py-2 rounded-full">
          <RiLoader2Fill className="w-4 h-4 animate-spin text-accent-purple" />
          <span>Waiting for QR code scan...</span>
        </div>
      </div>
    </div>
  );
}
