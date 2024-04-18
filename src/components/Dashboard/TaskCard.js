import React, { useState } from 'react';
import { MoreHoriz as MoreHorizIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { evaluateDate, POINTS_MAP } from '../../utils/functions';

const TaskCard = ({ task, handleTaskDelete, handleTaskEdit }) => {
    const assignee = task.assignee;
    const tags = task.tags;
    const statusTask = evaluateDate(task.dueDate);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="task-card">
            <div className="task-header">
                <h3 className="task-title">{task.name}</h3>
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
            </div>

            <div className="task-body">
                <p className="task-score">{`${POINTS_MAP[task.pointEstimate]} Points`}</p>
                <p className={`task-deadline ${statusTask.toLowerCase()}`}><AccessAlarmIcon fontSize='inherit' /> {statusTask}</p>
            </div>
            <div className="task-tags">
                {tags?.map((tag) => {
                    return (
                        <span key={`tag-${tag}`} className={`tag ${tag}`}>{tag}</span>
                    )
                })}
            </div>
            <div className="task-footer">
                <img src={assignee.avatar} alt={assignee.fullName} title={assignee.fullName} className="avatar" />
                <div className="task-icons">
                    <button><AttachFileOutlinedIcon sx={{ fontSize: '15px' }} /></button>
                    <button><AccountTreeOutlinedIcon sx={{ fontSize: '15px' }} /></button>
                    <button><ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '15px' }} /></button>
                </div>
            </div>
        </div >
    )
}

export default TaskCard