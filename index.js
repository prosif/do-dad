//const tang = process.cwd() + '/node_modules/squish-0633';
const { Game, GameNode, Colors, Shapes } = require('squish-0633');

class DoDad extends Game {
    static metadata() {
        return {
            aspectRatio: {x: 16, y: 9},
            squishVersion: '0633',
            author: 'Joseph Garcia',
            thumbnail: 'https://d3lgoy70hwd3pc.cloudfront.net/thumbnails/layer-test.png'
        };
    }

    constructor(squishLib) {
        super();
        if (squishLib) {
            console.log("HEY BROTHER I GOT A CUSTOM SQUISH LIB");
            console.log(squishLib);
        }
        const baseColor = Colors.randomColor();
        this.base = new GameNode.Shape({
            shapeType: Shapes.POLYGON,
            coordinates2d: [
                [0, 0],
                [100, 0],
                [100, 100],
                [0, 100],
                [0, 0]
            ],
            fill: Colors.COLORS.RED,
            onClick: this.handleLayerClick
        });

        const increment = 1;
        let prev = this.base;
        for (let i = increment; i < 50; i+= 2 * increment) {
            const childColor = Colors.randomColor();
            const child = new GameNode.Shape({
                shapeType: Shapes.POLYGON,
                coordinates2d: [
                    [i, i],
                    [i + 100 - (2 * i), i],
                    [i + 100 - (2 * i), i + 100 - (2 * i)],
                    [i, i + 100 - (2 * i)],
                    [i, i]
                ],
                fill: Colors.COLORS.RED,//childColor,
                onClick: this.handleLayerClick
            });
            prev.addChild(child);
            prev = child;
        }
    }

    handleNewPlayer() {
    }

    handlePlayerDisconnect() {
    }

    handleLayerClick() {
        const newColor = Colors.randomColor();
        this.color = newColor;
        this.fill = newColor;
    }

    getRoot() {
        return this.base;
    }
}

module.exports = DoDad;
