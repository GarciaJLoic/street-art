const ModalScoreMap = ({ closeModal, scoreOeuvre, scoreUser }) => {
  return (
    <div className="modalScore">
      <div
        onClick={() => closeModal(false)}
        className="BackgroundModalCatalogue"
      >
        X
      </div>
      <h2> Félicitations !</h2>
      <p> Vous avez gagné : {scoreOeuvre}</p>
      <p> Votre total de point est de : {scoreUser}</p>
    </div>
  )
}

export default ModalScoreMap
