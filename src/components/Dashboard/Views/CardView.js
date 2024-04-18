import React from 'react'
import Lanes from '../Lanes';
import TaskCard from '../TaskCard';

const CardView = ({
    statusData, resultSearch,
    handleTaskDelete, handleTaskEdit,
}) => {
    return (
        <div className='main-content'>
            {statusData?.map((lane) => {
                const tasksLane = resultSearch?.filter(task => task.status === lane.name);
                const countLine = tasksLane?.length;
                return (
                    <Lanes
                        key={`lane-${lane.name}`}
                        name={lane.name}
                        countTasks={countLine}
                    >
                        {tasksLane?.map((task) => {
                            return (
                                <TaskCard key={`task-${task.id}`} task={task} handleTaskDelete={handleTaskDelete} handleTaskEdit={handleTaskEdit} />
                            )
                        })}
                    </Lanes>
                )
            })}
        </div>
    )
}

export default CardView