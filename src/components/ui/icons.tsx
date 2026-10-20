import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/**
 * Wraps a 24px stroke icon path set with shared defaults.
 */
function Icon({ size = 18, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/**
 * Arrow pointing up and to the right, used for external links.
 */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Icon>
  );
}

/**
 * Arrow pointing right, used for internal navigation.
 */
export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}

/**
 * Arrow pointing down, used for downloads.
 */
export function DownloadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </Icon>
  );
}

/**
 * Envelope icon for email links.
 */
export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </Icon>
  );
}

/**
 * LinkedIn mark drawn as a simple outlined glyph.
 */
export function LinkedInIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </Icon>
  );
}

/**
 * Sun icon for the light theme option.
 */
export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Icon>
  );
}

/**
 * Moon icon for the dark theme option.
 */
export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </Icon>
  );
}

/**
 * Hamburger icon for opening the mobile menu.
 */
export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 8h16M4 16h16" />
    </Icon>
  );
}

/**
 * Cross icon for closing menus and dialogs.
 */
export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

/**
 * Lock icon for private project links.
 */
export function LockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Icon>
  );
}

/**
 * Sparkle icon for the portfolio assistant.
 */
export function SparkleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" />
    </Icon>
  );
}

/**
 * Paper plane icon for sending messages.
 */
export function SendIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
    </Icon>
  );
}

/**
 * Play triangle for video previews.
 */
export function PlayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/**
 * Check mark for success states.
 */
export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icon>
  );
}

/**
 * Alert triangle for warnings and errors.
 */
export function AlertIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4 2.8 19.5h18.4L12 4Z" />
      <path d="M12 10v4M12 17v.01" />
    </Icon>
  );
}
