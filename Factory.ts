interface Figure {
    cells : boolean [][]
    render()
}
class I_figure implements Figure{
    cells = [ [true , true, true , true]];

    render() {
        console.log("render I")
    }
}
class J_figure implements Figure{
    cells = [
        [true , false, false],
        [true , true, true]
    ]
    render() {
        console.log("render J")
    }
}
class L_figure implements Figure{
    cells = [
        [false , false, true],
        [true , true, true]
    ]
    render() {
        console.log("render L")
    }
}
class O_figure implements Figure{
    cells = [
        [true , true],
        [true , true]
    ]

    render() {
        console.log("render O")
    }
}
class T_figure  implements Figure{
    cells = [
        [false , true, false],
        [true , true, true]
    ]

    render() {
        console.log("render T")
    }
}
class Z_figure implements Figure{
    cells = [
        [true , true, false],
        [false , true, true]
    ]

    render() {
        console.log("render Z")
    }
}
class S_figure implements Figure{
    cells = [
        [false, true, true],
        [true, true, false]
    ]

    render() {
        console.log("render S")
    }
}
class Super_I extends I_figure{
    cells = [ [true , true, true , true ], [true , true, true , true]];
    render() {
        console.log("render SUPER I")
    }
}
class Tetris {
    shapes : Figure[]
    constructor() {
        this.shapes = [
            new S_figure(),
            new Z_figure(),
            new O_figure(),
            new T_figure(),
            new L_figure(),
            new J_figure(),
            new I_figure(),
            new Super_I()
        ]
    }
    private randShape(){
        this.shapes[Math.floor(Math.random() * this.shapes.length)].render();
    }
    runGame(figures: number){
        for (let i = 0; i < figures; i++) {
            this.randShape()
        }
    }
}
function client(){
    let game = new Tetris()
    game.runGame(10)
}

client()