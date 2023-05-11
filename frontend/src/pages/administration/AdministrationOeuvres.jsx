import { useState } from "react"
import Header from "../../components/Header"
import AdminOeuvre from "../../components/administration/AdminOeuvres"
import BlockFilter from "../../components/administration/BlockFilter"
const AdministrationOeuvres = () => {
  const [listeOeuvres, setListeOeuvres] = useState()
  const [checkboxValidateOeuvreAdmin, setCheckboxValidateOeuvreAdmin] =
    useState(false)
  return (
    <div className="administrationOeuvres">
      <Header />
      <div className="title">
        <h2>Administration</h2>
      </div>
      <BlockFilter
        setListeOeuvres={setListeOeuvres}
        checkboxValidateOeuvreAdmin={checkboxValidateOeuvreAdmin}
        setCheckboxValidateOeuvreAdmin={setCheckboxValidateOeuvreAdmin}
      />
      <div className="adminOeuvres">
        {(checkboxValidateOeuvreAdmin
          ? listeOeuvres?.filter((e) => e.valide)
          : listeOeuvres
        )?.map((oeuvre) => {
          return (
            <AdminOeuvre
              key={oeuvre.id}
              oeuvre={oeuvre}
              setListeOeuvres={setListeOeuvres}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AdministrationOeuvres
