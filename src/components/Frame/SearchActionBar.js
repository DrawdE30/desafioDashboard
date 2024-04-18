import React from 'react'
import { TextField, IconButton, Avatar, } from '@mui/material';
import { Search as SearchIcon, NotificationsOutlined as NotificationsIcon, } from '@mui/icons-material';

const SearchActionBar = ({ search, setSearch, }) => {
    return (
        <div className='bar-search' >
            <IconButton edge="start" style={{ color: "#f5f6fa", marginLeft: "1px", }}>
                <SearchIcon style={{ fontSize: "20px" }} />
            </IconButton>
            <TextField
                fullWidth
                variant="standard"
                placeholder="Search"
                InputProps={{
                    disableUnderline: true,
                    style: { marginLeft: 10, marginRight: 10, color: "#f5f6fa", fontSize: "12px", }
                }}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <IconButton style={{ color: "#f5f6fa" }}>
                <NotificationsIcon style={{ fontSize: "20px" }} />
            </IconButton>
            <Avatar src="https://w1.pngwing.com/pngs/936/783/png-transparent-glasses-user-avatar-computer-program-data-user-interface-eyewear-facial-expression-thumbnail.png" style={{ width: 30, height: 30 }} />
        </div>
    )
}

export default SearchActionBar