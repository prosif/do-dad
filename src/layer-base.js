const { Game, GameNode, Colors, Shapes } = require('squish-0750');

const layerBase = (handleLayerClick) => {

        const base = new GameNode.Shape({
            shapeType: Shapes.POLYGON,
            coordinates2d: [
                [0, 0],
                [100, 0],
                [100, 100],
                [0, 100],
                [0, 0]
            ],
            fill: Colors.randomColor(),
            onClick: handleLayerClick
        });


        const increment = 1;
        let prev = base;
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
                onClick: handleLayerClick
            });
            prev.addChild(child);
            prev = child;
        }

        return base;

}

module.exports = layerBase;
