import * as fs from "fs";
import * as XML from "xmlbuilder"

class BuilderTXTtoXML{
    originalText : string
    text : string
    heading : string
    authors : string []
    hash: string
    private getText(path){
        this.originalText = fs.readFileSync(path, "utf8");
    }
    private parseHeading(){
        //parse heading//
        this.heading = "heading"
    }
    private parseAuthors(){
        //parse authors//
        this.authors = [
            'author 1',
            'author 2',
            '........'
        ]
    }
    private parseText(){
        //parse text//
        this.text = "text......text"
    }
    private parseHash(){
        //parse Hash//
        this.hash = "hash...hash"
    }
    private createXML(){
        let xml = [this.heading, this.authors, this.text, this.hash]
        console.log(xml)
    }
    run(path){
        this.getText(path)
        this.parseHeading()
        this.parseAuthors()
        this.parseText()
        this.parseHash()
        if (this.checkHash()){
            this.createXML()
        }
    }
    checkHash(): boolean{
        //check hash code text//
        return true
    }
}



function clientCode(builder: BuilderTXTtoXML) {
    builder.run('src/text.txt')
}

const director = new BuilderTXTtoXML();
clientCode(director);