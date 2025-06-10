
export default function LoadingSpinner({Width, Height}) {
    return (
        <div className="d-flex align-items-center justify-content-center vw-100 vh-100 position-absolute">
            <div className="m-3">
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 1, animationDelay: 0.1 + 's' }}></div>
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 2, animationDelay: 0.2 + 's' }}></div>
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 3, animationDelay: 0.3 + 's' }}></div>
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 4, animationDelay: 0.4 + 's' }}></div>
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 5, animationDelay: 0.5 + 's' }}></div>
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 6, animationDelay: 0.6 + 's' }}></div>
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 7, animationDelay: 0.7 + 's' }}></div>
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 8, animationDelay: 0.8 + 's' }}></div>
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 9, animationDelay: 0.9 + 's' }}></div>
                <div className="item position-absolute rounded-20px" style={{width: Width + 'px', height: Height + 'px', '--rotate': 10, animationDelay: 1.0 + 's' }}></div>
            </div>
        </div>
    )
}