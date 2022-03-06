//const tang = process.cwd() + '/node_modules/squish-0633';

let Game, GameNode, Colors, Shapes;

//const { Game, GameNode, Colors, Shapes } = require('squish-0633');

if (process.env.STAGE == 'PRODUCTION') {
    const squishMapString = process.env.SQUISH_MAP;
    console.log("need to load squish from this");
    console.log(squishMapString);
    if (!squishMapString) {
        console.log('Running in non-test environment requires squish_map environment variable');
        process.exit();
    } else {
        const squishMap = JSON.parse(squishMapString);
        const squishStuff = require(squishMap['squish-0633']);
        Game = squishStuff.Game;
        GameNode = squishStuff.GameNode;
        Colors = squishStuff.Colors;
        Shapes = squishStuff.Shapes;
    }
} else {
    const squishStuff = require('squish-0710');
    Game = squishStuff.Game;
    GameNode = squishStuff.GameNode;
    Colors = squishStuff.Colors;
    Shapes = squishStuff.Shapes;
}

class DoDad extends Game {
    static metadata() {
        return {
            aspectRatio: {x: 16, y: 9},
            squishVersion: '0710',
            author: 'Joseph Garcia',
            thumbnail: 'https://d3lgoy70hwd3pc.cloudfront.net/thumbnails/layer-test.png'
        };
    }

    constructor() {
        super();
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
            fill: Colors.randomColor(),
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
                fill: childColor,
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

    getLayers() {
        return [{root: this.base}];
    }
}

module.exports = DoDad;
