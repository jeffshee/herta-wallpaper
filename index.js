const numHerta = 25;

const app = new PIXI.Application();
await app.init({
    width: window.innerHeight,
    height: window.innerHeight,
    backgroundAlpha: 0,
    resizeTo: window,
});
document.body.appendChild(app.canvas);

const image = await PIXI.Assets.load("herta.gif");

function createHerta() {
    const herta = image.clone();

    const hertaSize = Math.random() * 150 + 50;
    herta.width = hertaSize;
    herta.height = hertaSize;

    herta.x = app.screen.width + Math.random() * app.screen.width;
    herta.y = Math.random() * (app.screen.height - hertaSize);

    herta.speed = ((200 - hertaSize) / 150) * 2 + 1;

    app.stage.addChild(herta);
}

function gameLoop(ticker) {
    app.stage.children.forEach((herta) => {
        herta.x -= herta.speed * ticker.deltaTime;
        if (herta.x < -herta.width) {
            app.stage.removeChild(herta);
            createHerta();
        }
    });
}

for (let i = 0; i < numHerta; i++) {
    createHerta();
}

app.ticker.add(gameLoop);
