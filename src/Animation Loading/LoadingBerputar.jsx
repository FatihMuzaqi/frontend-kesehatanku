export default function LoadingBerputar({wdith, hiegth}) {

    return (
        <>
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <div className="b-2 bt-0 rounded-circle loading-rotate" style={{width: wdith + 'px', height: hiegth + 'px'}}></div>
        </div>
        </>
    )
}