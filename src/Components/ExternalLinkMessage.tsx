import { ReactNode } from "react";
import { ExternalLink } from "react-feather";
import { cn } from "../utils/classnames";
import { linkColor } from "../utils/sharedClassNames";

export type ExternalLinkMessageProps = {
  url: string;
  children: string | ReactNode;
  urlText: string | ReactNode;
  icon?: string | ReactNode;
};

export function ExternalLinkMessage({
  url,
  children,
  urlText,
  icon,
}: ExternalLinkMessageProps) {
  const IconComponent: ReactNode =
    (icon && typeof icon == "object" && icon) ?? undefined;
  return (
    <div>
      <div>{children}</div>
      <a
        href={url}
        target="_blank"
        className={cn(
          "flex gap-1 items-center mt-1 hover:underline",
          linkColor
        )}
      >
        {icon && typeof icon == "string" && (
          <img className="h-7 me-1" src={icon} role="presentation" />
        )}
        {icon ? IconComponent : null}
        <span>{urlText}</span>
        <ExternalLink className="h-4 rtl:scale-x-[-1]" />
      </a>
    </div>
  );
}
