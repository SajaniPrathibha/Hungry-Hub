import PropTypes from "prop-types";

const LogoutPopup = ({ onConfirm, onCancel }) => (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex justify-center items-center z-[1000] p-5!">
        <div className="bg-white p-[50px]! rounded-lg text-center max-w-[450px] w-[90%] animate-scaleUp">
            <h3 className="mb-5! text-lg text-[#333] font-bold">
                Are you sure you want to log out?
            </h3>
            <button
                className="mx-[15px]  my-2.5 px-8 py-4.5 text-base border-none bg-[#007bff] text-white rounded-[5px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0056b3]"
                onClick={onConfirm}
            >
                Yes
            </button>
            <button
                className="mx-[15px] my-2.5 px-5 py-2.5 text-base border-none bg-[#dc3545] text-white rounded-[5px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#c82333]"
                onClick={onCancel}
            >
                No
            </button>
        </div>
    </div>
);

LogoutPopup.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default LogoutPopup;