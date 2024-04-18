import React from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_TASK_MUTATION } from '../../../graphql/queries/mutations';
import { formatUpdateTask } from '../../../graphql/schemas/schemas';
import Lanes from '../Lanes';
import TaskCard from '../TaskCard';
import _ from 'lodash';

const CardView = ({ statusData, data, setData, handleTaskDelete, handleTaskEdit, }) => {

    // Función para manejar el inicio del arrastre
    const handleDragStart = (event, taskId) => {
        event.dataTransfer.setData('taskId', taskId);
    };

    // Función para permitir soltar en un componente Lanes
    const handleDragOver = (event) => {
        event.preventDefault(); // Permite soltar
    };

    // Función para manejar el evento de soltar
    const handleDrop = async (event, targetLaneName) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('taskId');

        // Encuentra la tarea que se está arrastrando
        const draggedTask = data.find(task => task.id === taskId);

        // Si la tarea se encuentra, actualiza su status
        if (draggedTask) {
            // Actualiza el status de la tarea
            const updatedTask = { ...draggedTask, status: targetLaneName };

            const result = await handleUpdateTaskStatus({ info: updatedTask });
            if (result) {
                // Actualiza el estado de las tareas
                setData((prevTasks) => prevTasks.map(task =>
                    task.id === taskId ? updatedTask : task
                ));
            }
        }
    };

    const [updateTask, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_TASK_MUTATION);
    const handleUpdateTaskStatus = async ({ info, status }) => {
        const body = {
            variables: {
                input: formatUpdateTask(info)
            }
        };
        try {
            const response = await updateTask(body);
            const updatedTask = response.data.updateTask;
            return true;
        } catch (err) {
            alert(`There was an error during task update (${err})`);
            console.error('Error updating task:', err);
            return false;
        }
    };

    return (
        <div className='main-content'>
            {statusData?.map((lane) => {
                const tasksLane = data?.filter(task => task.status === lane.name);
                const countLine = tasksLane?.length;
                return (
                    <Lanes
                        key={`lane-${lane.name}`}
                        name={lane.name}
                        countTasks={countLine}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, lane.name)}
                    >
                        {tasksLane?.map((task) => {
                            return (
                                <TaskCard
                                    key={`task-${task.id}`}
                                    task={task}
                                    handleTaskDelete={handleTaskDelete}
                                    handleTaskEdit={handleTaskEdit}
                                    handleDragStart={handleDragStart}
                                />
                            )
                        })}
                    </Lanes>
                )
            })}
        </div>
    )
}

export default CardView