// app/chat/page.tsx

// import { getMessagesForConversation } from "@/lib/chatApi";
import CustomerChatClient from "@/components/chat/ChatClient";
// import { getCurrentUser } from '@/lib/auth'; // Fungsi ini akan Anda buat nanti

export default async function CustomerChatPage() {
  // Dalam aplikasi nyata, Anda akan mendapatkan ID pelanggan dari sesi otentikasi
  // const user = await getCurrentUser();
  // const customerId = user.id;

  // Untuk demo, kita gunakan ID statis
  const customerId = "cust-123";

  // const initialMessages = await getMessagesForConversation(customerId);

  return (
    <div className="h-screen">
      {/* <CustomerChatClient
        customerId={customerId}
        initialMessages={initialMessages}
      /> */}
    </div>
  );
}
