import React, { useState } from 'react';
import { MoreHoriz as MoreHorizIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';

const ActionsButton = ({ task, handleTaskDelete, handleTaskEdit }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="task-actions">
            <IconButton className='actions' onClick={handleClick}>
                <MoreHorizIcon fontSize='inherit' />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleTaskEdit({ info: task })} style={{ padding: "2px 7px", }}>
                    <ListItemIcon style={{ padding: 0, }}>
                        <EditIcon fontSize="inherit" />
                    </ListItemIcon>
                    <Typography fontSize={'13px'} variant="inherit">Edit</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleTaskDelete({ id: task.id })} style={{ padding: "2px 7px", }}>
                    <ListItemIcon style={{ padding: 0, }}>
                        <DeleteIcon fontSize="inherit" />
                    </ListItemIcon>
                    <Typography fontSize={'13px'} variant="inherit">Delete</Typography>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default ActionsButton