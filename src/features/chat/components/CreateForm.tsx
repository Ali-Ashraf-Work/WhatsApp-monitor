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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="name"
              name="displayName"
              placeholder="Aly - Sales Team"
              type="text"
              required
              register={register}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
