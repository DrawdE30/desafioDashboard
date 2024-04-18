import React from 'react';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { evaluateDate, POINTS_MAP } from '../../utils/functions';
import ActionsButton from './TaskCard/ActionsButton';

const TaskCard = ({ task, handleTaskDelete, handleTaskEdit, handleDragStart, }) => {
    const assignee = task.assignee;
    const tags = task.tags;
    const statusTask = evaluateDate(task.dueDate);

    // Agrega la función de arrastre al componente
    const onDragStart = (event) => {
        handleDragStart(event, task.id);
    };

    return (
        <div
            className="task-card"
            draggable
            onDragStart={onDragStart}
        >
            <div className="task-header">
                <h3 className="task-title">{task.name}</h3>
                <ActionsButton
                    task={task}
                    handleTaskDelete={handleTaskDelete}
                    handleTaskEdit={handleTaskEdit}
                />
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