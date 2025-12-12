import PropTypes from "prop-types";

const LogoutPopup = ({ onConfirm, onCancel }) => (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex justify-center items-center z-[1000] p-5!">
        <div className="bg-white p-[50px]! rounded-lg text-center max-w-[450px] w-[90%] animate-scaleUp">
            <h3 className="mb-5! text-lg text-[#333] font-bold">
                Are you sure you want to log out?
            </h3>
            <div className="flex justify-center gap-6 mt-6">
                <button
                    className="px-5! py-5 text-lg font-semibold bg-[#438ddd] text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out"
                    onClick={onConfirm}
                >
                    Yes
                </button>
                <button
                    className="px-5! py-5 text-lg font-semibold bg-red-400 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out"
                    onClick={onCancel}
                >
                    No
                </button>
            </div>




        </div>
    </div>
);

LogoutPopup.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default LogoutPopup;