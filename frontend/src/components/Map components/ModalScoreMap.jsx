const ModalScoreMap = ({ closeModal, scoreOeuvre, scoreUser }) => {
  return (
    <div className="modalScore">
      <div className="modalScoreBackground">
        <div
          onClick={() => closeModal(false)}
          className="BackgroundModalCatalogue"
        >
          X
        </div>
        <h2> Félicitations !</h2>
        <p>
          Vous venez de gagner <span className="orange">{scoreOeuvre} pts</span>
          <br />
          Total : <span className="orange">{scoreUser}pts</span>
        </p>
      </div>
    </div>
  )
}

export default ModalScoreMap
