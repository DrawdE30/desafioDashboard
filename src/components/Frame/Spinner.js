import React from 'react'

const Spinner = ({ loading = false, title = "Cargando ..." }) => {
    return (
        loading && (
            <div className="spinner-full-screen-cover">
                <span className="spinner-loader"></span>
                {title && (
                    <p>{title}</p>
                )}
            </div>
        )
    )
}

export default Spinner