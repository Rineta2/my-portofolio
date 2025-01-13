import toast from "react-hot-toast";

export const handleEmailSubmit = async (
  e,
  selectedContact,
  setShowModal,
  setIsLoading
) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: selectedContact.email,
        subject: `Balasan untuk ${selectedContact.email}`,
        message: e.target.message.value,
        originalMessage: selectedContact.message,
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Email berhasil dikirim!");
      setShowModal(false);
      e.target.reset();
    } else {
      throw new Error(data.error || "Gagal mengirim email");
    }
  } catch (error) {
    toast.error(`Gagal mengirim email: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};
