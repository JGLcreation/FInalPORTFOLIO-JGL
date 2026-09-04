import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export const KNOWLEDGE_BASE = {
  name: "Jayson Gerona Lozada",
  shortName: "Jayson",
  role: "Information Technology Student & Junior Full Stack Software Developer",
  school: "Davao del Sur State College (BSIT, 2024–2026)",
  highSchool: "Matti National High School (STEM, 2020–2024)",
  location: "Digos City, Davao del Sur, Philippines",
  email: "jaysongeronlozada@gmail.com",
  phone: "0931 043 3639",
  facebook: "https://www.facebook.com/share/18BLpYXmsQ/",
  github: "https://github.com/JGLcreation",
  bio: "Jayson is an Information Technology student who values hard work, perseverance, and continuous learning. Coming from a humble background, he balances his studies with personal responsibilities, which has strengthened his determination and work ethic.",
  skills: [
    "Frontend: React.js, Next.js, HTML5, CSS3, JavaScript",
    "Backend: PHP, Laravel, Supabase, Laragon, Java, CRUD Operations",
    "Database: MySQL, Supabase, Cloud SQL Server, Database Design, Query Optimization",
    "Analytics: R Programming, SQL Querying",
    "Tools: Git, GitHub, VS Code, Lovable, Google Studio, Antigravity, Figma, Canva, CapCut"
  ],
  projects: [
    "WereChat – COIL Global Web Design Project (React/Next.js, Supabase, Vercel)",
    "CineVerse Hub – Personal System Project (Remix Framework, React.js, Supabase)",
    "Re-Syn T-H System – Academic Client Project (HTML, CSS, JS, Supabase, Vercel)",
    "Hiram Hub System – Academic Borrowing Project (PHP, JS, Supabase, Vercel)"
  ],
  experience: [
    "2025–2026: Junior Full Stack Software Developer (Academic Project for a classmate)",
    "2024–2026: Night Market Vendor — Shoe Selling (Customer service, sales, cash handling)",
    "2023–2024: Call Center Agent (Customer inquiries & professional communication)",
    "2020–2021: SPES Program, Local Government Office (Data encoder for OFWs and scholar students)"
  ],
  awards: [
    "COIL Global Web Design Participation (2026)",
    "Online Startup Pitching Competition – Provincial Level, South Cotabato (2024)",
    "Academic Engagement Recognition – DavSu State College (2026)",
    "Outstanding Technical Support Award (2026)"
  ],
  certificates: [
    "COIL Global Web Design (awards1.png)",
    "Orientation Caravan — NRCP (awards2.png)",
    "Academic Engagement Recognition (awards3.png)"
  ]
};

