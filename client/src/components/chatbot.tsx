import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

const quickActions = [
  "What treatments do you offer?",
  "How much does treatment cost?",
  "Which hospitals do you work with?",
  "How do I get started?",
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("treatment") && (lower.includes("offer") || lower.includes("what"))) {
    return "We offer a wide range of treatments across 7 categories:\n\n• **Cardiac** — Bypass surgery, valve replacement, angioplasty\n• **Orthopedic** — Knee/hip replacement, spinal fusion\n• **Oncology** — Chemotherapy, robotic surgery\n• **Fertility** — IVF, IUI\n• **Dental** — Implants, full mouth rehab\n• **Ophthalmology** — LASIK, cataract surgery\n• **Cosmetic** — Rhinoplasty, liposuction, hair transplant\n\nWould you like to explore costs? Try our Cost Estimator!";
  }

  if (lower.includes("cost") || lower.includes("price") || lower.includes("how much") || lower.includes("expensive")) {
    return "Treatment costs in India are typically **40-80% lower** than in the US, UK, or Canada. For example:\n\n• Heart bypass: ~$5,500 (vs $123,000 in US)\n• Knee replacement: ~$4,500 (vs $50,000 in US)\n• IVF: ~$3,000 (vs $23,000 in US)\n\nFor a personalized estimate, visit our **Cost Estimator** page — just click the link in the navigation!";
  }

  if (lower.includes("hospital") || lower.includes("which") && lower.includes("work")) {
    return "We partner with **50+ accredited hospitals** across 4 Indian cities:\n\n• **Chennai** — Apollo Hospitals, Fortis Malar, MIOT International\n• **Kochi** — Amrita Institute, Lakeshore Hospital, Aster Medcity\n• **Bangalore** — Narayana Health City, Manipal Hospital, Sakra World\n• **Hyderabad** — Yashoda Hospitals, AIG Hospitals, KIMS\n\nAll hospitals are JCI/NABH accredited. Visit our Hospitals page for more details!";
  }

  if (lower.includes("get started") || lower.includes("how do i") || lower.includes("process") || lower.includes("step")) {
    return "Getting started is easy! Here's our simple process:\n\n1. **Submit an Inquiry** — Fill out our contact form with your details\n2. **Free Consultation** — Our team reviews your case within 24 hours\n3. **Hospital Matching** — We recommend the best hospital and doctor\n4. **Travel Planning** — We arrange visa, flights, hotel, and transfers\n5. **Treatment** — You receive world-class care with our support throughout\n\nReady? Head to our Contact page to get started!";
  }

  if (lower.includes("safe") || lower.includes("safety") || lower.includes("risk")) {
    return "Absolutely! India is one of the **world's top 5 medical tourism destinations**. Here's why it's safe:\n\n• **JCI-accredited hospitals** meet the same standards as US/European facilities\n• **Highly trained doctors** — many trained at Mayo Clinic, Johns Hopkins, and other top institutions\n• **Low infection rates** comparable to Western hospitals\n• **2+ million medical tourists** visit India annually\n• Our team provides **24/7 on-ground support** throughout your stay\n\nYour health and safety are our top priority.";
  }

  if (lower.includes("visa") || lower.includes("travel document")) {
    return "Yes, we provide **complete visa assistance**! Here's what we handle:\n\n• Medical visa application guidance and documentation\n• Invitation letter from the hospital\n• Support with visa extensions if treatment requires longer stay\n• Most patients receive their medical visa within **5-7 business days**\n\nOur team will guide you through every step of the process.";
  }

  if (lower.includes("accommodation") || lower.includes("hotel") || lower.includes("stay") || lower.includes("where")) {
    return "We arrange comfortable accommodation near your hospital:\n\n• **Hospital guest houses** — affordable rooms within hospital campus\n• **Serviced apartments** — ideal for longer stays with family\n• **Hotels** — ranging from budget to luxury options\n• **Airport transfers** included in our packages\n\nAll accommodations are vetted and located within easy reach of your treatment hospital.";
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! 👋 Welcome to RRmedcare. I'm here to help you with information about medical tourism in India. You can ask me about:\n\n• Treatments we offer\n• Costs and savings\n• Our partner hospitals\n• How to get started\n• Visa and travel support\n\nHow can I help you today?";
  }

  if (lower.includes("thank")) {
    return "You're welcome! If you have any more questions, feel free to ask. When you're ready to take the next step, visit our Contact page or call us at **+971-4-XXX-XXXX**. We're here to help! 😊";
  }

  return "I'd love to help! For personalized assistance, please **fill out our contact form** or call us at **+971-4-XXX-XXXX**. Our patient coordinators are available 24/7 to answer your questions.\n\nYou can also ask me about treatments, costs, hospitals, visa assistance, or how to get started!";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: "Hello! 👋 I'm RRmedcare's virtual assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  let nextId = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextId.current++, role: "user", text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate slight delay
    setTimeout(() => {
      const botMsg: Message = { id: nextId.current++, role: "bot", text: getBotResponse(text) };
      setMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Open chat"
          data-testid="button-open-chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-xl border border-border bg-background shadow-2xl overflow-hidden" style={{ height: "480px" }} data-testid="chat-panel">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">RRmedcare Assistant</div>
                <div className="text-xs opacity-80">Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="hover:opacity-80" aria-label="Close chat" data-testid="button-close-chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                  data-testid={`chat-message-${msg.id}`}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickActions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-2.5 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                  data-testid={`button-quick-${q.slice(0, 10).toLowerCase().replace(/\s/g, '-')}`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage(input)}
              placeholder="Type a message..."
              className="text-sm"
              data-testid="input-chat-message"
            />
            <Button size="icon" onClick={() => sendMessage(input)} className="shrink-0" data-testid="button-send-chat">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
