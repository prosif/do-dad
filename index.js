const process = require('process');
const { Asset, Game, GameNode, Colors, Shapes, ShapeUtils } = require(process.env.SQUISH_PATH);


const layerBase = require(__dirname + '/src/layer-base');

class DoDad extends Game {
    static metadata() {
        return {
            aspectRatio: {x: 16, y: 9},
            squishVersion: '0756',
            author: 'Joseph Garcia',
            thumbnail: 'dcd6e74ff94d51f9f323ce00669d98d4'
        };
    }

    constructor() {
        super();
        const baseColor = Colors.randomColor();
        this.base = new GameNode.Shape({
            shapeType: Shapes.POLYGON,
            coordinates2d: ShapeUtils.rectangle(0, 0, 0, 0)
        });

        const layerBaseNode = layerBase(this.handleLayerClick);
        this.base.addChild(layerBaseNode);
    }

    handleNewPlayer() {
    }

    handlePlayerDisconnect() {
    }

    handleLayerClick() {
        const newColor = Colors.COLORS.PINK;//randomColor();
        this.color = newColor;
        this.fill = newColor;
    }

    getLayers() {
        return [{root: this.base}];
    }
}

module.exports = DoDad;
