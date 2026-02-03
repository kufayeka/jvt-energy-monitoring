"use client";

type DebugLinkProps = {
  url: string;
};

export default function DebugLink({ url }: DebugLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-gray-400 hover:text-blue-600 underline mt-1 inline-block"
    >
      Large View ↗
    </a>
  );
}
