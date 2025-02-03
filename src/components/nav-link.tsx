import {
  useLocation,
  type NavLinkProps,
  NavLink as RouterNavLink,
} from 'react-router-dom';
import React, { type ReactElement } from 'react';

type CustomNavLinkProps = NavLinkProps & {
  asChild?: boolean;
};

export function NavLink(props: CustomNavLinkProps) {
  const { asChild, children, ...rest } = props;
  const { pathname } = useLocation();

  if (asChild) {
    const child = React.Children.only(children) as ReactElement;
    return React.cloneElement(child, {
      'data-pathname': pathname === rest.to,
      className: `flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground data-[pathname=true]:text-foreground ${child.props.className || ''}`,
      ...rest,
    });
  }

  // Se asChild for false, renderiza o NavLink normalmente
  return (
    <NavLink
      data-pathname={pathname === rest.to}
      {...rest}
      className={({ isActive }) =>
        `flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground ${isActive ? 'text-foreground' : ''} ${rest.className || ''}`
      }
    />
  );
}
