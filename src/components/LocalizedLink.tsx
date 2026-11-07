import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  type LinkProps,
  type NavLinkProps,
} from "react-router-dom";
import { localizedPath, useLang } from "../i18n";
export function Link({ to, ...props }: LinkProps) {
  const { lang } = useLang();
  return (
    <RouterLink
      {...props}
      to={typeof to === "string" ? localizedPath(to, lang) : to}
    />
  );
}
export function NavLink({ to, ...props }: NavLinkProps) {
  const { lang } = useLang();
  return (
    <RouterNavLink
      {...props}
      to={typeof to === "string" ? localizedPath(to, lang) : to}
    />
  );
}
