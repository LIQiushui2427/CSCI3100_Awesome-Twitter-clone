import Link from "next/link";

/**
 * Navigate component renders a clickable navigation element with a title and url
 * @param title - The title displayed in the navigation element
 * @param url - The url the navigation element links to
 */
export default function Navigate({title='Tweet',url='/'}) {
  return (
    <div className="flex  pb-2 max-w-sm">
      {/* Link component from Next.js used for client-side navigation */}
      <Link href={url}>
        <div className="p-2 hover:bg-gray-800 rounded-full items-center cursor-pointer">
          {/* SVG icon displayed in the navigation element */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </div>
      </Link>
      {/* Title displayed next to the navigation element */}
      <div className="text-xl font-bold pl-5">{title}</div>
    </div>
  );
}
