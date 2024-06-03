
export const ToolsOffcanvas = () => {
    return (
        <>

            <div className="offcanvas offcanvas-end w-full max-w-80" data-bs-scroll="false" id="toolsOffcanvas" aria-labelledby="toolsOffcanvasLabel">
                <div className="offcanvas-header">
                    <h6 className="offcanvas-title font-bold" id="toolsOffcanvasLabel">Tools</h6>
                    <button className="btn-close" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    <hr />
                </div>
                <div className="offcanvas-body">
                    <p>Try scrolling the rest of the page to see this option in action.</p>
                </div>
            </div>
        </>
    )
}