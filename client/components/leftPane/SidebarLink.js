import { useRouter } from "next/router";

const SidebarLink = ({ Icon, text, active, routelink = "/" }) => {
  const router = useRouter();

  const handleClick = () => {
    /*if (active) {
      router.push("/");
    }*/
    router.push(routelink);
  };

  const linkClasses = `text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"}`;

  return (
    <div className={linkClasses} onClick={handleClick}>
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};

export default SidebarLink;