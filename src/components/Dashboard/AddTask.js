import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '../../graphql/queries/mutations';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { StickyNote2 as StickyNote2Icon } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import SelectCustom from '../General/SelectCustom';
import { format, } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { formatCreateTask, formatUpdateTask } from '../../graphql/schemas/schemas';
import _ from 'lodash';

const newTask = {
    name: "",
    dueDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    pointEstimate: "",
    tags: [],
    assigneeId: "",
    status: "",
};

const AddTask = ({ open, handleClose, setIsLoading, infoEdit = newTask,
    tagsData, pointsData, statusData, usersData, tasksData, setTasksData,
}) => {

    const [createTask, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_TASK_MUTATION);
    const [updateTask, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_TASK_MUTATION);

    const [taskInfo, setTaskInfo] = useState(infoEdit || newTask);

    useEffect(() => {
        if (infoEdit) {
            if (infoEdit.dueDate) {
                const pattern = 'yyyy-MM-dd HH:mm:ss';
                const timeZone = 'UTC';

                const zonedDate = toZonedTime(new Date(infoEdit.dueDate), timeZone);
                const outputDueDate = format(zonedDate, pattern, { timeZone });
                infoEdit = { ...infoEdit, dueDate: outputDueDate };
            }
            setTaskInfo(infoEdit)
        } else {
            setTaskInfo(newTask)
        }
    }, [infoEdit]);

    const cleanInfo = () => {
        setTaskInfo(newTask)
        handleClose()
    }

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            if (taskInfo?.id) {
                const body = {
                    variables: {
                        input: formatUpdateTask(taskInfo)
                    }
                };
                await handleUpdateTask(body);
            } else {
                const body = {
                    variables: {
                        input: formatCreateTask(taskInfo)
                    }
                };
                await handleCreateTask(body);
            }
        } catch (err) {
            console.error('Error creating task:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTask = async (body) => {
        try {
            const response = await createTask(body);
            if (createError) {
                alert("There was an error saving the task");
            } else {
                alert("Task saved successfully!");
                let updData = _.cloneDeep(tasksData);
                updData.push(response.data.createTask);
                setTasksData(updData);
                cleanInfo();
            }
        } catch (err) {
            alert(`There was an error saving the task (${err})`);
            console.error('Error creating task:', err);
        }
    };

    const handleUpdateTask = async (body) => {
        try {
            const response = await updateTask(body);
            const updatedTask = response.data.updateTask;
            if (updateError) {
                alert("There was an error during task update");
            } else {
                alert("Task updated successfully!");
                let updData = _.cloneDeep(tasksData);
                const updatedDataNew = updData.map(task => {
                    if (task.id === updatedTask.id) {
                        return { ...task, ...updatedTask };
                    }
                    return task;
                });
                setTasksData(updatedDataNew);
                cleanInfo();
            }
        } catch (err) {
            alert(`There was an error during task update (${err})`);
            console.error('Error updating task:', err);
        }
    };

    const handleChangeAssignee = (event) => {
        if (taskInfo?.id) {
            const updatedAssignee = { ...taskInfo.assignee, id: event.target.value };
            setTaskInfo({ ...taskInfo, assignee: updatedAssignee, assigneeId: event.target.value });
        } else {
            setTaskInfo({ ...taskInfo, assigneeId: event.target.value });
        }
    }

    return (
        <Modal
            open={open}
            onClose={cleanInfo}
        >
            <Box className="container-modal">
                <form onSubmit={handleSave}>
                    <Card sx={{ borderRadius: "15px", }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ width: 25, height: 25, bgcolor: "#00009e", }}>
                                    <StickyNote2Icon sx={{ fontSize: '1.2rem' }} />
                                </Avatar>
                            }
                            title="New task"
                        />
                        <CardContent>
                            <Grid container spacing={{ xs: 1 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        className='custom-input'
                                        size="small"
                                        value={taskInfo.name}
                                        onChange={(event) => setTaskInfo({ ...taskInfo, name: event.target.value })}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectCustom
                                        title={"Points"}
                                        options={pointsData}
                                        keyValue={"name"}
                                        keyLabel={"name"}
                                        value={taskInfo.pointEstimate}
                                        handleChange={(event) => { setTaskInfo({ ...taskInfo, pointEstimate: event.target.value }) }}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Dead Line"
                                        className='custom-input'
                                        size="small"
                                        value={taskInfo.dueDate}
                                        type='datetime-local'
                                        onChange={(event) => setTaskInfo({ ...taskInfo, dueDate: event.target.value })}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectCustom
                                        title={"Tags"}
                                        type={"multiple"}
                                        options={tagsData}
                                        keyValue={"name"}
                                        keyLabel={"name"}
                                        value={taskInfo.tags}
                                        handleChange={(event) => { setTaskInfo({ ...taskInfo, tags: event.target.value }) }}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectCustom
                                        title={"Status"}
                                        options={statusData}
                                        keyValue={"name"}
                                        keyLabel={"name"}
                                        value={taskInfo.status}
                                        handleChange={(event) => { setTaskInfo({ ...taskInfo, status: event.target.value }) }}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectCustom
                                        title={"Assignee"}
                                        options={usersData}
                                        keyValue={"id"}
                                        keyLabel={"fullName"}
                                        value={taskInfo?.id ? taskInfo.assignee.id : taskInfo.assigneeId}
                                        handleChange={handleChangeAssignee}
                                        required={true}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions disableSpacing sx={{ pl: 2, pb: 2, }}>
                            <Button variant="outlined" size="small" type='submit'>
                                save
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Modal>
    );
}

export default AddTask