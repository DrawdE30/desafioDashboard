import React from 'react'

const Lanes = ({ name, countTasks, children, }) => {
    return (
        <div className='content-lanes'>
            <h2>{`${name} (${countTasks < 9 ? '0' : ''}${countTasks})`}</h2>
            <div className='body-lanes'>{children}</div>
        </div>
    )
}

export default Lanes