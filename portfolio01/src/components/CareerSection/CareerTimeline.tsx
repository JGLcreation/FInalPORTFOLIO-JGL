import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Award, Users, Globe, Video } from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      year: "2025 – 2026",
      title: "Junior Full Stack Software Developer",
      subtitle: "Academic Client Project",
      description:
        "Developed a website as a Junior Full Stack Software Developer for a classmate's academic project, handling both front-end and back-end development to create a functional and user-friendly system.",
      icon: <Globe className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2024 – 2026",
      title: "Video Editor Assistant",
      subtitle: "Self-employed",
      description:
        "Edited videos for clients using CapCut and Filmora, creating engaging content with transitions, effects, subtitles, audio, and color adjustments while meeting client requirements and deadlines.",
      icon: <Video className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2023 – 2024",
      title: "Call Center Agent",
      subtitle: "BPO Industry",
      description:
        "Short experience as a Call Center Agent, assisting customers and handling inquiries in a professional and fast-paced setting.",
      icon: <Users className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2020 – 2021",
      title: "SPES Program (Local Government Office)",
      subtitle: "Encoder — Government Service",
      description:
        "Worked as an Encoder under the SPES Program at a Local Government Office, encoding and managing records of OFWs and private school scholar students through the SPES system while developing administrative and data management skills.",
      icon: <Award className="h-4 w-4 mr-2 text-primary" />,
    },
  ];

  return (
    <div id="career" className="relative">
      {/* Highlight color light background aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <ScrollTimeline
        events={careerEvents}
        title="Career Journey"
        subtitle="An evolving path of leadership, innovation, and impact"
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/25"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
        lightingBorder={true}
        highlightColor="#38bdf8"
      />
    </div>
  );
};

export default CareerTimeline;
