import { useMemo, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { assistantKnowledge, assistantProfile } from "@/data/assistantKnowledge";
import { cn } from "@/lib/utils";

const starterPrompts = [
  "Tell me about Abdul",
  "What projects has he built?",
  "What are his skills?",
  "How can I contact him?",
];

const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);

const getResponse = (question) => {
  const queryTerms = normalize(question);
  if (queryTerms.length === 0) return assistantProfile.intro;

  const ranked = assistantKnowledge
    .map((entry) => {
      const searchable = [
        entry.category,
        entry.title,
        entry.answer,
        ...(entry.keywords || []),
      ].join(" ");
      const text = searchable.toLowerCase();
      const score = queryTerms.reduce(
        (total, term) => total + (text.includes(term) ? 1 : 0),
        0
      );

      return { ...entry, score };
    })
    .sort((a, b) => b.score - a.score);

  if (!ranked[0] || ranked[0].score === 0) return assistantProfile.fallback;

  return ranked[0].answer;
};

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenGreeting, setHasSeenGreeting] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: assistantProfile.intro,
    },
  ]);
  const inputRef = useRef(null);

  const showGreeting = !isOpen && !hasSeenGreeting;

  const suggestedPrompts = useMemo(
    () => starterPrompts.filter((prompt) => prompt !== messages.at(-1)?.text),
    [messages]
  );

  const openChat = () => {
    setIsOpen(true);
    setHasSeenGreeting(true);
    window.setTimeout(() => inputRef.current?.focus(), 100);
  };

  const closeChat = () => {
    setIsOpen(false);
    setHasSeenGreeting(true);
  };

  const sendMessage = (text = input) => {
    const question = text.trim();
    if (!question) return;

    const answer = getResponse(question);
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", text: question },
      { id: crypto.randomUUID(), role: "assistant", text: answer },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      {showGreeting && (
        <button
          type="button"
          onClick={openChat}
          className="max-w-[18rem] rounded-lg border border-border bg-card px-4 py-3 text-left shadow-lg backdrop-blur animate-fade-in"
          aria-label="Open Abdul's virtual assistant"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">Hi, I am here to help.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Ask me about Abdul's projects, experience, or skills.
              </p>
            </div>
          </div>
        </button>
      )}

      {isOpen && (
        <section
          className="w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
          aria-label="Abdul's virtual assistant chat"
        >
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2 text-left">
              <Bot className="h-5 w-5" />
              <div>
                <h2 className="text-sm font-semibold">Abdul's Assistant</h2>
                <p className="text-xs opacity-85">Portfolio guide</p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeChat}
              className="rounded-full p-1 transition-colors hover:bg-white/15"
              aria-label="Close chat"
              title="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[22rem] space-y-3 overflow-y-auto px-4 py-4 text-left">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[88%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                  message.role === "assistant"
                    ? "bg-secondary/50 text-foreground"
                    : "ml-auto bg-primary text-primary-foreground"
                )}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-border px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedPrompts.slice(0, 4).map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground transition-colors hover:bg-secondary/60"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <label className="sr-only" htmlFor="assistant-message">
                Message Abdul's virtual assistant
              </label>
              <input
                id="assistant-message"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Abdul..."
                className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="rounded-md bg-primary p-2 text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                aria-label="Send message"
                title="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={isOpen ? closeChat : openChat}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Close chat" : "Open Abdul's virtual assistant"}
        title={isOpen ? "Close chat" : "Chat with Abdul's assistant"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};
