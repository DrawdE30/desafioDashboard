import React from 'react'

const UserCard = ({ user }) => {
    return (
        <div className="card-user">
            <div className="card-user-image">
                <img src={user.avatar} className="picture" alt="Dev" />
            </div>
            <div className="card-user-body">
                <h2>{user.fullName}</h2>
                <p>{user.email}</p>
                <p>{user.type}</p>
            </div>
        </div>
    )
}

export default UserCard