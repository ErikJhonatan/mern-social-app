import PropTypes from 'prop-types';

function DialogAccept(props) {
  const {nameModal, deleteFn} = props;

  return (
    <dialog id={nameModal}className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hola</h3>
        <p className="py-4">
          ¿Estas seguro que quieres eliminar el recurso?
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Cancelar</button>
            <div className="btn btn-error"
            onClick={() => {
              deleteFn();
              document.getElementById(nameModal).close();
            }}
            >
              Eliminar
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
DialogAccept.propTypes = {
  nameModal: PropTypes.string.isRequired,
  deleteFn: PropTypes.func.isRequired,
};

export default DialogAccept;