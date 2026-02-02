function Loader({ isLoading }) {
    return (
        <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
            <div className="loader-content">
                {/* <div className="loader-logo">NV</div> */}
                <div className="loader-bar">
                    <div className="loader-progress"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader
