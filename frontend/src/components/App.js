import React from 'react';
import ReactDOM from 'react-dom';
const { useEffect, useState} = require("react");

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items,setItems] = useState({});

    useEffect(()=> {
        fetchCompanies();

    },[])
    
    function fetchCompanies() {
        fetch("phonebook/company/")
        .then(result => result.json())
        .then((res) => {
            setItems(res);
            setIsLoaded(true);
        })
    }

    function addModel(model, pk = null) {
        let name = prompt (`Add new ${model}`);
        if (name) {
            let body = null;
            if (model == 'contact') {
                body = {name : name, person: pk}
            } else if (model == 'person') {
                body = {name : name, company: pk}
            } else {
                body = {name : name}
            }
            
            fetch(`phonebook/${model}/` , {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },body: JSON.stringify(body)
            })
            .then(
                (result) => { 
                    if (result.status >= 400) {
                        alert("Something went wrong.");
                        
                    } else {
                        fetchCompanies();
                        alert("succesfully added!");
                    }
                
                },
                (error) => {
                    alert(error);
                }
            )
        }
    }

    function editModel(model, id) {
        let name = prompt (`Add new ${model}`);
        if (id) {
            const body = {name : name}
            fetch(`phonebook/${model}/${id}/` , {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },body: JSON.stringify(body)
            })
            .then(
                (result) => { 
                    if (result.status >= 400) {
                        alert("Something went wrong.");
                        
                    } else {
                        fetchCompanies();
                        alert("succesfully deleted!");
                    }
                },
                (error) => {
                    alert(error);
                }
            )
        }

    }

    function deleteModel(model,id) {
        if (id) {
            fetch(`phonebook/${model}/${id}/` , {
                method: 'DELETE'})
            .then(
                (result) => { 
                    if (result.status >= 400) {
                        alert("Something went wrong.");
                        
                    } else {
                        fetchCompanies();
                        alert("succesfully deleted!");
                    }
                },
                (error) => {
                    alert(error);
                }
            )
        }
    }

    //<button onClick={() => addModel('person', company["id"])}>Add person to {company["name"]}</button>
    //
    function renderCompanies() {
        return items.map(company => 
            <div className="company" key={company["id"]}>
                <h1>{company["name"]}</h1> 
                <button onClick={() => addModel('person', company["id"])}>Add person</button>
                <button onClick={() => deleteModel('company', company["id"])}>Delete {company["name"]}</button>
                <button onClick={() => editModel('company', company["id"])}>Edit {company["name"]}</button>
                <h2>{company["name"]} Persons: </h2>
                {renderPersons(company['persons'])}
            </div>
        );
    }

    function renderPersons(persons) {
        return persons.map(person => 
            <div className="person" key={person["id"]}>
                {person["name"]}
                <button onClick={() => addModel('contact', person["id"])}>Add contact</button>
                <button onClick={() => deleteModel('person', person["id"])}>Delete {person["name"]}</button>
                <button onClick={() => editModel('person', person["id"])}>Edit {person["name"]}</button>
                <p>{person["name"]} Contacts: </p>
                <ul>
                    {renderContacts(person['contacts'])}
                </ul>
            </div>
        );
    }

    function renderContacts(contacts) {
        return contacts.map(contact => 
            <li>
                {contact['name']}
                <button onClick={() => deleteModel('contact', contact["id"])}>Delete {contact["name"]}</button>
                <button onClick={() => editModel('contact', contact["id"])}>Edit {contact["name"]}</button>
            </li>
        )
    } 

    if (!isLoaded ) {
        return (<div>Loading</div>)
    } else {
        return (
            <div>
                <button onClick={() => addModel('company')}>Add Company</button>
                {renderCompanies()}
            </div>
           
        )
    }
    
}

export default App;


ReactDOM.render((
    <App/>
  ), document.getElementById('app'));


