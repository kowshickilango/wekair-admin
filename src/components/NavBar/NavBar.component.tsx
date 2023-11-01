import { ShoppingBagOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import Logo from '../Logo';
import SearchInput from './SearchInput';

const NavBar = () => {
  return (
    <Box
      width={1}
      bgcolor='primary.main'
      position='sticky'
      top={0}
      zIndex={100}
      px={6}
      py={2}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        mx='auto'
      >
        <Logo />
        <SearchInput />

      </Stack>
    </Box>
  );
};

export default NavBar;
