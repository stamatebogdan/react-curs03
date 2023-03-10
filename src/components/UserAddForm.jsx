import React from "react";
import './UserAddForm.css';
import App from "../App";

class UserAddForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name: '',
            email: '',
            isGoldClient: false
        }
    }

    handleNameChange(event){
        console.log(event.target.value);
        const inputValue= event.target.value;
        this.setState({name: inputValue});
    }

    handleEmailChange(event){
        const inputValue = event.target.value;
        this.setState({email: inputValue})
    }

    handleIsGoldClientChange(event){
        console.log(event.target.checked)
        const inputValue=event.target.checked;
        this.setState({isGoldClient: inputValue})
    }

    handleFormSubmit(event){
        event.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            isGoldClient: this.state.isGoldClient
        }
        this.props.updateUSersList(newUser);
    }


    render(){
        return (
            <form 
                className="user-add-form"
                onSubmit={(event) => {this.handleFormSubmit(event)}}>

                <h2>Adauga un utilizator nou: </h2>

                <label htmlFor="name"> Nume: </label>
                <input 
                    type="text" 
                    name="name" 
                    value={this.state.name} 
                    onChange={(event) => {this.handleNameChange(event)}}>
                </input>

                <label htmlFor="email"> Email: </label>
                <input 
                    type="text" 
                    name="email" 
                    value={this.state.email}
                    onChange={(event) => {this.handleEmailChange(event)}}>
                </input>

                <label htmlFor="gold-client"> E client gold?</label>
                <input 
                    type="checkBox" 
                    name="gold-client" 
                    checked={this.state.isGoldClient}
                    onChange={(event) => {this.handleIsGoldClientChange(event)}}>
                </input>

                <input type="submit" value="Submite formularul" />
            </form>
        )
    }
}

export default UserAddForm;