import Link from "next/link";
import React from "react";
import styled from "styled-components";

const links = [
  {
    href: "//github.com/fozziethebeat/surface-coop-beer",
    label: "Github",
    key: "",
  },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const StyledNav = styled.nav`
  text-align: center;
`;

const OuterList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.75rem;
`;

const ListItem = styled.li`
  display: flex;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 1rem;
`;

const InnerList = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled.a`
  color: rgba(59, 130, 246);
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-decoration: none;
`;

const Nav = () => (
  <StyledNav>
    <OuterList>
      <ListItem>
        <Link href="/" passHref>
          <NavLink>Home</NavLink>
        </Link>
      </ListItem>
      <InnerList>
        {links.map(({ key, href, label }) => (
          <ListItem key={key}>
            <Link href={href} passHref>
              <NavLink>{label}</NavLink>
            </Link>
          </ListItem>
        ))}
      </InnerList>
    </OuterList>
  </StyledNav>
);

export default Nav;
