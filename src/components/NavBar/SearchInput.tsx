import React, { useState } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = () => {
  const { push, query, pathname } = useRouter();

  const [searchTxt, setSearchTxt] = useState<string>();

  const onChangeHandler = (e: any) => {
    setSearchTxt(e.target.value);
  };
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    push({ pathname: `/vehicle/${searchTxt?.toUpperCase()}` });
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <TextField
        className='bg-white'
        id='nav-search-field'
        type='search'
        value={searchTxt}
        variant='outlined'
        placeholder='Search for Vehicles'
        size='small'
        color='primary'
        sx={{ width: 210 }}
        onChange={onChangeHandler}
        InputProps={{
          color: 'secondary',
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon color='success' />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchInput;
