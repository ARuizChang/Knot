import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="p-4 w-full bg-[var(--color-card)] border-t border-[var(--color-border)]">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-[var(--color-border)]"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--color-secondary)] text-[var(--color-text)] flex items-center justify-center border border-[var(--color-border)]"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">

                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="
              w-full rounded-lg px-3 py-2 text-sm
              bg-[var(--color-bg)] text-[var(--color-text)] 
              border border-[var(--color-border)]
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
            "
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`
              hidden sm:flex items-center justify-center rounded-full p-2
              border border-[var(--color-border)]
              ${imagePreview ? "bg-[var(--color-accent)] text-[var(--color-bg)]" : "bg-[var(--color-secondary)] text-[var(--color-text)]"}
            `}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 
                   1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 
                   3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 
                   0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 
                   1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 
                   0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                    </button>
                </div>

                <button
                    type="submit"
                    className="
            flex items-center justify-center rounded-full p-2
            bg-[var(--color-accent)] text-[var(--color-bg)]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
                    disabled={!text.trim() && !imagePreview}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 
                 12 59.768 59.768 0 0 1 3.27 20.875L5.999 
                 12Zm0 0h7.5"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};
export default MessageInput;
