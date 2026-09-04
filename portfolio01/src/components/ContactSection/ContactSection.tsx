import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Github, Facebook } from "lucide-react";
import { LightningContactIcon } from "./LightningContactIcon";
import { Input } from "../lightswind/input";
import { Textarea } from "../lightswind/textarea";
import { Button } from "../lightswind/button";

export const ContactSection = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-5 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] border border-foreground/10 relative overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-10 md:gap-24">
          
          {/* Contact Info */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Let's <span className="text-gradient-primary">Connect</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Currently open for new opportunities and exciting collaborations. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {/* 1. Email - Green Lightning */}
              <a href="mailto:jaysongeronlozada@gmail.com" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                <LightningContactIcon
                  icon={Mail}
                  color="#22c55e"
                  glowColor="#4ade80"
                  sparkColor="#86efac"
                  hoverColorClass="border-emerald-500"
                  textColorClass="text-emerald-400"
                />
                <span className="font-medium text-xs sm:text-sm md:text-base break-all group-hover:text-emerald-400 transition-colors">jaysongeronlozada@gmail.com</span>
              </a>

              {/* 2. GitHub - Red Lightning */}
              <a href="https://github.com/JGLcreation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                <LightningContactIcon
                  icon={Github}
                  color="#ef4444"
                  glowColor="#f87171"
                  sparkColor="#fca5a5"
                  hoverColorClass="border-red-500"
                  textColorClass="text-red-400"
                />
                <span className="font-medium text-xs sm:text-sm md:text-base group-hover:text-red-400 transition-colors">JGLcreation</span>
              </a>

              {/* 3. Facebook - Blue Lightning */}
              <a href="https://www.facebook.com/share/18BLpYXmsQ/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                <LightningContactIcon
                  icon={Facebook}
                  color="#3b82f6"
                  glowColor="#60a5fa"
                  sparkColor="#93c5fd"
                  hoverColorClass="border-blue-500"
                  textColorClass="text-blue-400"
                />
                <span className="font-medium text-xs sm:text-sm md:text-base group-hover:text-blue-400 transition-colors">Jayson Gerona Lozada</span>
              </a>

              {/* 4. Phone - Pink Lightning */}
              <a href="tel:+639310433639" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                <LightningContactIcon
                  icon={Phone}
                  color="#ec4899"
                  glowColor="#f472b6"
                  sparkColor="#f9a8d4"
                  hoverColorClass="border-pink-500"
                  textColorClass="text-pink-400"
                />
                <span className="font-medium text-xs sm:text-sm md:text-base group-hover:text-pink-400 transition-colors">0931 043 3639</span>
              </a>

              {/* 5. Location - Yellow Lightning */}
              <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                <LightningContactIcon
                  icon={MapPin}
                  color="#eab308"
                  glowColor="#facc15"
                  sparkColor="#fde047"
                  hoverColorClass="border-yellow-500"
                  textColorClass="text-yellow-400"
                />
                <span className="font-medium text-xs sm:text-sm md:text-base group-hover:text-yellow-400 transition-colors">Digos City, Davao del Sur, Philippines</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 glass-panel p-5 sm:p-8 rounded-[1.8rem] sm:rounded-[2rem] border border-foreground/10 relative">
            <form className="space-y-4 sm:space-y-5" action="https://formsubmit.co/jaysongeronlozada@gmail.com" method="POST">
              {/* FormSubmit Configuration for the Table View Email */}
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Your Name</label>
                <Input 
                  type="text" 
                  name="name"
                  required
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Your Email</label>
                <Input 
                  type="email" 
                  name="email"
                  required
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Subject</label>
                <Input 
                  type="text" 
                  name="subject"
                  required
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="Project inquiry / collaboration"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                <Textarea 
                  name="message"
                  required
                  rows={4}
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary resize-none placeholder:text-muted-foreground/50 min-h-[120px]"
                  placeholder="How can I help you?"
                />
              </div>

              <Button type="submit" size="lg" className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] mt-4 h-12 cursor-pointer">
                Send Message <Send className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
