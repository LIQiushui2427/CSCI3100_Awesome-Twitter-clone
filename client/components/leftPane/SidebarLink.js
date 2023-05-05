import { useRouter } from "next/router";

// Component that renders a sidebar link
// It receives props for the Icon, text, active status and click handler
const SidebarLink = ({ Icon, text, active, onPush }) => {
  const router = useRouter(); // Hook for accessing the Next.js router

  // CSS classes for the link element, depending on the active prop
  const linkClasses = `text-[#d9d9d9] flex items-center justify-center xl:justify-start text-2xl space-x-3 hoverAnimation ${active && "font-bold"}`;

  // Renders the link element with the appropriate Icon and text, and a click handler
  return (
    <div className={linkClasses} onClick={() => onPush(text)}>
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};

export default SidebarLink;
