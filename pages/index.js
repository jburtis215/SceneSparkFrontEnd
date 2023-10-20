
import React, { useState, useCallback } from "react";

const http = require('http');

export default class AiTester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: '',
            characters: [],
            showCharacterButton: false,
            showCharacters: false,
            apiKey: '',
            highlightedCharacter: '',
            characterBio: '',
            showCharacterBio: '',
            serverResponse: ''
        };
        this.setGenre = this.setGenre.bind(this);
        this.handleChangeGenre = this.handleChangeGenre.bind(this)
        this.handleSubmitGenre = this.handleSubmitGenre.bind(this)
        this.showChar = this.showChar.bind(this)
        this.handlePickCharacter = this.handlePickCharacter.bind(this)
        this.generateCharacters = this.generateCharacters.bind(this)
        this.generateCharacterBios = this.generateCharacterBios.bind(this)
    }

    setGenre(genre) {
        this.setState({genre: genre})
        this.setState({characters: ''})
        this.setState({showCharacterButton: true})
    }

    getStyle(genre) {
        return "border-solid border-2 border-sky-500 rounded mx-20 px-10 " + (this.state.genre === genre ?  "bg-amber-200" :"bg-slate-200")
    }

    showChar() {
        let indents = [];
        for (var i = 0; i < this.state.characters.length; i++) {
            let j = i;
            indents.push(
                <div className="border-solid border-2 border-sky-500 max-w-1/3 mx-auto h-10" onClick={async () => {
                    await this.generateCharacterBios(this.state.characters[j]);
                }}>
                    {this.state.characters[j]}
                </div>);
        }
        return indents
    }

    async generateCharacters(event) {
        console.log("state" + this.state.serverResponse);
        event.preventDefault()
        const response = await fetch("http://127.0.0.1:7500/genCharacters", {
            method: "POST",
            body: JSON.stringify({
                genre: this.state.genre
            }),
            headers: {
                "Content-type": "text/plain"
            }
        })
        const jsonResponse = await response.json()
        let charactersList = jsonResponse.characters.split('.')
        this.setState({characters: charactersList})
        this.setState({showCharacters: true})
    }

    async generateCharacterBios(character) {
        console.log("state" + this.state.serverResponse);
        const response = await fetch("http://127.0.0.1:7500/genCharacterBio", {
            method: "POST",
            body: JSON.stringify({
                genre: this.state.genre,
                character: character
            }),
            headers: {
                "Content-type": "text/plain"
            }
        })
        const jsonResponse = await response.json()
        let characterBio = jsonResponse.bio
        this.setState({characterBio: characterBio})
        this.setState({showCharacterBio: true})
    }

    async handlePickCharacter(character) {
        this.setState({highlightedCharacter: character})
        const bioChatCompletion = await openai.chat.completions.create({
            messages: [{role: 'user', content: 'Write a short description for a character named' + this.state.highlightedCharacter + 'in a' + this.state.genre + ' movie'}],
            model: 'gpt-3.5-turbo',
        });
        let bioMessage = bioChatCompletion.choices.pop().message.content
        this.setState({characterBio: bioMessage})
        this.setState({showCharacterBio: true})
    }

    handleChangeGenre(event) {
        this.setState({genre: event.target.value});
    }

    handleSubmitGenre(event) {
        this.setState({characters: ''})
        this.setState({showCharacterButton: true})
        event.preventDefault()
    }

    render() {
        return (

            <div>
                <div className="justify-center content-center w-400 my-auto" >
                    <h1 className="text-xl font-extrabold text-center">
                        Let's make a Script
                    </h1>
                    <br/>

                    <h2 className="font-extrabold text-center">
                        Let's start with the Genre.
                    </h2>
                    <br/>
                    <form onSubmit={this.generateCharacters}>
                        <label>
                            Genre:
                            <textarea value={this.state.genre} onChange={this.handleChangeGenre} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                    {this.state.showCharacterButton ? (
                        <div>
                            <h2 className="font-extrabold text-center">
                                Next, let's get some characters.
                            </h2>
                            <br/>
                            <div className="max-w-2/3 mx-auto flex justify-center pb-20">
                                <button className="border-solid border-2 border-sky-500 rounded bg-slate-200" onClick={async () => {await this.generateCharacters(this.state.apiKey);} }>
                                    Generate characters
                                </button>
                            </div>
                        </div>
                    ) : (<div/>)
                    }
                    {this.state.showCharacters ? (
                        <div className="border-solid border-2 border-sky-500 max-w-1/3 mx-auto h-100 my-16">
                            {this.showChar()}
                        </div>) : (<div/>)}

                    {this.state.showCharacterBio ? (
                        <div className="border-solid border-2 border-sky-500 max-w-1/3 mx-auto h-100 my-16">
                            {this.state.characterBio}
                        </div>) : (<div/>)}
                </div>
            </div>
        )
    }


}