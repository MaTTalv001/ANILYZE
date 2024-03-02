function CoActorModal({ isOpen, onClose, works }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg max-w-md w-full">
        <button onClick={onClose} className="float-right">
          ✖️
        </button>
        <h3 className="text-2xl font-bold">共演作品</h3>
        <div className="mt-2">
          {works.map((work, index) => (
            <p key={index} className="text-xl py-1">
              {work}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoActorModal;
