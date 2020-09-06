import React from 'react';
import './App.css';
import "./style.css";
import marked from 'marked';

const defaultText = `# Welcome to my React Markdown Previewer! 

## This is a sub-heading...
### And here's some other cool stuff
## This is a sub-heading...
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == \'\`\`\`\' && lastLine == \'\`\`\`\') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![I made it](https://i1.sndcdn.com/avatars-000057971461-6btzvv-t500x500.jpg)`;

class Textarea extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.full){
      return (
        <section id="editor-full">
          <div className="header">
              <p className="icon-text">
                  Editor
              </p>
              <button className="btn-full-screen" onClick={this.props.toggleFullScreen}>
              <i class="fas fa-compress-arrows-alt"></i>
              </button>
          </div>
              <textarea id="editor-full-input" type="text" onChange={this.props.handleInput} value={this.props.value}>
              </textarea>
        </section>
      );
    }
    else{
      return(
        <section id="editor">
          <div className="header">
              <p className="icon-text">
                  Editor
              </p>
              <button className="btn-full-screen" onClick={this.props.toggleFullScreen}>
                  <i className="fas fa-expand-arrows-alt"></i>
              </button>
          </div>
              <textarea id="editor-input" onChange={this.props.handleInput} value={this.props.value}>
              </textarea>
        </section>);
    }
  }
}

class Markdown extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const x = marked(this.props.input);
    if(this.props.full){
      return (
        <section id="previewer-full">
          <div className="header">
              <p className="icon-text">
                  Previewer
              </p>
              <button className="btn-full-screen" onClick={this.props.toggleFullScreen}>
              <i class="fas fa-compress-arrows-alt"></i>
              </button>
          </div>
      <div id="markdown-full" dangerouslySetInnerHTML={{ __html: x }}></div>
        </section>
      )
    }
    else{
      return(
        <section id="previewer">
          <div className="header">
              <p className="icon-text">
                  Previewer
              </p>
              <button className="btn-full-screen" onClick={this.props.toggleFullScreen}>
                  <i className="fas fa-expand-arrows-alt"></i>
              </button>
          </div>
          <div id="markdown" dangerouslySetInnerHTML={{ __html: x }}></div>
        </section>);
    }
  }
}

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      text:defaultText,
      btnOnTextarea: false,
      btnOnMarkdown: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.toggleFullScreenTextarea = this.toggleFullScreenTextarea.bind(this);
    this.toggleFullScreenMarkdown = this.toggleFullScreenMarkdown.bind(this);
  }

  handleInput (e){
    this.setState({text: e.target.value});
  }

  toggleFullScreenTextarea(){
    this.setState({btnOnTextarea: !this.state.btnOnTextarea});
  }

  toggleFullScreenMarkdown(){
    this.setState({btnOnMarkdown: !this.state.btnOnMarkdown});
  }

  render(){
    const txt = this.state.btnOnTextarea;
    const mark = this.state.btnOnMarkdown;

    if(txt == false && mark == false){
      return (
        <div id="root2">
          <Textarea value={this.state.text} handleInput={this.handleInput} toggleFullScreen={this.toggleFullScreenTextarea}  full={false}/>
          <Markdown input={this.state.text} toggleFullScreen={this.toggleFullScreenMarkdown}  full={false}/>
        </div>);
    }
    else if(txt == true && mark == false){
      return (
      <div id="root2">
        <Textarea value={this.state.text} handleInput={this.handleInput} toggleFullScreen={this.toggleFullScreenTextarea}  full={true}/>
      </div>);
    }
    else if(txt == false && mark == true){
      return (
      <div id="root2">
        <Markdown input={this.state.text} toggleFullScreen={this.toggleFullScreenMarkdown} full={true}/>
      </div>);
    }
  }
}


function App() {
  return (
    <Main />
  );
}

export default App;