function answerQuery(query: string): string {
  const q = query.toLowerCase().trim();

  if (q.includes("who are you") || q.includes("what is your name") || q.includes("introduce")) {
    return `Hello! I'm the AI Assistant for Jayson Gerona Lozada. Jayson is an Information Technology student at Davao del Sur State College and a Junior Full Stack Software Developer based in Digos City, Philippines.`;
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire") || q.includes("number")) {
    return `You can reach Jayson through:
• Email: jaysongeronlozada@gmail.com
• Phone: 0931 043 3639
• Facebook: Jayson Gerona Lozada
• Location: Digos City, Davao del Sur, Philippines
You can also fill out the Contact form on this portfolio!`;
  }
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("languages") || q.includes("framework")) {
    return `Jayson's technical arsenal includes:
• Frontend: React.js, Next.js, JavaScript, HTML5, CSS3
• Backend: PHP, Laravel, Supabase, Java, Laragon
• Databases: MySQL, Supabase, Cloud SQL Server
• Analytics & Tools: R Programming, Git, GitHub, VS Code, Figma, Canva, CapCut`;
  }
  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("werechat") || q.includes("cineverse") || q.includes("hiram") || q.includes("re-syn")) {
    return `Jayson has built several notable systems:
1. WereChat – International COIL Global Web Design platform (React, Next.js, Supabase)
2. CineVerse Hub – Interactive movie system using Remix Framework & Supabase
3. Re-Syn T-H System – Full-stack academic client application
4. Hiram Hub System – Academic borrowing and resource management system (PHP & Supabase)
All projects have live demos and GitHub repositories linked in the Projects section!`;
  }
  if (q.includes("education") || q.includes("school") || q.includes("college") || q.includes("study") || q.includes("degree")) {
    return `Jayson's educational background:
• BS in Information Technology (BSIT) – Davao del Sur State College (2024–2026, Currently Enrolled)
• STEM Strand – Matti National High School (2020–2024, Graduated with strong foundation in math and science)`;
  }
  if (q.includes("experience") || q.includes("job") || q.includes("career") || q.includes("history") || q.includes("vendor") || q.includes("call center") || q.includes("spes")) {
    return `Jayson's work and life experience:
• 2025–2026: Junior Full Stack Developer (full-stack academic project delivery)
• 2024–2026: Night Market Vendor (shoe selling, customer service, cash handling, patience)
• 2023–2024: Call Center Agent (customer support in fast-paced setting)
• 2020–2021: SPES Program Encoder (LGU government record management for scholars and OFWs)`;
  }
  if (q.includes("award") || q.includes("achievement") || q.includes("certificate") || q.includes("recognition")) {
    return `Jayson's recognitions and certificates:
• COIL Global Web Design Participation (2026)
• Online Startup Pitching Competition — Provincial Level, South Cotabato (2024)
• Academic Engagement Recognition — DavSu State College (2026)
• Outstanding Technical Support (2026)
• Certificates verified from NRCP Orientation Caravan and COIL program.`;
  }
  if (q.includes("about") || q.includes("bio") || q.includes("background") || q.includes("values")) {
    return `Jayson comes from a humble background, which instilled in him deep perseverance, strong work ethics, and adaptability. He balances his IT studies with personal responsibilities and is always eager to learn modern technologies and collaborate on innovative projects.`;
  }
  if (q.includes("github") || q.includes("facebook") || q.includes("social")) {
    return `Find Jayson online:
• GitHub: https://github.com/JGLcreation
• Facebook: https://www.facebook.com/share/18BLpYXmsQ/`;
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("good day") || q.includes("kumusta")) {
    return `Hello! How can I assist you with Jayson's background, technical skills, projects, or contact information today?`;
  }

  return `Thanks for asking! Jayson is a dedicated IT student and Junior Full Stack Developer experienced with React, PHP, Supabase, and MySQL. You can ask me about his projects (WereChat, CineVerse, Hiram Hub), education (DavSu State College), work experience, skills, or contact info!`;
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! I'm JGL AI Assistant. Feel free to ask me anything about Jayson's resume, technical skills, projects, education, or how to contact him!",
      timestamp: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const replyText = answerQuery(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const quickPrompts = [
    "What are your main technical skills?",
    "Tell me about your projects",
    "What is your work experience?",
    "How can I contact Jayson?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Trigger Button Matching the User's Image Style */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-all border border-blue-400/40"
            aria-label="Open JGL AI Assistant"
          >
            {/* Avatar matching media_1788525193176.png */}
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/80 shrink-0 bg-blue-700 flex items-center justify-center">
              <img
                src="/profile.jpg"
                alt="JGL"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <span>JGL AI ASSISTANT</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[90vw] sm:w-[380px] h-[520px] rounded-[2rem] bg-card/95 backdrop-blur-2xl border border-border shadow-2xl flex flex-col overflow-hidden text-foreground"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 via-primary to-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 shadow-md">
                  <img
                    src="/profile.jpg"
                    alt="JGL"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-tight">JGL AI Assistant</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-blue-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Online • Ask about Jayson</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Prompts Bar */}
            <div className="p-2 border-b border-border/60 bg-muted/30 overflow-x-auto flex gap-1.5 scrollbar-none">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-foreground/5 hover:bg-primary/20 hover:text-primary whitespace-nowrap transition-colors border border-border/40"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground font-bold"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] whitespace-pre-line leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted/70 text-foreground border border-border/60 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1.5 text-right opacity-60 ${
                        msg.sender === "user" ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 rounded-2xl bg-muted/60 border border-border/60 rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-border/60 bg-muted/20 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, experience..."
                className="flex-1 bg-foreground/5 border border-border/60 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/60"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-sm"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
