import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core';
import {
  IconDashboard,
  IconCalendarEvent,
  IconUser,
  IconVolume,
  IconLogout,
  IconPassword,
  Graph
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import Styles from "../styles/Settings.module.css"

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

export function NavbarSimple({ user,setDisplay,pending }) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Account Details');
  let data=[];

  {user.role === "ADMIN" || user.role === "SUPERADMIN" ? (
    data = [
    { link: `/${user.role.toLowerCase()}`, label: 'Dashboard', icon: IconDashboard },
    { link: '', label: 'Account Details', icon: IconUser },
    { link: '', label: 'CRM Integration', icon: IconPassword },
    { link: '', label: 'Google Calendar', icon: IconCalendarEvent },
    { link: '', label: 'Voice Recording', icon: IconVolume },
    { link: '', label: 'Password Change', icon: IconPassword },
    ]
    ) : (
    data = [
        { link: '', label: 'Account Details', icon: IconUser },
        { link: '', label: 'CRM Integration', icon: IconPassword },
        { link: '', label: 'Google Calendar', icon: IconCalendarEvent },
        { link: '', label: 'Voice Recording', icon: IconVolume },
        { link: '', label: 'Password Change', icon: IconPassword },
        ]
    )}

  const links = data.map((item) => (
    item.label === 'Dashboard' ? (
    <a
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          setActive(item.label);
          router.push(item.link);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
    </a>
        ):(
            <a
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
              event.preventDefault();
              setActive(item.label);
              setDisplay(item.label);
            }}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>
              {item.label}
              {/* check if any label is in pending array */}
              {pending.includes(item.label) ? (
                <Code style={{color:"white","backgroundColor":"red","marginLeft":"5px"}}>Pending</Code>
              ) : (
                <></>
              )}
            </span>
        </a>
        )
  ));

  return (
    <Navbar height={700} width={{ sm: 300 }} p="md" style={{"zIndex":"50"}} className={Styles.settingsLeft}>
      <Navbar.Section grow>
        {links}
      </Navbar.Section>
    </Navbar>
  );
}