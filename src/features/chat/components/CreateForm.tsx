import { useForm } from "react-hook-form";
import Input from "../../../core/components/Input";
import type {
  ContactCredentials,
  WhatsappQRCodeResponse,
} from "../types/chatTypes";
import { useCreateContact } from "../hooks/useCreateContact";
import Modal from "../../../core/components/Modal";
import { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import QrModal from "./QrModal";
import { FiPhone } from "react-icons/fi";

export default function CreateForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (id?: string) => void;
}) {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [whatsappId, setWhatsappId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactCredentials>({
    defaultValues: {
      displayName: "",
    },
  });

  useEffect(() => {
    socket.on("whatsapp:qr", (data: WhatsappQRCodeResponse) => {
      setWhatsappId(data.whatsappNumberId);
      setQrCode(data.qrCode);
      console.log(data);
    });

    return () => {
      socket.off("whatsapp:qr");
    };
  }, []);

  const { mutateAsync: create } = useCreateContact();
  const onSubmit = async (data: ContactCredentials) => {
    await create(data);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isSubmitting) onClose(whatsappId!);
        setQrCode(null);
      }}
    >
      <div>
        {qrCode ? (
          qrCode && <QrModal qrCode={qrCode} />
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-accent-purple to-accent-blue rounded-full mb-4 shadow-elegant-purple">
                <FiPhone className="w-7 h-7 text-text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Create WhatsApp Agent
              </h2>
              <p className="text-sm text-text-muted">
                Add a new WhatsApp number to monitor
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Display Name"
                name="displayName"
                placeholder="e.g., Sales Team - Main Number"
                type="text"
                required
                register={register}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-purple hover:bg-accent-blue text-text-primary font-semibold py-3 rounded-lg transition-all duration-300 hover-elegant shadow-elegant-purple disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black-600"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Agent...
                  </span>
                ) : (
                  "Create Agent"
                )}
              </button>
            </form>

            {/* Info Note */}
            <div className="bg-elegant-elevated border border-elegant-purple rounded-lg p-4">
              <p className="text-xs text-text-muted text-center">
                After creating, you'll receive a QR code to link your WhatsApp account
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
