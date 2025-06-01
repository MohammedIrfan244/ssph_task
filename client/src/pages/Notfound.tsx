import { useNavigate } from 'react-router-dom';

function Notfound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-transparent bg-gradient-to-r from-green-400 to-green-500 bg-clip-text mb-4">
                    404
                </h1>
                <p className="text-2xl text-gray-600 font-medium mb-8">
                    Page Not Found
                </p>
                <button
                    onClick={handleGoHome}
                    className="px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}

export default Notfound;