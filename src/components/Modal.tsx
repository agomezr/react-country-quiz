import '../Modal.css'; 
import image from '/congrats.png'

export default function Modal ( 
    {show, children, onClose}:
    {show: boolean, children:React.ReactNode, onClose:()=>void}) {
      
  if (!show) {
    return null; 
  }

  return (
    <div className="modal-overlay" >
      <div className="modal-content bg-gray-dark rounded-xl px-4 py-8 mx-2" onClick={e => e.stopPropagation()}>
        <img src={image} alt="Final image" className="max-w-full h-auto mx-auto mb-5" />
        {children}
        <button className="modal-close-button" onClick={onClose} title="Close">
          X
        </button>
      </div>
    </div>
  );
};
