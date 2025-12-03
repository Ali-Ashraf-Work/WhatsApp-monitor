import { RiLoader2Fill } from "react-icons/ri";

export default function QrModal({ qrCode }: { qrCode?: string }) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="inline-block p-4 bg-white border-4 border-green-500 rounded-2xl">
          {qrCode ? (
            <img src={qrCode} alt="QR Code" className="w-64 h-64" />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center">
              <RiLoader2Fill className="w-12 h-12 animate-spin text-green-500" />
            </div>
          )}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">📱 How to Scan:</h3>
        <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
          <li>Open WhatsApp on your phone</li>
          <li>
            Tap <strong>Menu</strong> or <strong>Settings</strong>
          </li>
          <li>
            Tap <strong>Linked Devices</strong>
          </li>
          <li>
            Tap <strong>Link a Device</strong>
          </li>
          <li>Point your phone at this screen to scan the QR code</li>
        </ol>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <RiLoader2Fill className="w-4 h-4 animate-spin" />
          <span>Waiting for QR code scan...</span>
        </div>
      </div>
    </div>
  );
}
