import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '@/context/ui';
import Link from 'next/link';

export const Navbar: FC = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={openSideMenu} size="large" edge="start">
          <MenuOutlinedIcon />
        </IconButton>
        <Link href={'/'} style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h6">Jira Labs</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
